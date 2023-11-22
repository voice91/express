# Create a deal

## The deal creation is divided into five parts

1. Deal Information:
   - Deal Name: The name of the deal, also we cannot have deals with same name in the database. (String)
   - Property Address: List of all the addresses starting with the letters type at the field. (String)
   - City: Auto filled as per the address selected, but if the city name's length is more than 30 then it'll not get autofilled, need to add manually. (String)
   - State: Auto filled as per the address selected
   - Zipcode: Auto filled as per the address selected
   - Property Type: A list of property types for the program, values for this must be from below
     - Multifamily
     - Office
     - Retail
     - Industrial
     - Self-Storage
     - Student Housing
     - Mobile Home Park
     - 1_4 SFR
     - Cannabis
     - Hotel
     - For Sale Condos
     - NNN Retail
     - Healthcare
     - Short-term rentals
     - Co-living
     - Outdoor Storage
   - Upload Photo: The photo that we need as a deal logo
   - Square Footage: The square footage of the property.
   - Unit Count:
   - Occupancy:

2. Loan Information:
   - Loan Purpose: A list of loan purpose for the program, values for this must be from below
     - Purchase
     - Refinance
   - Loan Type: A list of loan type for the program, values for this must be from below
     - Stabilized
     - Light Transitional
     - Heavy Transitional
     - Construction
     - Transitional
     - Pre-development / Land
     
   ## The fields will get change as per the loan purpose and loan type selected 
   >> Loan Purpose: Purchase
   > Loan Type: "Stabilized"
    - Purchase Price
    - In Place NOI
   > Loan Type: "Light Transitional"
    - Purchase Price
    - Capex
    - In Place NOI
    - Stabilized NOI
   > Loan Type: "Heavy Transitional"
    - Purchase Price
    - Capex
    - In Place NOI
    - Stabilized NOI
   > Loan Type: "Construction"
    - Purchase Price
    - Hard And Soft Costs
    - Stabilized NOI
   > Loan Type: "Transitional"
    - Purchase Price
    - Capex
    - In Place NOI
    - Stabilized NOI
   > Loan Type: "Pre-development / Land"
    - Purchase Price
    - Pre Dev Cost

   >> Loan Purpose: Refinance
   > Loan Type: "Stabilized"
    - Existing Balance
    - Est Value
    - In Place NOI
   > Loan Type: "Light Transitional"
    - Capex
    - Existing Balance
    - Est Value
    - In Place NOI 
    - Stabilized NOI
   > Loan Type: "Heavy Transitional"
    - Capex
    - Existing Balance
    - Est Value
    - In Place NOI
    - Stabilized NOI
   > Loan Type: "Construction"
    - Hard And Soft Costs 
    - Existing Balance
    - Land Est Value
    - Stabilized NOI
   > Loan Type: "Transitional"
    - Capex 
    - Existing Balance 
    - Est Value
    - In Place NOI 
    - Stabilized NOI
   > Loan Type: "Pre-development / Land"
    - Pre Dev Cost
    - Existing Balance
    - Land Est Value
   
3. Financing Request: This fields value are related to deal summary
   - Priorities: The list of priorities 
    - Best available rate even if proceeds lower
    - Need required financing amount even if rate is higher
    - Indifferent I want to see combinations of rate/proceeds

   - Requested Loan Amount: Loan amount to be requested. The assumption amount is in USD. Minimum loan amount is $100,000 and the maximum loan amount is $500,000,000
   
   - Recourse:
    - Open to Recourse
    - Prefer non-recourse
    - Require non-recourse
   
   - CMBS:
    - Open to CMBS
    - Not open to CMBS
   
   - Minimum Term: The minimum number of years over which the loan must be repaid.
   
   - Maximum Term: The maximum number of years allowed for the repayment of the loan.
   
   - Prepayment Type: Types of prepayment 
    - Stepdown
    - Prepayment
    - Yield Maintenance
    - Lockout

4. Select Sponsor: List of Sponsor to add in the deal
5. Invite Team Members: Email address of the borrowers you need to add in the deal, it is necessary for the borrower with the email address to be present in the system or else it'll throw error "The borrowers : < email address you entered > doesn't exist", also when the deal is created the three default advisors "max@parallelcre.com","ag@parallelcre.com","richard@parallelcre.com" will get added to the deal.
