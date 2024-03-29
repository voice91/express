/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
import nodemailer from 'nodemailer';
import config from 'config/config';
import { logger } from 'config/logger';
import axios from 'axios';
import { decrypt } from '../utils/encrypt-decrypt-text';
import { getSignedUrl } from './s3.service';
import { getKeyFromUrl } from '../utils/common';

// eslint-disable-next-line import/no-extraneous-dependencies
const postmark = require('postmark');

/**
 * configuration for postmark
 * */
export const transport = new postmark.ServerClient(config.postmarkAPIToken);

// We implemented postmark for email send so we commented the code of nodemailer functionality

/**
 * configuration for nodemailer
 * */
// todo: use below configuration for sendEmails using nodemailer
// export const nodemailerTransport = nodemailer.createTransport(config.email.smtp);
// /* istanbul ignore next */
// if (config.env !== 'test') {
//   nodemailerTransport
//     .verify()
//     .then(() => logger.info('Connected to email server'))
//     .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

/**
 * Send an email using postmark
 * @returns {Promise}
 * @param emailParams
 */
export const sendEmail = async (emailParams) => {
  const { to, cc, bcc, from, subject, text, isHtml, attachments, headers, replyTo = '' } = emailParams;
  const msg = {
    from: `${config.emailSenderDisplayName} <${from || config.email.from}>`,
    to,
    cc,
    bcc,
    subject,
    text,
    attachments,
    headers,
  };
  if (isHtml) {
    msg.HtmlBody = text;
    delete msg.text;
  } else {
    msg.TextBody = text;
  }
  // we have cc and bcc type is array and postmark allow only string for this so, we did this thing
  if (cc) {
    msg.cc = msg.cc.join(',');
  }
  if (bcc) {
    msg.bcc = msg.bcc.join(',');
  }

  if (attachments) {
    msg.attachments = await Promise.all(
      msg.attachments.map(async (item) => {
        const response = await axios.get(item.path, { responseType: 'arraybuffer' });
        return {
          Name: item.fileName,
          Content: Buffer.from(response.data).toString('base64'),
          ContentType: item.fileType,
        };
      })
    );
  }

  const senderName = msg.from.split('@').reverse().pop();

  // we have requirement that when lender reply to email than advisor should get email so for that need to add that email to here
  msg.ReplyTo = `${senderName}@${config.postmarkInboundDomain}, ${replyTo}`;

  if (!msg.subject) {
    msg.subject = '';
  }
  const response = await transport.sendEmail(msg);
  logger.info(`Email sent successfully to ${msg.to}}`);
  return response;
};

/**
 * Send an email using gmail SMTP
 * By using this we can send the email from various admin email , no need to use from(sender) value from env
 * @returns {Promise}
 * @param emailParams
 */
export const sendEmailUsingGmail = async (emailParams) => {
  // TODO : check how can we pass headers in the mail
  const { to, subject, text, isHtml, attachments, from, pass, cc, bcc, replyTo = '' } = emailParams;
  // const msg = { from: config.email.from, to, subject, text };
  const transporter = nodemailer.createTransport({
    host: config.email.smtp.host,
    port: config.email.smtp.port,
    secure: true, // true for 465, false for other ports
    // service: 'gmail',
    auth: {
      user: from, // sender Gmail address
      pass, // The app password you generated
    },
  });

  const mailOptions = {
    to, // Receiver's email address
    subject,
    text,
  };

  if (isHtml) {
    delete mailOptions.text;
    mailOptions.html = text;
  }

  if (cc && cc.length) {
    mailOptions.cc = cc;
  }
  if (bcc) {
    mailOptions.bcc = bcc;
  }

  if (attachments) {
    mailOptions.attachments = attachments.map((item) => {
      return {
        // need to send attachment with the name
        filename: item.fileName,
        path: config.aws.enablePrivateAccess ? getSignedUrl(getKeyFromUrl(item.path)) : item.path,
      };
    });
  }
  // if we have this variable in env than take that else take sender name
  const senderName = config.postmarkInboundSenderName || from.split('@').reverse().pop();
  // remove this thing bcs in gmail we do not need this one was for postmark conform & remove this
  // // we have requirement that when lender reply to email than advisor should get email so for that need to add that email to here
  // As per the requirement, we want inbound domain mail to be at the end and reply to mail first
  mailOptions.replyTo = `${replyTo},${senderName}@${config.postmarkInboundDomain}`;
  //
  if (!mailOptions.subject) {
    mailOptions.subject = '';
  }

  const response = await transporter.sendMail(mailOptions);
  const { messageId } = response;
  // here we are extracting only messageIdString part from the whole messageId getting in response
  // In the response we are getting messageId like "<messageIdString@inbounddomain.com>" but we required to store only part "messageIdString".
  // we required only messageIdString for the webhook API instead of whole messageId including domain
  const messageIdParts = messageId.split('@'); // split messageId from @, so we get ["<messageIdString", "inbounddomain.com>"]
  const extractedMessageId = messageIdParts[0].slice(1); // removing < from the starting of the messageIdString
  Object.assign(response, { messageId: extractedMessageId });
  logger.info(`Email sent successfully to ${mailOptions.to} from ${from}`);
  return response;
};

/**
 * Send an email using nodemailer
 * @returns {Promise}
 * @param emailParams
 */
// todo: use below function for sendEmails using nodemailer
// export const sendEmailUsingNodemailer = async (emailParams) => {
//   const { to, subject, text, isHtml, attachments } = emailParams;
//   const msg = { from: config.email.from, to, subject, text };
//   if (isHtml) {
//     delete msg.text;
//     msg.html = text;
//   }
//   if (attachments) {
//     msg.attachments = await Promise.all(
//       attachments.map(async (item) => {
//         const response = await axios.get(item.path, { responseType: 'arraybuffer' });
//         return {
//           Name: item.fileName,
//           Content: Buffer.from(response.data).toString('base64'),
//           ContentType: item.fileType,
//         };
//       })
//     );
//   }
//   await nodemailerTransport.sendMail(msg);
// };

/**
 * Send an email
 * @param {String} from
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendAdminEmail = async (from, to, subject, text) => {
  const msg = { from: from || config.email.from, to, subject, text };
  await transport.sendEmail(msg);
};
/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
export const sendResetPasswordEmail = async (token, user) => {
  const { email: to, firstName } = user;
  const subject = 'Reset password';
  const resetPasswordUrl = `${config.front.url}/resetPassword?email=${to}&token=${token}`;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #051EA3;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
</style>
</head>
<body>
<div>
<div>Hi ${firstName},</div>
<br>
  <div>Forgot your password?</div>
  <div>We received a request to reset the password for your account.</div><br>
  <div>To reset your password, click on the button below:</div>
  <div><a   target="_blank" href="${resetPasswordUrl}" id="verifyButton" class="btn btn-primary" >Reset password</a></div><br><br>
  <div>Or copy and paste the URL into your browser:</div>
  <div>${resetPasswordUrl}</div>
  </div>
  </body>
  </html>`;
  await sendEmail({ to, subject, text, isHtml: true });
};

/**
 * Send Verification email
 * @param {Object} user
 * @param {string} token
 * @returns {Promise}
 */
export const sendEmailVerificationEmail = async (user, token) => {
  const { email: to, firstName } = user;
  const subject = 'Welcome to the ParallelCRE';
  const verifyEmailUrl = `${config.front.url}/verify-email?token=${token}`;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
</style>
</head>
<body>
<div>
<div>Dear ${firstName},</div>
<br>
  <div>We’re super excited that you’ve decided to join Parallel CRE!</div><br>
  <div>All you have to do is click the link below to confirm it’s you and you’re in!</div><br>
  <div><a   target="_blank" href="${verifyEmailUrl}" id="verifyButton" class="btn btn-primary" >Click here to Verify</a></div><br><br>
  <div>Thanks You,</div>
  <div>The Parallel Team</div>
  </div>
  </body>
  </html>
`;
  await sendEmail({ to, subject, text, isHtml: true });
};
// as now, we don't want to use postmark email so removing it
// we need user first name to be in email of invitation for existing users
export const sendInvitationEmail = async ({ fromEmail, user, dealName, userName, isDealCreated, link, pass, firstName }) => {
  const invitee = firstName;
  const to = user;
  const subject = `Parallel: ${isDealCreated ? 'New Deal Created' : 'Added to Deal'} - ${dealName}`;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
</style>
</head>
<body>
<div>
<div>  ${invitee ? `Hi ${invitee}` : 'Hello'},</div>
<br>
  <div>${userName} invited you to the ${isDealCreated ? 'new' : ''} deal, <b>${dealName} </b></div><br>
  <div>Please <a class="text-center" target="_blank" href="${
    config.front.url
  }/${link}" >click here</a> to access the deal</div><br><br>
  <div>Thank You,</div>
  <div>The Parallel Team</div>
  </div>
  </body>
  </html>
`;
  // as before we were sending mail from the sendEmailFrom set in the .env, but now we have to send it from the mail we set in our profile and whose app password we have set.
  await sendEmailUsingGmail({
    from: fromEmail,
    pass: decrypt(pass, config.encryptionPassword), // as we have encrypted the app password while saving, so we have to decrypt here
    to,
    subject,
    text,
    isHtml: true,
  });
};

export const FAQTemplate = async (user) => {
  const to = 'testrichard67@gmail.com';
  const subject = 'Submit a Question';
  const { from } = user;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
</style>
</head>
<body>
<div>
<div> Hii, Richard</div>
<br>
  <div> Question : ${user.question}</div><br>
  <div> Asked By,</div>
  <div>${user.name}</div><br><br>
  </div>
  </body>
  </html>
`;
  await sendEmail({ to, subject, from, text, isHtml: true });
};

export const sendFeedbackEmail = async (user) => {
  const { to } = user;
  const { subject } = user;
  const { from } = user;
  const { attachments } = user;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
</style>
</head>
<body>
<div>
<div> Hii, Richard</div>
<br>
  <div> Description : ${user.description}</div><br>
  <div> Feedback By,</div>
  <div>${user.name}</div><br><br>
  </div>
  </body>
  </html>
`;
  await sendEmail({ to, subject, from, text, isHtml: true, attachments });
};

export const sendDealTemplate1 = async (user) => {
  const to = user.email;
  const cc = user.email;
  const bcc = user.email;
  const subject = 'PFG Cold Storage Industrial - $9.1m Acquisition Financing';
  const { from } = user;
  const { file } = user;
  const attachments = file.map((data) => {
    const fileName = data.split('/').pop();
    return {
      filename: fileName,
      path: data,
    };
  });
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
</style>
</head>
<body>
<div>
<div> Hi ${user.firstName}</div>
<br>
  <div> This is a short message that would include details about the deal.</div><br>
  <div> Please see below the summary of PFG deal:</div><br>
  <div> The property is: example of text</div><br>
  <div> The loan of $${user.totalLoanAmount}m is</div><br>
  <div> Best Regards,</div>
  <div>${user.advisorName}</div><br><br>
  </div>
  </body>
  </html>
`;
  await sendEmail({ to, cc, bcc, subject, from, text, isHtml: true, attachments });
};

export const sendDealTemplate2 = async (user) => {
  const to = user.email;
  const cc = user.email;
  const bcc = user.email;
  const subject = 'PFG Cold Storage Industrial - $9.1m Acquisition Financing';
  const { from } = user;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
.underline{
   text-decoration:underline
}
.bold{
text-style: bold
}
.text-color{
color: gray;
}
.text-blue{
color:blue;
}
</style>
</head>
<body>
<div>
<div> Hi ${user.firstName} - hope all is well, please see below for the financing summary of PFG Cold Storage Industrial: </div>
<br>
  <div> The Sponsor is acquiring the Property for $13.0 million and is seeking $9.1m in acquisition financing (67% LTP).
PFG Cold Storage is a 100% occupied, 299,177sf cold-storage industrial facility located at 4901 Asher Avenue in Little Rock, Arkansas.  
</div><br>
  <div> The Property is occupied by Performance Food Group (PFG) on an absolute net lease. PFG is a food distributor with a market capitalization of approximately $10 billion. The tenants has approximately three years of lease term remaining with five, five-year renewal options and has occupied the Property since 2004. The Property is comprised of three buildings with 13 drive-in doors and 50 dock doors and is 299,177sf on 41.82 acres.
</div><br>
  <div> The Sponsor owns over 4.0 million SF and is focused on a competitive rate and non-recourse financing.</div><br>
  <div class="underline" > Financing Request:</div><br>
  <div class="bold"> - $9.1m Request </div><br>
  <div class="bold"> - Competitive Fixed Rate </div><br>
  <div class="bold"> - Interest-Only </div><br>
  <div class="bold"> - Non-recourse </div><br>
  <div> Please see the OM and model attached and let me know if you have any questions / if this is a fit.</div><br>
  <div> Thank you,</div>
  <div> ${user.advisorName}</div><br><br>
  <div class="text-color"> --</div><br>
  <div class="text-color"> ${user.advisorName}</div><br>
  <div class="text-color"> Parallel CRE</div><br>
  <div class="underline", class="text-blue"> ${user.advisorEmail}</div>
  </div>
  </body>
  </html>
`;
  await sendEmail({ to, cc, bcc, subject, from, text, isHtml: true });
};

export const sendDealTemplate3 = async (user) => {
  const to = user.email;
  const cc = user.email;
  const bcc = user.email;
  const subject = '547 Valley Road - $1.5m Acquisition Financing';
  const { from } = user;
  const text = `
<html lang="en">
<head>
<style>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #ffffff !important;
  background-color: #007bff;
  border: 1px solid #007bff;
  box-shadow: none;
  text-decoration: none;
}
.text-center {
text-align: center
}
.underline{
   text-decoration:underline
}
.bold{
text-style: bold
}
.text-color{
color: gray;
}
.text-blue{
color: blue;
}
</style>
</head>
<body>
<div>
<div> Hi ${user.firstName} - hope all is well, please see below for the 547 Valley Road financing request. </div>
<br>
  <div> 547 Valley Road is a 5,650sf, mixed-use Property (apartments and retail) located in Monclair, NJ. The Property is located on a highly-trafficked corridor, well-known as a shopping and dining destination and features convenient transportation: two blocks to the Upper Montclair train station with direct line to NYC, and short walk to #28 bus station. The in-place NOI is $102k and will increase to $158k upon the remaining residential unit being leased. Once increased, the metrics of the loan are 10.5% debt yield, 1.55x DSCR and 52% LTV.  
</div><br>
  <div> The Sponsor is looking to refinance their current loan with a $1.5m term loan. </div><br>
  <div class="underline",class="bold" > Financing Request:</div><br>
  <div> - $1.5m Request </div><br>
  <div> - Competitive Rate </div> <br>  
  <div> Please let me know when works to discuss further. </div><br>
  <div> Thank you,</div>
  <div> ${user.advisorName}</div><br><br>
  <div class="text-color"> --</div><br>
  <div class="text-color"> ${user.advisorName}</div><br>
  <div class="text-color"> Parallel CRE</div><br>
  <div class="underline", class="text-blue"> ${user.advisorEmail}</div>
  </div>
  </body>
  </html>
`;
  await sendEmail({ to, cc, bcc, subject, from, text, isHtml: true });
};

/**
 * @param {Object} feedBack
 * @returns {Promise<void>}
 */
export const sendFeedBackEmail = async (feedBack) => {
  const { comment, user } = feedBack;
  const { name } = user;
  const subject = `Feedback received from ${name}`;
  const text = `Below is the feedback received from ${name} \n FeedBack: ${comment}`;
  await sendAdminEmail(config.email.from, config.email.from, subject, text);
};

/**
 * @returns {Promise<void>}
 * @param reporter
 * @param reportedUser
 * @param party
 * @param comment
 */
export const sendReportUserEmail = async (reporter, reportedUser, party, comment) => {
  const { name: reporterName, _id: reportedId } = reporter;
  const { name, _id: reportedUserId } = reportedUser;
  const subject = `Regarding Report of user ${name}`;
  const text = `${name}, ${reportedUserId} is blocked by ${reporterName}, ${reportedId} \n  The reason is : ${comment} \n partyId: ${party._id}`;
  await sendAdminEmail(config.email.from, config.email.from, subject, text);
};

/**
 * Send Verification email
 * @param {Object} user
 * @param otp
 * @returns {Promise}
 */
export const sendOtpVerificationEmail = async (user, otp) => {
  const { email: to } = user;
  const subject = 'Otp verification email!';
  const text = `Dear user,
  Your email verification Code, Copy this Code: ${otp}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail({ to, subject, text, isHtml: false })
    .then(() => logger.info('email sent successfully'))
    .catch((error) => logger.warn(`Unable to send mail ${error}`));
};
