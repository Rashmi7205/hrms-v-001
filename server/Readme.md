The `GET /health-check` endpoint is used to perform a health check on the server.

### Response

The response returned is a JSON object with the following schema:

``` json
{
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean"
    },
    "message": {
      "type": "string"
    }
  }
}

 ```
 This endpoint is used to authenticate a user via HTTP POST request. The request should include a payload in raw JSON format with the key "userId" containing the user's ID.

### Request Body

- userId (string): The user's ID.


### Response

Upon successful authentication, the server responds with a status code of 200 and a JSON object containing:

- success (boolean): Indicates whether the authentication was successful.

- message (string): A message related to the authentication process.


Example response:

``` json
{
    "success": true,
    "message": ""
}

 ```
 ### POST /auth/login

This endpoint is used to authenticate a user and generate a session token.

#### Request Body

- user_id (string, required): The unique identifier of the user.


Example:

``` json
{
  "user_id": "user_2h38HPfqPgtLJvgqTfwbOUSbD ..."
}

 ```

#### Response

The response for this request can be represented as a JSON schema:

``` json
{
  "type": "object",
  "properties": {
    "token": {
      "type": "string"
    },
    "expires_in": {
      "type": "integer"
    }
  }
}

 ```
### Create Employee

This endpoint allows the client to create a new employee record.

#### Request Body

- `emp_id` (string): Unique identifier for the employee.

- `name` (string): Full name of the employee.

- `position` (string): Job title or position of the employee.

- `dept_name` (string): Name of the department the employee belongs to.

- `date_of_joining` (string): Date of joining the organization.

- `phone_number` (string): Primary phone number of the employee.

- `alternate_number` (string): Alternate phone number of the employee.

- `email` (string): Email address of the employee.

- `passport_number` (string): Passport number of the employee.

- `passport_exp_date` (string): Expiry date of the employee's passport.

- `dob` (string): Date of birth of the employee.

- `skills` (array of strings): List of skills possessed by the employee.

- `marital_status` (string): Marital status of the employee.

- `bank_info` (array of objects):

    - `name_of_bank` (string): Name of the bank where the employee holds an account.

    - `account_number` (string): Account number of the employee.

    - `ifsc_no` (string): IFSC code of the employee's bank branch.

    - `account_type` (string): Type of bank account (e.g., Savings, Current).

- `experiences` (array of objects):

    - `company_name` (string): Name of the company where the employee gained experience.

    - `designation` (string): Job title or designation at the company.

    - `from` (string): Start date of employment at the company.

    - `to` (string): End date of employment at the company.

    - `role_desc` (string): Description of the role and responsibilities at the company.


#### Response (JSON Schema)

``` json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string"
    },
    "message": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "emp_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "position": {
          "type": "string"
        },
        "dept_name": {
          "type": "string"
        },
        "date_of_joining": {
          "type": "string",
          "format": "date"
        }
        // ... (other properties)
      }
    }
  }
}

 ```
 ### Upload Employee Document

This endpoint allows you to upload a document for a specific employee.

#### Request Body Parameters

- `documents` (file): The document to be uploaded.

- `empId` (text): The ID of the employee for whom the document is being uploaded.

- `docName` (text): The name of the document.


#### Response

The response is a JSON schema with the following structure:

``` json
{
  "type": "boolean"
}

 ```

The response will be a boolean value indicating the success of the document upload.