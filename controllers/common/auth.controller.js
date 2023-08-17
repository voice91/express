import httpStatus from 'http-status';
import { catchAsync } from 'utils/catchAsync';
import { authService, tokenService, userService, emailService, lenderContactService, invitationService } from 'services';
import { Deal, Invitation } from '../../models';
import enumModel from '../../models/enum.model';
import ApiError from '../../utils/ApiError';

export const register = catchAsync(async (req, res) => {
  const { body } = req;
  if (body.isRedirectedFromSendDeal) {
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
        Object.assign(body, lenderInfo);
        const user = await userService.createUser(body);
        await invitationService.updateInvitation(
          { _id: LenderInvitation._id },
          { status: enumModel.EnumTypeOfStatus.ACCEPTED }
        );
        const emailVerifyToken = await tokenService.generateVerifyEmailToken(user.email);
        emailService.sendEmailVerificationEmail(user, emailVerifyToken).then().catch();
        res.status(httpStatus.OK).send({
          results: {
            success: true,
            message: 'Email has been sent to your registered email. Please check your email and verify it',
            user,
          },
        });
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid lender email');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid lender email');
    }
  } else {
    const user = await userService.createUser(body);
    // Add user to the respective deal once registered.
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
    res.status(httpStatus.OK).send({
      results: {
        success: true,
        message: 'Email has been sent to your registered email. Please check your email and verify it',
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
