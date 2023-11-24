# Project Access Control 

## Roles and Access Levels

### 1. Advisor

The Advisor role has maximum access to the project routes. They can perform the following actions:

- **Read Access:**
    - View borrower and lender profiles.
    - Access detailed information about borrowers and lenders.
    - Access detailed information about all deals.

- **Write Access:**
    - Add borrower and advisor.
    - Add and update Lender, LenderPrograms and Lending institutions.
    - Add or update lenders details from Excel file by postman. 
    - Create and update sponsor.
    - Create, update, or delete deal.
    - Add borrowers to deal.
    - Add Lenders to the deal for placement.
    - Update the status of lenderPlacements .
    - Send deal info to the lender to review.
    - Taking the follow-ups from the lender for sent deals.
    - Create, update, or delete deal notes.
    - Manage the lenderPlacement of a deal.
      - Adding and editing terms.
      - Uploading and downloading term sheets.
      - Communicate with lender through message (emails).
      - Assigning tasks to borrowers.
      - Updating the next steps.
    - Upload, Download and Remove documents.
    - Create and manage deal presentation.
      - Uploading Underwriting(UW) Files for the loan.
      - Editing data imported from the Underwriting(UW) sheet.
      - Uploading and removing photos.
      - Uploading and removing documents.
      - Adding, updating, and removing custom fields of various types:
        - Text
        - Bullet-points
        - Bullet-points + Text
        - Table (import data from excel file)
      - Downloading OM document.
      

- **Admin Access:**
    - Access to all routes and functionalities.
    - Perform administrative tasks.

### 2. Borrower

The Borrower role has restricted access compared to the Advisor. They can perform the following actions:

- **Read Access:**
    - Accessing information on deals in which they are involved by advisor.
    - Viewing lender placement information based on placement status.
    - Accessing presentation and terms information.

- **Write Access:**
    - Complete the tasks which were assigned by the advisor in the deal.
    - Create, update, or delete deal notes.
    - Upload, download and remove deal documents.

### 3. Lender

- **Read Access:**
    - Viewing information about deals in which they involved by advisor.
    - Accessing deal summary information.

- **Write Access:**
    - No write access is granted.



