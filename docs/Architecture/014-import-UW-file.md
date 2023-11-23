# Import UW File 

This takes a pre-signed URL as an input, downloads an Excel file from the specified URL, and processes its data to extract relevant information. The function uses the Axios library for making HTTP requests and the SheetJS library (XLSX) for parsing Excel files.

## File Structure

File contains three sheets, 

1. Summary
   - Property Summary
   - Deal Metrics
   - Financing Request
   - Sources and Uses
     - Sources
     - Uses

2. Rent Roll
   - Rent Roll Summary

3. NOI
   - Financial Summary
     - Revenue
     - Expenses


## Functionality
1. ***Downloading the Excel File***: The function uses the provided pre-signed URL to download the Excel file, treating the response as an array buffer.

2. ***Reading Excel Data***: It utilizes the SheetJS library to read the Excel file data and extracts information from different sheets, specifically focusing on sheets named "Summary," "NOI" (Net Operating Income), and "Rent Roll."

3. ***Data Extraction***:
   - Extracts property summary, deal metrics, financing request details, sources and uses information, rent roll summary, and financial summary from the "Summary" sheet.
   - Processes and formats the data using helper functions, considering different cases and 
   number formats(currency, percentage, number, year).
 
4. ***Validation***: The extracted data is then validated to ensure consistency in the requested loan amount across different sections (Sources, Deal Metrics, and Financing Request).

5. ***Error Handling***: The function includes error handling using try-catch blocks, logging errors, and throwing custom ApiError instances with appropriate HTTP statuses.

## Logic Explanation

1. Iterating Through Sheets
2. Processing the 'Summary' Sheet:
   If the current sheet is named 'Summary', the code proceeds to extract various types of data from this sheet.

   - Property Summary:
     - The code looks for a cell with the value 'Property Summary' and then iterates through the rows to extract key-value pairs.
   - Example

| Property Summary          |               |
|---------------------------|---------------|
| Address                   | 43 West 8th   |
| City, State               | Manhattan, NY |
| Property Type             | Multifamily   |
| Gross SF                  | 5,760         |
| Residential Net SF        | 2,700         |
| Retail Net SF             | 2,850         |
| Year Built                | 2020          |
| Total Units (inc retail)  | 7             |

   - Deal Metrics:
     - Similar to Property Summary, the code looks for 'Deal Metrics' and extracts data in a similar manner.
     - example:

| Deal Metrics          |             |
|-----------------------|-------------|
| Requested Loan Amount | $5,800,000  |
| Stabilized NOI        | $622,281    |
| Estimated Value       | $11,314,207 |
| Stabilized DY         | 10.7%       |
| Stabilized DSCR       | 1.57x       |
| Estimated LTV         | 51.3%       |


   - Financing Request:
     - Similar to the above, the code extracts data for 'Financing Request'.
     - Example: 

| Financing Request         |                  |
|---------------------------|------------------|
| Requested Loan Amount     | $5,800,000       |
| Loan Term                 | 2-3 Years        |
| Interest Rate             | Competitive      |
| Recourse                  | Open to Recourse |


   - Sources and Uses:
     - The code looks for 'Sources and Uses' and then extracts data for both 'Sources' and 'Uses', organizing them into separate arrays.
     - Example:


| Sources and Uses      |               |          |
|-----------------------|---------------|----------|
| **Sources**           | **Amount**    | **%**    |
| Senior Loan           | $5,800,000    | 70%      |
| Equity                | $2,492,725    | 30%      |
| Total Sources         | $8,292,725    | 100%     |
|                       |               |          |
| **Uses**              | **Amount**    | **%**    |
| Purchase Price        | $5,400,000    | 65%      |
| Acquisition Costs     | $319,679      | 4%       |
| Loan Closing Costs    | $197,550      | 2%       |
| Property Improvements | $1,977,000    | 24%      |
| Interest Reserve      | $398,496      | 5%       |
| Total Uses            | $8,292,725    | 100%     |


3. Processing the 'NOI' Sheet:
   If the current sheet is named 'NOI', the code extracts financial data, including revenue and expenses, and add into financialSummary section.
   - Revenue:
     - The code looks for 'Financial Summary', then iterates through rows to extract revenue data, distinguishing between 'In-Place' and 'Stabilized' values.
   - Expenses:
     - Similar to revenue, the code extracts expense data, considering the headers and distinguishing between 'In-Place' and 'Stabilized'.
   - Net Operating Income:
     - The code calculates and adds net operating income based on effective gross income and total operating expenses.
   - Example:
   
 | Financial Summary              |              |                |
|--------------------------------|--------------|----------------|
| **Revenue**                    | **In-Place** | **Stabilized** |
 | Rental Revenue                 | $765,480     | $1,000,000     |
 | Other Income                   | $100,000     | $100,000       |
 | Vacancy Factor                 | ($22,964)    | ($22,964)      |
 | Effective Gross Income         | $842,516     | $1,077,036     |
|                                |              |                |
| **Expenses**                   | **Amount**   | **Stabilized** | 
 | Utilities                      | $11,584      | $11,584        |
 | R&M / Payroll                  | $6,000       | $6,000         |
 | Insurance                      | $8,800       | $8,800         |
 | Management Fee                 | $5,311       | $5,311         |
 | Real Estate Taxes              | $71,575      | $71,575        |
 | Total Operating Expenses       | $103,270     | $103,270       |
|                                |              |                |
 | Net Operating Income           | $739,246     | $973,766       |
|

4. Processing the 'Rent Roll' Sheet:
   If the current sheet is named 'Rent Roll', the code extracts data from the 'Rent Roll Summary'.
   - Column Headers:
     - The code dynamically retrieves column headers from the 'Rent Roll Summary'.
   - Data Rows:
     - It then processes data rows, extracting values for each column and organizing them into an array.
   - Example: 

| Rent Roll Summary       |                |              |            |                       |                             |              |
|-------------------------|----------------|--------------|------------|-----------------------|-----------------------------|--------------|
| **Type**                | **Unit Count** | **Total SF** | **Avg SF** | **Total Annual Rent** | **Avg Monthly Rent / Unit** | **Rent PSF** |
| Retail                  | 2              | 2,850        | 1,425      | $258,000              | $10,750                     | $91          |
| Residential             | 6              | 2,700        | 450        | $507,480              | $7,048                      | $188         |
| Total                   | 8              | 5,550        | 694        | $765,480              | $7,974                      | $138         |


The extracted data is organized into various arrays such as propertySummary, dealMetrics, financingRequest, sourcesAndUses, financialSummary, and rentRollSummary.

### Note

- The function assumes a specific structure and naming conventions in the Excel file sheets for proper data extraction.