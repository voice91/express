# The information related to all the things in manage lender page 

# Add Terms 

* The terms we will add here will be visible in Terms tab.

1. Loan Amount
    - Initial Funding: The initial funding amount
    - Future Funding: The future funding amount
    - Total Funding: The total funding amount
   
2. Interest Rate
    - Interest Rate Type: There are three types of interest rate 1) Fixed (Index) 2) Fixed (No Index) 3) Floating.
   >> For Fixed (Index) and Floating
    - Index: 
      - Overnight SOFR
      - 30-day SOFR
      - Libor
      - 5-Year Treasury
      - 7-Year Treasury
      - 10-Year Treasury
      - 2-Year SOFR Swap
      - 5-Year SOFR Swap
      - 7-Year SOFR Swap
      - 10-Year SOFR Swap
    - Index Value: The percentage of index value.
    - Index As Of Date: It'll default set to the current date.
    - Spread : The percentage of spread, and if we select Index then this field is required.
    - Total Interest Rate: The percentage of total interest rate.
      - If the Index is "Libor" then total interest rate is the addition of Index value and spread Index, but if index value is not there then it is equal to spread index percentage.
      - For other Index , the total interest rate is the addition of Index value and spread Index, but if index value is not there then it is equal to 0% .
    - Rate Notes: The note that we want to add related to the rates
   >> For Fixed (No Index)
    - Total Interest Rate: The percentage of total interest rate.
    - Rate Notes: The note that we want to add related to the rates.
   
3. Term
    - Initial Term: It describes the number of years or month of initial term, whether it'll be for months or years can be selected from the drop-down at initial term field.
    - Term Notes: The note that we want to add related to the term
   
4. Amortization / IO / Prepayment
    - Amortization: It describes the number of years or month of amortization , whether it'll be for months or years can be selected from the drop-down at initial term field.
    - Interest-Only Period: It describes the number of years or month for interest , whether it'll be for months or years can be selected from the drop-down at initial term field.
    - Prepayment Type : The prepayment types are 1) Lock Out 2) Yield Maintenance 3) Minimum Interest 4) Stepdown 5) No Penalty
   >> For Lock Out, Yield Maintenance, Minimum Interest
    - Prepayment Period - It describes the number of years or month for pre-payment , whether it'll be for months or years can be selected from the drop-down at initial term field.
   >> For Stepdown
    - Penalty Schedule
   
5. Fees
    - Origination Fee: The percentage of origination fee
    - Exit Fee: The percentage of exit fee
   
6. Recourse
    - Recourse: Type of recourse, we have three types of recourse 1) Non Recourse 2) Partial Recourse 3) Full Recourse

7. Stipulations
    - As-Is LTV
    - Stabilized LTV
    - LTC
    - As-Is Debt Yield
    - Stabilized Debt Yield
    - As-Is DSCR
    - Stabilized DSCR
   
8. General Notes: The general note that we want to add.

>> Note: 
> In terms tab the field that don't have any value will have NA.
> If no lenders in the deal have future funding then future funding and total funding field will not be there in terms tab, but any one of the lenders have future funding then the lender's that don't have future funding will have value as NA.
> Swap button between lenders is used to swap the terms of lenders in terms tab

# TermSheet

- We can upload image (.jpeg, .png), Excel sheet (.xlsx), pdf (.pdf), doc (.docx)
- Once the term sheet is uploaded, in terms tab we'll get the term sheet at the bottom of the terms of that lender and by clicking on it, we can download the term sheet, and for the lender's without term sheet will have value as "Soft Quote".
>> Note: We can download from three places
> The document button next to Manage button on placement tab, from manage lender page and from the terms tab

# Documents

* The documents are divided into two parts:
1. The above documents are the documents like Underwriting file and documents that we upload in presentation tab from edit deal. This documents will be same for all the lenders as we are adding that in deal summary.
2. The below documents are the documents that we add while sending messages. This documents will be different for different lenders as we are sending messages for particular lender only.

# Task

1. Create Task: We can add questions that we need to ask the borrower, and can also upload the document related to it.
2. Respond: By clicking on the respond we can give reply to the question asked, and we can also upload the document while giving the response. The borrower and advisor both can also give response to the questions
3. Pending Review: We can add more response to the question from here.
4. The right symbol: By clicking on it, the task will get completed.

>> We have OutStanding Tasks and Completed Task
> Completed Task: The tasks that are marked as completed will be shown here
> OutStanding Tasks: The tasks that are unfinished and need to be complete will be shown here
