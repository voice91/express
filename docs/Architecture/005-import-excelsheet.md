# Import Data from Excel Sheet
***

- Extracting Data Related to Lender Contacts, Programmes & Institution from Excel Spreadsheet

# Important Note

> - When importing data from an Excel sheet, it is crucial to include unique identifiers (IDs) for each record, particularly for lenderProgrammes. IDs play a significant role in preventing data duplication and ensuring the accuracy of your dataset.
> -  **Without proper IDs for lenderProgrammes, data duplication may occur**
> - Please review and confirm that your Excel sheet includes the necessary IDs before proceeding with the import process.


## Without IDs

> **Note:**
> - Ensure no empty row between the column names and the data rows.
> - Always add new LenderPrograms.
> - Update the lendingInstitution data if found with names; otherwise, add new.
> - Add new lenderNotes.
> - Update lenderContacts if found with email; otherwise, add new.

## With IDs

> **Note:**
> - Ensure no empty row between the column names and the data rows.
> - Update LenderPrograms; if not found with ID, add new.
> - Update lendingInstitution data if found with ID; if not found, find with name and update; otherwise, add new.
> - Update lenderNotes; if not found with ID, add new.
> - Update lenderContacts if found with ID; if not found, find with email and update; otherwise, add new.

---

### Workbook Structure

The workbook should contain two worksheets, each organized with specific columns.

#### **Worksheet 1: Lender Contacts Details (CLEAN_CONTACTS)**


| #   | ColumnReference   | Field        | Description                                                                                                         |
|-----|-------------------|--------------|---------------------------------------------------------------------------------------------------------------------|
| 1   | A                 | Lender Name  | The name of the lending institution or individual lender. (String)                                                  |
| 2   | B                 | First Name   | The first name of the contact person associated with the lender. **Required**. (String)                             |
| 3   | C                 | Last Name    | The last name of the contact person associated with the lender. **Required**. (String)                              |
| 4   | D                 | Program(s)   | The lending program or programs associated with the lender. This field may contain multiple program names. (String) |
| 5   | E                 | Nick Name    | A nickname or alias associated with the contact. (String)                                                           |
| 6   | F                 | Email        | The email address of the lender-contact. **Required**. (String)                                                     |
| 7   | G                 | Main Phone   | The primary phone number for contacting the contact person. (String)                                                |
| 8   | H                 | Mobile Phone | The phone number for contacting the contact person. (String)                                                        |
| 9   | I                 | Office Phone | The office phone number for contacting the contact person. (String)                                                 |
| 10  | J                 | Title        | The job title or position of the contact person within the lending institution. (String)                            |
| 11  | K                 | City         | The city where the lender or contact person is located. (String)                                                    |
| 12  | L                 | State        | The state or region where the lender or contact person is located. (String)                                         |
| 13  | M                 | Contact Tag  | Values between 1 and 5, default is 1. (Number)                                                                      |
| 14  | N                 | Email Tag    | Values between 1 and 5, default is 1. (Number)                                                                      |
| 15  | O                 | Contact ID   | A unique identifier for the contact person. (ObjectId)                                                              |
| 16  | P                 | Lender ID    | A unique identifier for the lending institution or lender. (ObjectId)                                               |




#### **Worksheet 2: Lenders, Notes & Lending Programs Details (CLEAN_LENDERS)**

| #   | ColumnReference   | Field               | Description                                                      | Values/Constraints                                         |
|-----|-------------------|---------------------|------------------------------------------------------------------|------------------------------------------------------------|
| 1   | A                 | Lender Name         | Name of the lending institution or lender                        | String                                                     |
| 2   | B                 | Lender Type         | Type or category of the lender                                   | String                                                     |
| 3   | C                 | Program Name        | Name or identifier of the lending program                        | String                                                     |
| 4   | D                 | Min                 | Minimum value or threshold associated with the program           | Greater than 100000                                        |
| 5   | E                 | Min Tag             | Values between 1 and 5 (Number)                                  | Number                                                     |
| 6   | F                 | Max                 | Maximum value or threshold associated with the program           | Greater than Min and less than 1000000000                  |
| 7   | G                 | Max Tag             | Values between 1 and 5 (Number)                                  | Number                                                     |
| 8   | H                 | States Array        | Array or list of applicable states                               | Nationwide, AL, AK, AZ, ... (List of state abbreviations)  |
| 9   | I                 | States Tag          | Values between 1 and 5 (Number)                                  | Number                                                     |
| 10  | J                 | Property Type Array | Array or list of eligible property types                         | Default, Multifamily, Office, ... (List of property types) |
| 11  | K                 | Property Type Tag   | Values between 1 and 5 (Number)                                  | Number                                                     |
| 12  | L                 | Does Not Do         | Restrictions or limitations associated with the program          | String                                                     |
| 13  | M                 | Does Not Do Tag     | Values between 1 and 5 (Number)                                  | Number                                                     |
| 14  | N                 | Loan Type Array     | Array or list of available loan types                            | String                                                     |
| 15  | O                 | Loan Type Tag       | Values between 1 and 5 (Number)                                  | Number                                                     |
| 16  | P                 | Index Used          | String                                                           | String                                                     |
| 17  | Q                 | Spread Estimate     | Number                                                           | Number                                                     |
| 18  | R                 | Counties            | Counties or geographic areas where the program is offered        | String                                                     |
| 19  | S                 | Recourse Required   | Indicates whether recourse is required for loans , default 'no'  | String                                                     |
| 20  | T                 | Non-Recourse LTV    | Loan-to-value ratio for non-recourse loans                       | String                                                     |
| 21  | U                 | Description         | Description for the lending institution                          | String                                                     |
| 22  | V                 | Headquarters        | Headquarters of the lending institution                          | String                                                     |
| 23  | W                 | Website             | Website of the lending institution                               | String                                                     |
| 24  | X                 | Ranking             | Rank for the lending institution                                 | Number                                                     |
| 25  | Y                 | Note 1 Date         | Date for Note 1                                                  | String                                                     |
| 26  | Z                 | Note 1 Content      | Content for Note 1                                               | String                                                     |
| 27  | AA                | Note 1 Person       | Person associated with Note 1                                    | String                                                     |
| 28  | AB                | Note 2 Date         | Date for Note 2                                                  | String                                                     |
| 29  | AC                | Note 2 Content      | Content for Note 2                                               | String                                                     |
| 30  | AD                | Note 2 Person       | Person associated with Note 2                                    | String                                                     |
| 31  | AE                | Note 3 Date         | Date for Note 3                                                  | String                                                     |
| 32  | AF                | Note 3 Content      | Content for Note 3                                               | String                                                     |
| 33  | AG                | Note 3 Person       | Person associated with Note 3                                    | String                                                     |
| 34  | AH                | Note 4 Date         | Date for Note 4                                                  | String                                                     |
| 35  | AI                | Note 4 Content      | Content for Note 4                                               | String                                                     |
| 36  | AJ                | Note 4 Person       | Person associated with Note 4                                    | String                                                     |
| 37  | AK                | Note 5 Date         | Date for Note 5                                                  | String                                                     |
| 38  | AL                | Note 5 Content      | Content for Note 5                                               | String                                                     |
| 39  | AM                | Note 5 Person       | Person associated with Note 5                                    | String                                                     |
| 40  | AN                | Program ID          | Unique identifier for the lending program                        | ObjectId                                                   |
| 41  | AO                | Lender Institute ID | Unique identifier for the lending institution                    | ObjectId                                                   |
| 42  | AP                | Note 1 Id           | Unique identifier for Note 1                                     | ObjectId                                                   |
| 43  | AQ                | Note 2 Id           | Unique identifier for Note 2                                     | ObjectId                                                   |
| 44  | AR                | Note 3 Id           | Unique identifier for Note 3                                     | ObjectId                                                   |
| 45  | AS                | Note 4 Id           | Unique identifier for Note 4                                     | ObjectId                                                   |
| 46  | AT                | Note 5 Id           | Unique identifier for Note 5                                     | ObjectId                                                   |



[//]: # (Storing the "lenderName" and "lenderType" data from the second worksheet into the "lendingInstitution" table.)

### Notes

1. If Sheet Contains Id Columns:
    - Update existing data for the specified ProgramId, LenderInstituteId and LenderContact.
    - If no matching documents are found, add new entries and also update the respective data.
    - Ensure no empty row between the column names and the data rows.
2. If Sheet Does Not Contain Id Columns:
   - Always add new data from the provided sheet (CLEAN_LENDERS) for the lenderProgrammes.
   - If a matching LenderName is found, update the data for the corresponding lenderInstitution; otherwise, add a new entry.
   - If a matching email is found, update the data for the corresponding lenderContact; otherwise, add a new entry.
   - Ensure no empty row between the column names and the data rows.
