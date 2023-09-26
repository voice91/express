## Naming convention for files and directories

### Context

Discuss what casing to use in regarding the file / directory and component names

### Decision

Use camelCase for anything we define. Exceptions are made if the tool we use is opinionated about the casing. For example:

- Camel case for file / directory names
- Camel case for file names
- Check the below structure for how to give name of file 

Example:
___

```
 src/
   ├── config                       - Contains config files.
   ├── controllers                  - Controller files calls appropriate service functions.
      ├── user
         ├── auth.controller.js     - Contains all controller functions of auth route
         ├── user.controller.js     - Contains all controller function of user model route
        └── index.js                - Exports all controller functions
   ├── docs                         - Contains postman collection and Swagger collection
      ├── postman.json              - Contains postman collection
      ├── opencollection.yml        - Contains swagger collection
   ├── middlewares                  - Contains middleware files.
      ├── auth.js                   - Contains function for authenticate user from the access token.
      ├── validate.js               - Contains function for validating the parameters from body, params and query.
   ├── models                       - Model files contain schema for model.
      ├── user.model.js             - Contains data schemas, methods for database interaction, and pre/post middleware for data operations.
      ├── token.model.js             - Contains data schemas, methods for database interaction, and pre/post middleware for data operations.
      ├── enum.model.js             - Contains all application enums to enhance code readability and type safety.
   ├── routes                       - Route files contain all the routes
      ├── user
          ├── v1
             ├── auth
                ├── auth.route.js   - Contains CRUD operation for auth routes
             ├── user
                ├── user.route.js   - Contains CRUD operation for user model routes
           └── index.js             - Exports all models routes
    └── index.js                    - Exports all userRole routes
   ├── services                     - Service files contain execution logic for a single web route only.
      ├── auth.service.js           - Contains all service functions of auth route
      ├── user.controller.js        - Contains all service function of user model route
    └── index.js                    - Exports all service functions
   ├── utils                        - Contains utils files.
      ├── ApiError.js               - Contains class for showing error.
      ├── catchAsync.js             - Contains Promise if resolve then execute the function else throw error from reject
      ├── pick.js                   - Create an object composed of the picked object properties
   ├── validations                  - Joi validations schema files for each route api.
      ├── user
         ├── auth.validation.js     - Contains all validation schema of auth route
         ├── user.validation.js     - Contains all validation schema of user model route
        └── index.js                - Exports all validation schemas
```

## Consequences

Consistency with file/directory names and component names.
