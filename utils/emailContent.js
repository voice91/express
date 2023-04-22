// todo : need to move this code and store into data base, (stor it using migration in email
//  templates model)
// todo : we have to give this _.template('hello {{user}}!')({ user: 'Urvisha' })); when we pass to email
// eslint-disable-next-line import/prefer-default-export
export const sendDealTemplate1Text = () => `
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
<div> Hi ${`<%= userFirstName %>`}</div>
<br>
  <div> This is a short message that would include details about the deal.</div><br>
  <div> Please see below the summary of PFG deal:</div><br>
  <div> The property is: example of text</div><br>
  <div> The loan of $${`<%= totalLoanAmount %>`}m is</div><br>
  <div> Best Regards,</div>
  <div>${`<%= adviser %>`}</div><br><br>
  </div>
  </body>
  </html>
`;
