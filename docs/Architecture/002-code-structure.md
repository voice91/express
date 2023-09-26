## Coding Standard

## Context

Discuss the rules regarding the coding standard for node app.

## Decision

The best coding practices and standards for node development. These are not hard and fast rules but common practices to write clean and consistent code

Here are some coding practices which needs to follow in Node.js project:

1.  Naming Conventions:
    Document naming conventions for variables, functions, and files. This helps maintain a consistent and predictable structure in codebase.

    - All files should be camelCase.
       ```
       Example: catchAsync.js
       ```

    - All the folder names should be camelCase.
       ```
       Example: 
           controllers/
           middlewares/
           mdoels/
           utils/ 
       ```

    > Note: Check the [Naming convention](docs/architecture/decisions/001-files-and-directories.md) documentation for more details.
    
   2. Developing Robust Code and APIs:
       - Input Validation: In our development process, ensuring the robustness of our code and APIs is paramount. Here are the key components we focus on:
         - Input validation is the first line of defense against invalid or malicious data. It helps maintain data integrity and application security. Here's how we approach input validation
           - In our application, we follow a structured approach to routing and input validation using Express.js. This ensures that data passed to our controllers is properly validated before processing, enhancing data security and integrity. In this section, we'll demonstrate how to add input validation to a specific route.
        ```javascript
        // Sample data to validate
        const inputData = {
          name: 'John Doe',
          age: 25,
          email: 'johndoe@example.com',
          isActive: true,
          status: EnumStatusOfUser.ACTIVE, // Using the enum for user status
          hobbies: ['reading', 'gaming'],
        };
        
        
        // Define Joi schemas for input validation
        const getExample = Joi.object({
          // String Field
          name: Joi.string().required(),
          // Numeric Field
          age: Joi.number().integer().min(18).max(99).required(),        
          // Boolean Field
          isActive: Joi.boolean().required(),        
          // Enum Field (String with Allowed Values)
          status: Joi.string().valid(...Object.values(EnumStatusOfUser)).required(),
          // Array of Strings
          hobbies: Joi.array().items(Joi.string()).required(),
          // Custom Validation Rule for Email
          email: Joi.string().email().required(),
          // Custom Validation Rule for Password
          password: Joi.string().custom((value, helpers) => {
            // Custom password validation logic here
          }, 'custom password validation').min(8).required(),
        });      
      
        // Define a route with input validation
      
        // Handle the validation error:
        // - Check the error object for specific details about the validation failure.
        // - Determine whether the error is due to data type mismatches, missing required fields,
        //   or other validation issues.
        // - Return an appropriate response to indicate the nature of the validation failure. 
        router.get(
          '/example-route',
          validate(exampleValidation.getExample), // Apply input validation middleware
          exampleController.getExample // Handle the request in the controller
        );
        ```
         - Functional Validation
           - it is crucial to focus on the following functional validation points.
           - These checks are vital for preserving data integrity and ensuring that the feature functions as intended.
           - 1. Preventing Self-Friending
              - Description: Users should not be allowed to send friend requests to themselves, as it doesn't make sense in the context of our application.
           ```javascript
             if (userId === friendId) {
               throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot send a friend request to yourself');
             }
           ```
            - 2. Checking User Existence
              - Description: Before sending a friend request, it's crucial to verify if the recipient user exists in our database. This prevents sending requests to non-existent users.
            ```javascript
             if (!(await User.findById(friend))) {
               throw new ApiError(httpStatus.BAD_REQUEST, 'No such user exists');
             }
           ```  
            - 3. Preventing Duplicate Requests
              - Description: We want to avoid sending duplicate friend requests to the same user. If a user has already sent a request to another user, we should prevent sending another request.
            ```javascript
           /**
           * Check if already Friend
           * @param {string} friend - Friend's Id
           * @param {string} user - The If of the Self User
           * @returns {Promise<boolean>}
             */
             friendSchema.statics.getFriend = async function (friend, user) {
              const friendObj = await this.findOne({
                $or: [
                  { user, friend },
                  { user: friend, friend: user },
                ],
              });
              return friendObj;
             };
           // We optimize database queries by consolidating multiple conditions in the code. If a friendObj is found, we handle additional error checking conditions to provide precise error messages to the user
           ```
           ```javascript
             const existingFriend = await Friend.getFriend(friend, userId);
             
             if (existingFriend && existingFriend.user.toString() === userId) {
               throw new ApiError(httpStatus.BAD_REQUEST, 'You already sent a request to this user');
             }
            ``` 
            - 4. Handling Existing Friendships
              - Description: If the recipient is already a friend of the sender, we should prevent sending another friend request.
            ```javascript
            if (existingFriend && existingFriend.status === 'accepted') {
              throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already your friend');
            }
            ```                     
        - Logic Implementation
        - Testing
          - Testing and Data Integrity
            Testing is a critical part of the development process, ensuring that our friend request feature functions reliably and securely. Here are some key considerations for testing:

          - Positive Testing:- Positive testing validates that the system behaves correctly with valid inputs and expected scenarios.
          
            - Implementation Details:
          
            1. Test the ability to send a friend request successfully when all conditions are met.
            2. Verify that notifications are sent to users upon receiving a friend request.
            3. Test user interfaces for user-friendliness and clarity.
          - Negative Testing:- Description: Negative testing examines how the system handles invalid inputs and unexpected scenarios.
          
            - Implementation Details:
          
            1. Test sending a friend request with missing or incomplete data.
            2. Verify that appropriate error messages are displayed when validation checks fail.
            3. Test boundary conditions, such as sending friend requests with very long or empty input data.
            4. Verify that the system gracefully handles errors and exceptions.
          - Database Integrity:- Ensuring data integrity in the database is crucial to prevent data corruption and maintain consistency.
          
            - Implementation Details:
          
            1. Implement database tests to check if data is correctly stored, updated, and deleted.
            2. Verify that the data type of fields matches the expected data type (e.g., numbers should be stored as numbers, not strings).
            3. Use database queries to confirm that the data is stored accurately and retrieved correctly.
        - Monitoring and Logging
          - Implement monitoring and logging to track system behavior during testing and in production.
            - Implementation Details:
             1. Set up logging to record test results, errors, and events.
             2. Monitor application performance and behavior during testing.
             3. Use logging and monitoring tools to identify and address issues quickly.
             4. Please refrain from using console.log. Instead, utilize logger.info for informative messages and logger.error for error-related information. This practice ensures that our logging system is consistently used for both standard and error messages, enhancing code maintainability and traceability.
            ```javascript
            // for information
            logger.info(`message created for ${message} bcs ${user.firstName} reply to email`);
            
            // for error
            logger.error(`Error in getting information for user: ${error}`);
            ```
3. Use of Enums: Enums provide meaningful names for constants, improving code readability and type safety.
   - Why Use Enums
     - Code Clarity: Enums provide meaningful names for constants, making the code more readable and self-explanatory.

     - Type Safety: Enums allow us to define a specific set of valid values, reducing the risk of using incorrect or unexpected values.

     - Maintainability: When we need to update or extend the list of valid values, enums make it easy to do so without affecting the rest of the codebase.
     ```javascript
     const EnumRoleOfUser = {
       USER: 'user',
       ADVISOR: 'advisor',
       LENDER: 'lender',
     };
     // we've defined an enum EnumRoleOfUser with three valid roles: 'user,' 'advisor,' and 'lender.' By using this enum, we ensure that any role-related code is both clear and robust.
     
     // When working with enums, we can simply refer to the enum values, which improves code readability
     
     // Instead of using plain strings
     const userRole = 'user';
     
     // Use the enum
     const userRole = EnumRoleOfUser.USER;
     ```
4. Code Comments:
    As the tech lead of our prestigious IT company, I want to ensure that our development process is as smooth and efficient as possible. To achieve this, it's crucial that we maintain a clear and well-documented codebase    
   - Clearly document the function's parameters and return value using JSDoc-style comments.
        ```javascript
        /**
         * Calculate the total price of items in the shopping cart.
         * @param {CartItem[]} cart - An array of CartItem objects.
         * @returns {number} - The total price of items in the cart.
         */
        function calculateTotalPrice(cart) {
            // Function implementation
        }
        ```
   - Ensure that every function and significant block of code is well-commented. Explain the purpose of the code and any critical decisions made.

       ```javascript
       // Calculate the total price of items in the shopping cart
       function calculateTotalPrice(cart) {
           let totalPrice = 0;
           for (const item of cart) {
               // Multiply item price by quantity and add to the total
               totalPrice += item.price * item.quantity;
           }
           return totalPrice;
       }
       ```
   - When writing your own code, make sure to add comments explaining your decisions and the code's purpose. This helps other developers understand your thought process.
      ```javascript
      // This function sorts the list of products by price in ascending order
      function sortProductsByPrice(products: Product[]): Product[] {
          // Using the Array.sort() method with a custom comparator function
          return products.sort((a, b) => a.price - b.price);
      }
      ```
   - Caution developers against removing or modifying code that is essential for the system's stability and integrity. Clearly, state the consequences of such changes.
      ```javascript
      // WARNING: Do not remove or modify this code block without consulting the team.
      // It initializes the database connection and is critical for the application's functionality.
      const dbConnection = initializeDatabase();
      ```
   - If there are tasks or improvements that need to be addressed in the code, use TODO comments to mark them. Describe the task briefly and, if possible, include the developer's name or initials for accountability.
      ```javascript
      // TODO: Refactor this code for better performance (John)
      ```
   - When making changes that result in code becoming deprecated, please follow these guidelines:
      ```javascript
         //Mark as Deprecated: Insert the `@deprecated` JSDoc tag before the deprecated code block. Include a clear explanation of why it's deprecated and any recommended alternatives.
         /**
          * @deprecated
          * This code is no longer in use due to recent requirements changes. Please use the new '/lender/placement' route to access placement information.
          */
         function deprecatedFunction() {
             // Deprecated code implementation
         }
        ```
   - we encourage developers to include links to external documentation, specifications, or relevant resources within their comments. These links should reference specific sections of external documentation that relate to the code in question, and it's essential to keep them up to date as external resources may evolve. By incorporating such documentation links, we enhance our codebase's comprehensibility and facilitate efficient development and collaboration

5.  Linting and Formatting:
    Integrate a linter and code formatter into the project to enforce the coding standards automatically. Popular tools for this in the React ecosystem include ESLint and Prettier.

### Some common basic rules to be kept in mind to write clean code:

1. Create multiple files instead of writing a big file.
2. Use a linter to make your code easier to review. Follow strict linting rules. This in turn helps you write clean, consistent code.
3. Replace all occurrences of console.log with the logger.info method, Retain crucial log statements, specifically those responsible for handling promise-related critical errors, ensure you utilize logger.error.
    ```javascript
    const resetPassword = catchAsync(async (req, res, next) => {
      try {
        logger.info(`Resetting the password for ${req.body.email} email`);
        await authService.resetPasswordToken(req.body);
        logger.info(`Password reset is successful for ${req.body.email} email`);
        res.status(httpStatus.OK).send({success: true, message: 'Password has been reset successfully'});
      } catch (error) {
        logger.error(`Error in reset password: ${error}`);
        next(new ApiError(httpStatus.BAD_REQUEST, error));
      }
    });
    ```
4. Before you commit your code, be sure to carefully check it to maintain high coding standards and professionalism.
5. Create a set of utility files to eliminate redundant code across multiple files.
6. Assign meaningful names to your files based on their respective functions and responsibilities.

   ```javascript
   // Example (file-name)
   auth.service.js
   
   // Code
   
   // Import necessary modules
   import User from '../models/user';
       
   // Function to register a new user
   export async function registerUser(userData) {
     try {
       // Create a new user record in the database
       const user = await User.create(userData);
       return user;
     } catch (error) {
       throw error;
     }
   }
    
    // Function to log in a user
    export async function loginUser(username, password) {
      try {
        // Check if the username and password match a user in the database
        const user = await User.findOne({ username, password });
        return user;
      } catch (error) {
        throw error;
      }
    }
   ```

7. Destructuring objects in code can contribute to improved code cleanliness and maintainability.
   ```javascript
     // good
     const { user, body, params, query } = req;
     const { page, limit } = query;
     const { subscriptionId } = params;

     // bad
     const { firstName } = getUser;
     const { sendEmailFrom } = getUser;
     const { appPassword } = getUser;

     // bad
     const page = req.query.page;
     const limit = req.query.limit;
     const subscriptionId = req.params.subscriptionId;
   ```

8. Organizing Imports:- In your Node.js backend code, it's beneficial to organize imports in a structured and consistent manner. This practice helps in quickly identifying the source of dependencies and maintains a clean code structure.

   We recommend the following order for organizing imports:
   - Import built-in Node.js modules first. These modules are provided by Node.js itself.
   - Import external packages or third-party libraries after built-in modules. These are packages you've installed using a package manager like npm or yarn.
   - Import internal modules or files from your own project last. These could be custom modules or files you've created.

       ```javascript
       // Built-in Node.js modules
       const fs = require('fs');
       const http = require('http');
       // External packages
       const express = require('express');
       const mongoose = require('mongoose');
    
       // Leave one blank line after external packages before importing internal modules.
       // Internal modules or files
       const userRoutes = require('./routes/userRoutes');
       const database = require('./database');
       ```
  
9. Import particular methods/functions from lodash lib, don’t import whole methods.

    ```javascript
    /* import only required methods excepts import whole lib */

    // Use
    import { get, map, filter, isEmpty } from 'lodash';

    // Don't use
    import * as _ from 'lodash';
   
    // Use
    import { errorConverter, errorHandler } from 'middlewares/error';

    // Don't use
    import { errorHandler } from 'middlewares/error';
    import { errorConverter } from 'middlewares/error'; 
   
    // Don't use
    import error from 'middlewares/error';
    error.errorConverter
    ```
10. Develop reusable module functions to facilitate consistent usage across your codebase. This approach not only enhances maintainability but also simplifies the process of updating these functions.

    Example:
    ```javascript
    // common module function
    const impactCalculations = ({ klixPoints }) => {
      const carbon = klixPoints * 0.001;
      const tree = Math.floor(klixPoints * 0.001);
      const plastic = klixPoints * 0.002;
      return ({ carbon, tree, plastic });
    }
    ```
11. Use the export pattern of export const functionName rather than exporting as module.exports {} for a more professional and modern code structure.
    ```javascript
    // Use
    export const getUser = async ({userId}) => {
      return User.findById(userId);
    };
    
    // Don't use
    const getUser = async ({userId}) => {
      return User.findById(userId);
    };
    module.exports = {
      getUser
    }
    ```
12. Utilize parameter destructuring to pass function parameters, promoting a professional and modern coding approach.
    ```javascript
    // Use
    
    ```
13. 



