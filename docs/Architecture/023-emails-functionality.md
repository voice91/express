# Email Functionality

In the project , three methods implemented for sending emails functionality.
1. **Using postmark** : To send the general emails which send from advisor email configured in env .
2. **Using gmail SMTP** : To send the email which need to send from various advisor emails.
3. **Email Webhook** : To handle the replies get from the sent emails.

## Using postmark
To use this email utility, follow these steps:
### 1. Installation

Install the required Postmark package using npm:

   ```bash
   npm install newrelic or yarn add newrelic
   ```

### 2. Configuration

Make sure to configure the Postmark API token in your project. This can typically be done in your project configuration. Ensure that config.postmarkAPIToken is defined.

### 3. Usage

Import the utility into your project and use the `sendEmail` function to send emails.

```javascript
import { sendEmail } from 'path-to-email-utility';

// Example usage
const emailParams = {
  to: 'recipient@example.com',
  from: 'sender@example.com',
  subject: 'Sample Email',
  text: 'This is a sample email message.',
};

await emailParams(emailParams)
```

### 4. Email Parameters
The sendEmail function accepts an object (emailParams) with the following parameters:

- to: Email address of the recipient.
- from: Email address of the sender.
- subject: Subject of the email.
- text: Plain text content of the email.
- isHtml: Boolean indicating whether the email content is HTML (default is false).
- attachments: Array of file attachments to be included in the email.
- headers: Additional headers for the email.
- cc: Array of email addresses for CC (Carbon Copy).
- bcc: Array of email addresses for BCC (Blind Carbon Copy).
- replyTo: Email address to set as the reply-to address.

### 5. HTML Emails and Attachments

If the email content is HTML (isHtml is true), ensure that the HTML content is provided in the text parameter. Attachments can be included by providing an array of attachment objects with path, fileName, and fileType properties.

### 6. Handling CC and BCC
   Postmark expects CC and BCC addresses as strings, so if you provide them as arrays, they will be joined into strings before sending.

### 7. Handling Attachments
   Attachments are fetched asynchronously using Axios. Ensure that the axios library is installed in your project.

### 8. Additional Note
   The ReplyTo parameter is used to specify the reply-to address. Additionally, the subject parameter is set to an empty string if not provided.

### Example Use Cases
This email utility is suitable for various scenarios, including:

- Sending email verification links.
- Sending password reset instructions.


## Using Gmail SMTP
To send emails from various advisor emails, the Gmail SMTP utility is implemented.
For this functionality we needed appPassword generated from the advisor gmail and save that data in the profile .


### 1. Installation

Ensure that Node.js is installed on your system. Install the required Nodemailer library using:

   ```bash
   npm install nodemailer
   ```
### 2. Configuration
   Set the necessary configurations in your project before using the function. 
   
Ensure that the following configuration variables are defined:

- config.email.smtp.host: SMTP host for Gmail.
- config.email.smtp.port: SMTP port for Gmail.
- config.aws.enablePrivateAccess: A flag indicating whether to use private access for AWS.
- config.postmarkInboundSenderName: Sender name for inbound Postmark emails.
- config.postmarkInboundDomain: Domain for inbound Postmark emails.

### 3. Usage
   Import the utility into your project and use the sendEmailUsingGmail function to send emails.

```javascript
import { sendEmailUsingGmail } from 'path-to-email-utility';

// Example usage
const emailParams = {
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email.',
  isHtml: false,
  attachments: [
    { fileName: 'document.pdf', path: '/path/to/document.pdf' },
  ],
  from: 'sender@gmail.com',
  pass: 'app-password',
  cc: 'cc@example.com',
  bcc: ['bcc1@example.com', 'bcc2@example.com'],
  replyTo: 'replyto@example.com',
};

try {
  const response = await sendEmailUsingGmail(emailParams);
  console.log('Email sent successfully:', response);
} catch (error) {
  console.error('Error sending email:', error);
}
```
### 4. Gmail SMTP Email Parameters
   The sendEmailUsingGmail function accepts an object (emailParams) with the following parameters:

- to: Email address of the recipient.
- subject: Subject of the email.
- text: Plain text content of the email.
- isHtml: Boolean indicating whether the email content is HTML (default is false).
- attachments: Array of file attachments to be included in the email.
- from: Sender's email address.
- pass: The app password for the sender's Gmail account.
- cc: Array of email addresses for CC (Carbon Copy).
- bcc: Array of email addresses for BCC (Blind Carbon Copy).
- replyTo: Email address to set as the reply-to address.

### 5. Handling HTML Emails, Attachments, and Additional Note
If the email content is HTML (isHtml is true), ensure that the HTML content is provided in the text parameter. Attachments can be included by providing an array of attachment objects with fileName and path properties.

### Example Use Cases
This Gmail SMTP utility is suitable for scenarios where emails need to be sent from various advisor emails. It can be used in applications where dynamic sender addresses are required.

## Email Webhook
To process incoming email messages from Postmark, the following webhook route and controller method are implemented.

### 1. Webhook Route
 ```Javascript
 router.post('/post-mark', webhookController.processEmailMessage);
 ```

### 2. Webhook Controller Method
The processEmailMessage method extracts specific parts from the decoded HTML body of the incoming email using regex patterns. It then processes the email content and attachments to update the relevant records in the database.

Extracting Message Content
```javascript
const messageContent = /<div dir="ltr">(.*?)<br><div class="gmail_quote">/.exec(he.decode(req.body.HtmlBody));
const message = req.body.StrippedTextReply
  ? `<body>${messageContent[1].replace(/<\/div>$/, '')}</body>`
  : 'This file is coming from email';
```
Extracting Message ID
```javascript
const msgId = req.body.Headers
  .filter((item) => item.Name === 'References')
  .map((value) => {
    const decodedString = he.decode(value.Value);
    const regex = /<([^@>]+)@/;
    const matches = decodedString.match(regex);

    if (matches && matches.length > 1) {
          return matches[1]; // Return the captured value
      }
  });
```

Processing Email Data
```javascript
const { postmarkInboundDomain } = config;
const to = req.body.ToFull.filter((item) => !item.Email.includes(`@${postmarkInboundDomain}`)).map((item) => item.Email);
const cc = req.body.CcFull.map((item) => item.Email);
const placement = await LenderPlacement.findOne({ postmarkMessageId: { $elemMatch: { $eq: msgId[0] } } });
logger.info(`MessageId of email received : ${msgId}`);
if (placement) {
  const user = await userService.getOne({ email: req.body.From });
  const documents = [];
  await Promise.all(
    req.body.Attachments.map(async (attachment) => {
      Object.assign(attachment, { userId: user ? user._id : req.body.From });
      const url = await uploadEmailAttachmentToS3(attachment, config.aws.enablePrivateAccess);
      documents.push({ url, fileName: attachment.Name, fileType: attachment.ContentType });
    })
  );

  const update = {
    $push: {
      messages: {
        updatedAt: new Date(),
        message,
        documents,
        to,
        cc,
      },
    },
  };

  if (user) {
    Object.assign(update.$push.messages, { sender: user._id });
  } else {
    Object.assign(update.$push.messages, { senderEmail: req.body.From });
  }

  await lenderPlacementService.updateLenderPlacement({ _id: placement._id }, update);
  logger.info(`Message created for ${message} because ${user ? user.firstName : req.body.FromName} replied to email`);
}

return res.status(httpStatus.OK).send({ success: true });
```

**Explanation**
1. Message Content Extraction:
   - The messageContent variable uses a regular expression to extract the message content from the decoded HTML body of the incoming email. It is then processed to remove any trailing </div>.

2. Message ID Extraction:
   - The msgId variable filters the headers of the incoming email to find the item with the name 'References'. It then extracts the desired string using a regular expression pattern.

3. Processing Email Data:
   - The method continues by processing the email data, including checking if the email is associated with a LenderPlacement record, fetching the user information, and uploading attachments to AWS S3.
   - It then updates the relevant records in the database with the received email data, including the message content, documents, recipients, and sender information.

4. Response:
   - Finally, the method responds with a success status.

Ensure that the required services, such as lenderPlacementService, userService, and uploadEmailAttachmentToS3, are implemented in your project.

