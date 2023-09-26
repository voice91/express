# JavaScript Naming Conventions

JavaScript variables, functions, and classes should follow a consistent naming convention to improve code readability and maintainability. This document outlines best practices for naming conventions in JavaScript.

## Variable Naming

JavaScript variables should be self-descriptive and follow these guidelines:

- Use camelCase for variable names with a leading lowercase character.
 ```javascript
    // Bad
    var value = 'Robin';
    // Good
    var firstName = 'Robin';
```

- Avoid different case styles such as snake_case, kebab-case, PascalCase, or ALL_CAPS.

- Use prefixes like "is," "are," or "has" for boolean variables to make their purpose clear.
  ```javascript
    // Bad:
    var visible = true;
    // Good:
    var isVisible = true;
  ```

## Function Naming

JavaScript functions should also follow camelCase and In addition, it's a best practice to actually tell what the function is doing by giving the function name a verb as prefix. 

This verb as prefix can be anything (e.g. get, fetch, push, apply, calculate, compute, post) as your requirements.

- Bad:
  ```javascript
  function name(firstName, lastName) {
    return ${firstName} ${lastName};
  }
  ```

- Good:
  ```javascript
  function getName(firstName, lastName) {
    return ${firstName} ${lastName};
  }
  ```

- Good:
  ```javascript
  function getFoodNameList(foodList) {
    return foodList.map(foodItem => foodItem.foodName);
  }
  ```

## Class Naming

JavaScript classes should use PascalCase.

- Example:
  ```javascript
  class SoftwareDeveloper {
    constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    }
  }


  const myName = new SoftwareDeveloper('Robin', 'Wieruch');
  ```

## Constants

Constants in JavaScript should be written in uppercase.

If a variable has more than one word in its variable declaration name, it makes use of an underscore (_):

var DAYS_UNTIL_TOMORROW = 1;
- Example:
  ```javascript
  const SECONDS = 60;
  const MINUTES = 60;
  const HOURS = 24;
  const DAY = SECONDS * MINUTES * HOURS;
  
  const DAYS_UNTIL_TOMORROW = 1;
  ```

## Spacing

Always put spaces around operators (\`= + - * /\`) and after commas.

- Example:
  ```javascript
  let x = y + z;
  const myArray = ["Volvo", "Saab", "Fiat"];
  ```

For more detailed information on JavaScript naming conventions, refer to [JavaScript Naming Convention Do's and Don'ts](https://www.freecodecamp.org/news/javascript-naming-conventions-dos-and-don-ts-99c0e2fdd78a/).