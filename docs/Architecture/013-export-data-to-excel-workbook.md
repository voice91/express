# Export data to excel workbook
### Key Functionalities
1. Creating Excel Workbook
   - The script utilizes the exceljs library to create a new Excel workbook. Two worksheets, CLEAN_CONTACTS and CLEAN_LENDERS, are added to the workbook. Field names and values will be populated on these sheets.

2. Exporting Data
   - Lender Contacts
     - The script fetches data from the LenderContact collection and writes relevant information to the CLEAN_CONTACTS worksheet.
   - Field Names:

| Column Ref | Field Name    |
|------------|---------------|
| A          | Lender        |
| B          | First Name    |
| C          | Last Name     |
| D          | Program(s)    |
| E          | Nick Name     |
| F          | Email         |
| G          | Main Phone    |
| H          | Mobile Phone  |
| I          | Office Phone  |
| J          | Title         |
| K          | City          |
| L          | State         |
| M          | contactTag    |
| N          | Email Tag     |
| O          | ContactId     |
| P          | LenderId      |

 

   - Lender Programs
     - Data from the LenderProgram collection is processed and exported to the CLEAN_LENDERS worksheet.
     - Field Names:

| Column Ref | Field Name            |
|------------|-----------------------|
| A          | Lender Name           |
| B          | Lender Type           |
| C          | Program Name          |
| D          | Min                   |
| E          | Min Tag               |
| F          | Max                   |
| G          | Max Tag               |
| H          | States Array          |
| I          | States Tag            |
| J          | Property Type Array   |
| K          | Property Type Tag     |
| L          | Does Not Do           |
| M          | Does Not Do Tag       |
| N          | Loan Type Array       |
| O          | Loan Type Tag         |
| P          | Index Used            |
| Q          | Spread Estimate       |
| R          | Counties              |
| S          | Recourse Required     |
| T          | Non-Recourse LTV      |
| U          | Description           |
| V          | Headquarters          |
| W          | Website               |
| X          | Ranking               |
| Y          | Note 1 Date           |
| Z          | Note 1 Content        |
| AA         | Note 1 Person         |
| AB         | Note 2 Date           |
| AC         | Note 2 Content        |
| AD         | Note 2 Person         |
| AE         | Note 3 Date           |
| AF         | Note 3 Content        |
| AG         | Note 3 Person         |
| AH         | Note 4 Date           |
| AI         | Note 4 Content        |
| AJ         | Note 4 Person         |
| AK         | Note 5 Date           |
| AL         | Note 5 Content        |
| AM         | Note 5 Person         |
| AN         | ProgramId             |
| AO         | LenderInstituteId     |
| AP         | Note 1 Id             |
| AQ         | Note 2 Id             |
| AR         | Note 3 Id             |
| AS         | Note 4 Id             |
| AT         | Note 5 Id             |


3. Handling Default Property Types
   - The code includes logic to handle default property types and variations in lender program data. It checks for default values, sorts and compares arrays, and appropriately sets property values for export, all the property types in the array are seperated by comma in the exported db.
   - We have two enum one defaultAssetTypeOfDeal that will have all the property type that we consider as default and another enum will have all the property type, so when we export the db we are checking whether the property type array has all the property that we have in default then we will get in exported db we will get "Default" at the place of property type.
   - Also, if we in the database in property type we have property types that are considers as default plus the other property types, then in the exported database we'll get "default + other property type1 + other property type2 + ..."

4. Handling states array
    - The code includes the logic to handle the states array, if in database if the lender program has all the states in the array that is defined in our states enum then in the exported db we will get "Nationwide", else we will get the states name like NY, NJ, AJ etc., and all the states in the array are seperated by comma in the exported db.

5. Saving and Sending File
   - After populating the worksheets, the Excel workbook is saved as LenderData.xlsx in the user's home directory. The generated file is then sent as a response, allowing the user to download it.
