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