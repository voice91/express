
# Migration to add 3 default advisor in the database

- In case we decide to change the database or start with a new empty database,the migration script will run. Currently, we already have this 3 advisors in our staging and production database.
- This migration script will create three advisors with the credentials:
  

  - Email: max@parallelcre.com 
    - Password: Max5


  - Email: ag@parallelcre.com 
    - Password: Ag5 
  

  - Email: richard@parallelcre.com 
    - Password: Richard5

These advisors will be added to the new database during the migration process.

# Login 

- The user can log in using this api
- The fields required to create advisors are
  1. email: Email of the advisor, the advisor with same email address can not be created **required**.
  2. password: Password to login as an advisor **required**.

Upon successful login, the access token will be automatically configured for all APIs within the collection.
You can also check the response in Visualize (This option is in the response body)

[Visualize](../images/Visualize.png) - Image displaying the location to find the "Visualize" feature in Postman.


# Advisor Registration

- The advisor can be created with the api provided in the postman collection.
- The fields required to create advisors are
  1. email: Email of the advisor, the advisor with same email address can not be created **required**.
  2. password: Password to login as an advisor **required**.
  3. firstName: The first name of the advisor **required**.
  4. lastName: The last name of the advisor **required**.
  5. role: The role needs to be defined **required**.
  6. companyName: The name of the company the advisor is associated with **required**.
  7. companyAddress: The address of the company advisor is associated with.
  8. city: The city of advisor.
  9. state: The state of the advisor and the state should be from the EnumStatesOfDeal
  10. zipcode: The zipcode of the area.
  11. phoneNumber: The phone number of the advisor

>> After creating the advisor, there is no need to verify the email address, as we have set the verification status to be true in the database.

# Borrower Registration

>> Note: Access to create a borrower is granted to "richard@parallelcre.com."

- The borrower can be created with the api provided in the postman collection.
- The fields required to create advisors are
    1. email: Email of the borrower, the borrower with same email address can not be created.
    2. password: Password to login as a borrower.
    3. firstName: The first name of the borrower.
    4. lastName: The last name of the borrower.
    5. companyName: The name of the company the borrower is associated with.
    6. companyAddress: The address of the company borrower is associated with.
    7. city: The city of borrower.
    8. state: The state of the borrower and the state should be from the EnumStatesOfDeal
    9. zipcode: The zipcode of the area.
    10. phoneNumber: The phone number of the borrower

- Once the borrower is created by you, you'll send the email manually to the borrower to let them know the password to login for the first time.
- Upon the borrower's first login, they will be prompted to set a new password.


# Delete deal 

>> Note: In the staging environment, access to delete a deal is granted to "PriyaAdvisor@gmail.com."
> While in Production it's granted to "richard@parallelcre.com"

- In the api, need to add the deal id you need to delete in the params
- Deleting a deal will also remove all related items like lender placements, terms, deal notes, deal summary, etc.


# Logo 

- The logos are upload in our AWS S3 bucket - parallel-cdn.
- It'll search for the lender's name using the logo's name and associate the logo with that specific lender.
- If the logo name does not match the lender's name, the system will not add the logo to that specific lender.

Example:

```
The lender name is 360 Capital Funding
Then the logo name should be 360-Capital-Funding.jpg
```

```
The lender name is Alma Bank
Then the logo name should be Alma-Bank.jpg
```

```
The lender name is Acres
Then the logo name should be Acres.jpg
```

>> Important Note: Logos can only be added once using this API.

