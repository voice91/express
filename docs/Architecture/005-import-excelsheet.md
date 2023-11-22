# Import Data from Excel Sheet
***

## Extracting Data Related to Lenders, Contacts, and Lending Programs from Excel Spreadsheet

### Workbook Structure

The workbook should contain two worksheets, each organized with specific columns.

#### **Worksheet 1: Lender Contacts Details**

1. Lender Name : The name of the lending institution or individual lender. (String)
2. First Name : The first name of the contact person associated with the lender, this is **required**.(String)
3. Last Name : The last name of the contact person associated with the lender, this is **required**.(String)
4. Program(s) : The lending program or programs associated with the lender. This field may contain multiple program names.(String)
5. Nick Name: A nickname or alias associated with the contact.(String)
6. Email : The email address of the lender-contact, this is **required**.(String)
7. Main Phone: The primary phone number for contacting the contact person.(String)
8. Mobile Phone : (String)
9. Office Phone: (String)
10. Title : The job title or position of the contact person within the lending institution.(String)
11. City : The city where the lender or contact person is located.(String)
12. State : The state or region where the lender or contact person is located, value for this must be from below(String)
    - AL
    - AK
    - AZ
    - AR
    - CA
    - CO
    - CT
    - DE
    - DC
    - FL
    - GA
    - HI
    - ID
    - IL
    - IN
    - IA
    - KS
    - KY
    - LA
    - ME
    - MD
    - MA
    - MI
    - MN
    - MS
    - MO
    - MT
    - NE
    - NV
    - NH
    - NJ
    - NM
    - NY
    - NC
    - ND
    - OH
    - OK
    - OR
    - PA
    - RI
    - SC
    - SD
    - TN
    - TX
    - UT
    - VT
    - VA
    - WA
    - WV
    - WI
    - WY
13. Contact Tag : Values between 1 and 5, default is 1. (Number)
14. Email Tag :  Values between 1 and 5, default is 1. (Number)
15. Contact ID : A unique identifier for the contact person . (ObjectId)
16. Lender ID : A unique identifier for the lending institution or lender.(ObjectId)



#### **Worksheet 2: Lenders & Lending Programs Details**

1. Lender Name :The name of the lending institution or lender, stored in **lenderInstitution** table, this is **required**.
2. Lender Type : The type or category of the lender, such as a bank, credit union, or private lender, stored in **lenderInstitution** table
3. Program Name :  The name or identifier of the lending program.
4. Min : The minimum value or threshold associated with the program, it must be greater than 100000.
5. Min Tag : Values between 1 and 5 (Number)
6. Max : The maximum value or threshold associated with the program it must be greater than min value and less than 1000000000.
7. Max Tag : Values between 1 and 5 (Number)
8. States Array : An array or list of states where the program is applicable, values for this must be from below
   - Nationwide : for adding all states
   - AL
   - AK
   - AZ
   - AR
   - CA
   - CO
   - CT
   - DE
   - DC
   - FL
   - GA
   - HI
   - ID
   - IL
   - IN
   - IA
   - KS
   - KY
   - LA
   - ME
   - MD
   - MA
   - MI
   - MN
   - MS
   - MO
   - MT
   - NE
   - NV
   - NH
   - NJ
   - NM
   - NY
   - NC
   - ND
   - OH
   - OK
   - OR
   - PA
   - RI
   - SC
   - SD
   - TN
   - TX
   - UT
   - VT
   - VA
   - WA
   - WV
   - WI
   - WY

9. States Tag : Values between 1 and 5 (Number)
10. Property Type Array : An array or list of property types eligible for the program, this is **required**, values for this must be from below
    - Default : will add below types as default, we can also perform + and - operations to add other properties with default and remove the property from default. Like default+Healthcare, default-Industrial, etc.
    - Multifamily
    - Office
    - Retail
    - Industrial
    - Self-Storage
    - Student Housing
    - Mobile Home Park
    - For Sale Condos
    - NNN Retail
    - All : will add all types
    - Multifamily
    - Office
    - Retail
    - Industrial
    - Self-Storage
    - Student Housing
    - Mobile Home Park
    - 1_4 SFR
    - Cannabis
    - Hotels
    - For Sale Condos
    - NNN Retail
    - Healthcare
    - Short-term rentals
    - Co-living
    - Outdoor Storage
11. Property Type Tag : Values between 1 and 5 (Number)
12. Does Not Do : Any restrictions or limitations associated with the program.
13. Does Not Do Tag: Values between 1 and 5 (Number)
14. Loan Type Array : An array or list of loan types available under the program.
15. Loan Type Tag : Values between 1 and 5 (Number)
16. Index Used : Values between 1 and 5 (Number)
17. Spread Estimate : Values between 1 and 5 (Number)
18. Counties : The counties or geographic areas where the program is offered.
19. Recourse Required : Indicates whether recourse is required for loans under the program (Yes/No).
20. Non-Recourse LTV : The loan-to-value ratio for non-recourse loans.
21. Notes : (String): Values between 1 and 5. (Number)
22. Notes ID : A unique identifier for the Notes. (ObjectId)
23. Program ID : A unique identifier for the lending program.(ObjectId)
24. Lender Institute ID : A unique identifier for the lending institution.(ObjectId)

[//]: # (Storing the "lenderName" and "lenderType" data from the second worksheet into the "lendingInstitution" table.)

### Notes

1. If Sheet Contains Id Columns:
    - Update existing data for the specified ProgramId, LenderInstituteId and LenderContact.
    - If no matching documents are found, add new entries and also update the respective data.
    - Ensure no empty row between the column names and the data rows.
2. If Sheet Does Not Contain Id Columns:
   - Always Add new data from the provided sheet (CLEAN_LENDERS) for the lenderProgrammes.
   - Update the lenderInstitution data if find with LenderName else add new .
   - Update the lenderContact data if find with email else add new .
   - Ensure no empty row between the column names and the data rows.
