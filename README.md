# Integrating the PoM Unified API (v1.0)

The PoM Unified API (v1.0) simplifies connecting to advanced AI services by offering a single interface for multiple providers like OpenAI, Gemini, ElevenLabs, and RunwayML. Follow the steps below to integrate it seamlessly into your application.

---

## 1. Registering a User

To start using the PoM API, register your account with your AI service keys.

### **Endpoint:**
`POST /api/v1/user/register-user`

### **Request Body:**
```json
{
  "email": "your-email@example.com",
  "geminiKey": "your-gemini-key",
  "openAIKey": "your-openai-key",
  "elevenLabsKey": "your-elevenlabs-key",
  "runwayMLKey": "your-runwayml-key"
}
Response:
json
Copy code
{
  "statusCode": 200,
  "success": true,
  "message": "User Registered Successfully, Collect the Token and start playing!",
  "data": "your-generated-bearer-token"
}
Save the data field (Bearer Token) for authenticating API requests.
2. Using AI Services
Endpoint:
POST /api/v1/ai/services?searchModel={model-id}

Query Parameters:
Parameter	Type	Description	Required
searchModel	Number	Model or service ID (e.g., 1 for Gemini, 2 for OpenAI, etc.)	Yes
Request Body (Form Data):
json
Copy code
{
  "prompt": "Your question or command here"
}
Authentication:
Add your Bearer Token to the Authorization header:

text
Copy code
Authorization: Bearer your-generated-bearer-token
Example Code: Query AI Services
Below is an example of a JavaScript function to make a request:

javascript
Copy code
const fetch = require("node-fetch");

async function queryPoMAPI(prompt) {
  const response = await fetch("https://api.pom.example/ai/services?searchModel=4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-generated-bearer-token",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Error connecting to PoM API");
  }

  const data = await response.json();
  return data.response;
}

// Example Usage:
queryPoMAPI("What is the purpose of the PoM Unified API?")
  .then(response => console.log(response))
  .catch(error => console.error(error));
