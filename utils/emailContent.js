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
<div> Hi ${`{{ userFirstName }}`}</div>
<br>
  <div> This is a short message that would include details about the deal.</div><br>
  <div> Please see below the summary of PFG deal:</div><br>
  <div> The property is: example of text</div><br>
  <div> The loan of $${`{{ totalLoanAmount }}`}m is</div><br>
  <div> Best Regards,</div>
  <div>${`{{ advisorName }}`}</div><br><br>
  </div>
  </body>
  </html>
`;

export const sendDealTemplate2Text = () => `
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
<div> Hi ${`{{ userFirstName }}`} - hope all is well, please see below for the financing summary of PFG Cold Storage Industrial: </div>
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
  <div> ${`{{ advisorName }}`}</div><br><br>
  <div class="text-color"> --</div><br>
  <div class="text-color"> ${`{{ advisorName }}`}</div><br>
  <div class="text-color"> Parallel CRE</div><br>
  <div class="underline", class="text-blue"> ${`{{ advisorEmail }}`}</div>
  </div>
  </body>
  </html>
`;

export const sendDealTemplate3Text = () => `
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
<div> Hi ${`{{ userFirstName }}`} - hope all is well, please see below for the 547 Valley Road financing request. </div>
<br>
  <div> 547 Valley Road is a 5,650sf, mixed-use Property (apartments and retail) located in Monclair, NJ. The Property is located on a highly-trafficked corridor, well-known as a shopping and dining destination and features convenient transportation: two blocks to the Upper Montclair train station with direct line to NYC, and short walk to #28 bus station. The in-place NOI is $102k and will increase to $158k upon the remaining residential unit being leased. Once increased, the metrics of the loan are 10.5% debt yield, 1.55x DSCR and 52% LTV.  
</div><br>
  <div> The Sponsor is looking to refinance their current loan with a $1.5m term loan. </div><br>
  <div class="underline",class="bold" > Financing Request:</div><br>
  <div> - $1.5m Request </div><br>
  <div> - Competitive Rate </div> <br>  
  <div> Please let me know when works to discuss further. </div><br>
  <div> Thank you,</div>
  <div> ${`{{ advisorName }}`}</div><br><br>
  <div class="text-color"> --</div><br>
  <div class="text-color"> ${`{{ advisorName }}`}</div><br>
  <div class="text-color"> Parallel CRE</div><br>
  <div class="underline", class="text-blue"> ${`{{ advisorEmail }}`}</div>
  </div>
  </body>
  </html>
`;
