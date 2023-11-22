# Send deal

*** 
In the deal need to add lenders in the placement tab to send deal to them, also before sending deal we need to add presentation to the deal

Select the contact to which you want to send the deal

> Note: The word inside {{ }} are variables, whose values will get resolved in the preview, and also it is necessary for that variable to be in the database and also set in the backend code, we cannot write any random words in the curly bracket

1. Send to: The email address of the contact you selected.
2. Cc: The email address which we want to receive a copy of the original email
3. Subject: The subject of deal is coming from the value of heading  field in the presentation, if we edit the subject here it'll not get changed in the email received as we are populating it from the heading
4. Content of the mail: The context of the mail is divided into 4 parts
    - Hi {{ lenderFirstName }}, : The lender first name is the variable which will get resolved in the preview and the value of it is the first name of the contact we selected.
    - The paragraph starting with On Behalf of... is getting populated from the executive summary of the deal that we can edit in presentation tab.
    - Click the link to access the full information on the Parallel website: {{ dealSummaryLink }}: The deal summary link will have to link to our deal summary page when the lender will click on this link from the mail he'll be directed to deal summary page of the deal.
    - After Best Regards, if the advisor have added the signature to it's profile from setting then we'll have signature of it else we will get the variable as {{ advisorName }} and the value of it will be first name of the advisor who's sending the deal.

* The content of the mail is editable, so we can remove everything and can add the information we need to send to the lenders in the mail.

Send Test Email: This will send the mail to the advisor who is sending the deal, it'll be helpful for the advisors if they need to check tha mail before sending them out to the lenders.
Send Email: This will send the mail to email address of the lender contact we selected (the email address in send to) and also to the email address added in the Cc.


# Follow-up

***
If we didn't get any response from the lender we can send them follow-up mail, this followup button will get disappear after 24 hours

Content of the follow-up mail: 
- Hi {{ lenderFirstName }} - following up, did you have any feedback on this deal: In this {{ lenderFirstName }} variable will get resolved in the preview and the value of it will be the first name of the lender's contact we selected.
- Click the link to access the full information on the Parallel website: {{ dealSummaryLink }}: The deal summary link will have to link to our deal summary page when the lender will click on this link from the mail he'll be directed to deal summary page of the deal.
- After Best Regards, if the advisor have added the signature to it's profile from setting then we'll have signature of it else we will get the variable as {{ advisorName }} and the value of it will be first name of the advisor who's sending the deal.


* The content of the follow-up mail is editable, so we can remove everything and can add the information we need to send to the lenders in the mail.

