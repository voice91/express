# Export data to excel workbook
### Key Functionalities
1. Creating Excel Workbook
   - The script utilizes the exceljs library to create a new Excel workbook. Two worksheets, CLEAN_CONTACTS and CLEAN_LENDERS, are added to the workbook. Field names and values will be populated on these sheets.

2. Exporting Data
   - Lender Contacts
     - The script fetches data from the LenderContact collection and writes relevant information to the CLEAN_CONTACTS worksheet.
     - Field Names:
     Lender, First Name, Last Name, Program(s), Nick Name, Email, Main Phone, Mobile Phone, Office Phone, Title, City, State, contactTag, Email Tag, ContactId, LenderId
   - Lender Programs
     - Data from the LenderProgram collection is processed and exported to the CLEAN_LENDERS worksheet.
     - Field Names:
      Lender Name, Lender Type, Program Name, Min, Min Tag, Max, Max Tag, States Array, States Tag, Property Type Array, Property Type Tag, Does Not Do, Does Not Do Tag, Loan Type Array, Loan Type Tag, Index Used, Spread Estimate, Counties, Recourse Required, Non-Recourse LTV, Notes, NotesId, ProgramId, LenderInstituteId

3. Handling Default Property Types
   - The code includes logic to handle default property types and variations in lender program data. It checks for default values, sorts and compares arrays, and appropriately sets property values for export, all the property types in the array are seperated by comma in the exported db.
   - We have two enum one defaultAssetTypeOfDeal that will have all the property type that we consider as default and another enum will have all the property type, so when we export the db we are checking whether the property type array has all the property that we have in default then we will get in exported db we will get "Default" at the place of property type.
   - Also, if we in the database in property type we have property types that are considers as default plus the other property types, then in the exported database we'll get "default + other property type1 + other property type2 + ..."

4. Handling states array
    - The code includes the logic to handle the states array, if in database if the lender program has all the states in the array that is defined in our states enum then in the exported db we will get "Nationwide", else we will get the states name like NY, NJ, AJ etc., and all the states in the array are seperated by comma in the exported db.

5. Saving and Sending File
   - After populating the worksheets, the Excel workbook is saved as LenderData.xlsx in the user's home directory. The generated file is then sent as a response, allowing the user to download it.
