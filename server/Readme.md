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
