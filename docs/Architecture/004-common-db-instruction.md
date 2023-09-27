# Coding Standard

## Context

Discuss the rules regarding the coding standards for the Node.js application. Modify the instructions accordingly for database-related code.

## Decision

The best coding practices and standards for Node.js development. These are not strict rules but common practices to write clean and consistent code. Adapt these guidelines to database-related code.

Here are some coding practices to follow in a Node.js project, with a focus on database-related code:

1. **Selective Data Retrieval:**
    - Whether using `populate` or not, ensure that you use the `select` feature to fetch and transmit only the required fields from the database in API responses. This practice minimizes unnecessary data transfer and applies to both plain database queries and queries involving `populate`.
   ```javascript
   const options = {
    populate: [
     {
       path: 'user',
       select: ['name', 'lastName'],
     },
    ],
   };
   
   const { params } = req;
   const { userId } = params;
   const workspace = Workspace.findById(userId, projection, options);
   ```

2. **Using `Promise.all` for Independent Database Queries:**
    - To enhance efficiency, leverage `Promise.all` when executing multiple independent database queries concurrently within a single operation. This approach optimizes the retrieval of data.
   ```javascript
   const [products, prices] = await Promise.all([
     productAPI.list({ active: true }),
     priceAPI.list({ active: true, type: productType }),
   ]);
   
   // In this example, we utilize Promise.all to efficiently fetch data from multiple APIs concurrently.
   // - The `productAPI.list` and `priceAPI.list` functions are called simultaneously.
   // - Both functions return promises that resolve when the data is retrieved.
   // - By using Promise.all, we wait for both promises to resolve, and the results are destructured into the `products` and `prices` arrays.
   // - This approach optimizes the retrieval of data and improves efficiency in cases where the queries are independent of each other.
   ```

3. **Concurrent Asynchronous Operations with `Promise.all` and `map`:**
   -  To enhance efficiency and achieve concurrent execution of multiple independent tasks, we employ `Promise.all` in combination with the `map` function. This approach optimizes the retrieval, processing, or modification of data for a collection of items in parallel.
   ```javascript
   await Promise.all(models.map(async (model) => {
       await updateTable(model, user);
   })); 
   ```
4. **Database Changes via Migration Scripts:**
    - To maintain data integrity and version control, create migration scripts for making changes to the production or staging database. Avoid making direct modifications to the database.
    - **Consult Senior Team Members:**
      - Before making substantial changes to the database schema, consult with senior team members or database administrators to assess the impact of these changes and ensure alignment with the project's architectural goals.

    - **Evaluate Data Migration:**
       - When transitioning from one schema structure (e.g., array) to another (e.g., object), assess the implications on existing data. Determine whether data migration or transformation is necessary and plan accordingly.

    - **Inform Frontend Teams:**
       - Communicate proposed database changes to frontend development teams to ensure that any necessary adjustments are made on the client side. Changes in data structure may require corresponding updates in API endpoints or client-side code.

    - **Backward Compatibility:**
       - If the changes affect existing functionality, strive for backward compatibility. Consider implementing versioning mechanisms or maintaining support for the old data structure temporarily to prevent disruptions to the current user experience.

    - **Backup and Rollback Plan:**
       - Before executing migration scripts in a production environment, ensure that comprehensive database backups are in place. Develop a rollback plan in case unexpected issues arise during the migration.

    - **Post-Migration Verification:**
       - After the migration, conduct post-migration verification to ensure that the database changes have been successfully implemented and that the system operates as expected.

    - **User Education:**
       - If the changes are visible to end-users or require user action (e.g., resetting passwords), provide clear instructions and support for users to adapt to the updated system.

    - **Performance Optimization:**
       - Assess the performance impact of the changes and optimize database queries and indexing as needed to maintain or improve system performance.

   - By following these comprehensive guidelines and consulting with senior team members, we can effectively manage significant database changes, minimize disruptions, and maintain data integrity during the transition.

5. **Use of Database Transactions:**
    - Implement database transactions to ensure data consistency and integrity, especially when multiple database operations need to be executed together.
    - Transactions guarantee that all changes are either committed or rolled back as a single unit.

   ```javascript
   async function createGiftCard({ body }) {
       const session = await mongoose.startSession();
       session.startTransaction();
       try {
           // Fetch user information within the same transaction
           const userObj = await userService.getUserByEmail({ email: body.recipientEmailId });
   
           // Create a new GiftCard document within the same transaction
           const createGiftCard = await GiftCardModel.create([body], { session });
   
           if (userObj) {
               // Update the user's 'giftCardReceived' field within the same transaction
               await User.findOneAndUpdate(
                   { email: body.recipientEmailId },
                   { giftCardReceived: true },
                   { session }
               );
           }
   
           // Commit the transaction to persist changes to the database
           await session.commitTransaction();
   
           // End the session
           session.endSession();
   
           // Return the created GiftCard
           return createGiftCard[0];
       } catch (error) {
           // If an error occurs, abort the transaction and handle the error
           await session.abortTransaction();
           
           // End the session
           session.endSession();
   
           // Throw an API error with a status code and error message
           throw new ApiError(httpStatus.BAD_REQUEST, error);
       }
   }
   
   // If an error occurs, no changes to the database will be made.
   ```
   - For more information on implementing database transactions with Mongoose, refer to the [Mongoose documentation on transactions](https://mongoosejs.com/docs/transactions.html).

6. **Single Database Query per Model per API:**
    - For clean and efficient code, strive to use only one database query for one model in each API endpoint. Avoid calling the same model's query multiple times within the same API, reducing both complexity and database load.
   ```javascript
   // Bad Practice: Multiple Database Queries
   // Fetch user information with a separate database query
   const user = await User.findById(userId);
   // Fetch user's posts with another separate database query
   const posts = await Post.find({ userId });

   // Good Practice: Single Database Query per Model
   // Fetch both user information and user's posts in a single database query
   const userData = await User.findById(userId).populate('posts');
   ```
 
   ```javascript
   // Bad Practice: Multiple Database Queries
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
   // Step 2: Fetch the updated user with another separate database query
   const user = await User.findById(userId);
   
   // Good Practice: Single Database Query per Model
   const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
   ```

7. **Indexing for Performance:**
    - Improve query performance by creating appropriate indexes on frequently used database columns. Proper indexing can significantly enhance database operations.
    - Consider creating unique indexes on columns that enforce uniqueness constraints in your data. Unique indexes not only ensure data integrity but also improve the performance of unique value lookups and prevent duplicate entries.
8. **Query Optimization:**
    - Regularly review and optimize database queries. Utilize tools such as query analyzers and profiling to identify and enhance slow-performing queries.

9. **Monitoring and Logging:**
    - Implement monitoring and logging for database queries to track execution times, errors, and overall performance. Monitoring helps identify issues early and ensures data reliability.

10. **Data Validation:**
    - Maintain data integrity by validating data stored in the database. Implement data validation on both the application side and through database constraints.