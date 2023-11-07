import httpStatus from 'http-status';
import { catchAsync } from 'utils/catchAsync';
import { authService, tokenService, userService, emailService, lenderContactService, invitationService } from 'services';
import { Deal, Invitation } from '../../models';
import enumModel from '../../models/enum.model';
import ApiError from '../../utils/ApiError';

export const register = catchAsync(async (req, res) => {
  const { body } = req;
  const loggedInUser = req.user;
  const isBorrowerAddingByAdmin = loggedInUser.role === enumModel.EnumRoleOfUser.ADVISOR;
  const { isRedirectedFromSendDeal } = body;
  if (isRedirectedFromSendDeal) {
    const LenderInvitation = await invitationService.getOne({
      inviteeEmail: body.email,
      role: enumModel.EnumRoleOfUser.LENDER,
      status: enumModel.EnumTypeOfStatus.PENDING,
    });
    if (LenderInvitation) {
      const isLenderContact = await lenderContactService.getOne({ email: body.email }, { populate: 'lenderInstitute' });
      if (isLenderContact) {
        const lenderInfo = {
          firstName: isLenderContact.firstName,
          lastName: isLenderContact.lastName,
          companyName: isLenderContact.lenderInstitute.lenderNameVisible,
          role: enumModel.EnumRoleOfUser.LENDER,
        };
        // in new flow we do not want lender to verify email so directly verifying email
        Object.assign(body, lenderInfo, { emailVerified: true });
        const user = await userService.createUser(body);
        const tokens = await tokenService.generateAuthTokens(user);
        await invitationService.updateInvitation(
          { _id: LenderInvitation._id },
          { status: enumModel.EnumTypeOfStatus.ACCEPTED }
        );
        // in new flow we do not want lender to verify email so removing it
        // const emailVerifyToken = await tokenService.generateVerifyEmailToken(user.email);
        // emailService.sendEmailVerificationEmail(user, emailVerifyToken).then().catch();
        res.status(httpStatus.OK).send({
          results: {
            success: true,
            message: 'Successfully registered',
            user,
            tokens,
          },
        });
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid lender email');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid lender email');
    }
  } else {
    if (isBorrowerAddingByAdmin) {
      Object.assign(body, { emailVerified: true, enforcePassword: true });
    }
    const user = await userService.createUser(body);
    // Add user to the respective deal once registered.
    if (!isBorrowerAddingByAdmin) {
      const update = {
        invitee: user._id,
        status: 'accepted',
      };
      const [invitation] = await Promise.all([
        Invitation.find({ inviteeEmail: user.email }),
        Invitation.updateMany({ inviteeEmail: user.email }, update),
      ]);
      const updateDeal = {
        $addToSet: { 'involvedUsers.borrowers': user._id },
      };
      await Deal.updateMany({ _id: { $in: invitation.map((item) => item.deal) } }, updateDeal);
      const emailVerifyToken = await tokenService.generateVerifyEmailToken(user.email);
      emailService.sendEmailVerificationEmail(user, emailVerifyToken).then().catch();
    }
    res.status(httpStatus.OK).send({
      results: {
        success: true,
        message: isBorrowerAddingByAdmin
          ? 'Borrower successfully registered'
          : 'Email has been sent to your registered email. Please check your email and verify it',
        user,
      },
    });
  }
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { deviceToken } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  if (deviceToken) {
    const updatedUser = await userService.addDeviceToken(user, req.body);
    res.status(httpStatus.OK).send({ results: { user: updatedUser, tokens } });
  } else {
    res.status(httpStatus.OK).send({ results: { user, tokens } });
  }
});

// if user's email is not verified then we call this function for reverification
export const sendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const emailVerifyToken = await tokenService.generateVerifyEmailToken(email);
  const user = await userService.getOne({ email });
  emailService.sendEmailVerificationEmail(user, emailVerifyToken).then().catch();
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Email has been sent to your registered email. Please check your email and verify it',
  });
});

/**
 * Token-based forgotPassword Verify Controller
 * @type {(request.query: token)}
 * @return (successMessage)
 */
export const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query);
  res.status(httpStatus.OK).send({ message: 'Your Email is Verified Successfully' });
});

/**
 * get the Current LoggedIn UserInfo using token
 */
export const userInfo = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.status(httpStatus.OK).send({ results: { user } });
});

/**
 * When user is created from BE while sending email then user can change password
 * * @type {(function(*, *, *): void)|*}
 */
export const enforcePassword = catchAsync(async (req, res) => {
  const user = await userService.enforcePassword(req.user._id, req.body);
  res.status(httpStatus.OK).send({ results: { user } });
});

/**
 * send email to user for resetting the password
 */
export const forgotPassword = catchAsync(async (req, res) => {
  const user = await userService.getOne({ email: req.body.email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // todo: we have to set the email infohighlender one and check
  await emailService.sendResetPasswordEmail(resetPasswordToken, user);
  res.status(httpStatus.OK).send({ success: true, message: 'Link to forgot password has been sent' });
});

/**
 * Set new password for the user
 */
export const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPasswordToken(req.body);
  res.status(httpStatus.OK).send({ success: true, message: 'Password has been reset successfully' });
});
