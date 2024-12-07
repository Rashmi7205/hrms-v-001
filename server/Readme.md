## Health Check Endpoint

### GET `/health-check`

This endpoint is used to perform a health check on the server.

### Response

The response is a JSON object with the following schema:

```json
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
## Auth EndPoint

This endpoint is used to authenticate a user via HTTP POST request. The request should include a payload in raw JSON format with the key `userId` containing the user's ID.

### POST `/auth`
Request Body
userId (string): The user's ID.
```json
  {
    "userId":String
  }
```
### Response
Upon successful authentication, the server responds with a status code of 200 and a JSON object containing:
success (boolean): Indicates whether the authentication was successful.
message (string): A message related to the authentication process.

Example response:

```json
{
    "success": Boolean,
    "message":String
}```
