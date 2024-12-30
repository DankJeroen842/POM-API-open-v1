# Proof of Me -- API v1.0
![Untitled design - 2024-12-30T223823 579](https://github.com/user-attachments/assets/3a278159-8ca8-4e7a-b44e-59e3c4047fbf)

---

# Integrating the PoM Unified API (v1.0)

The PoM Unified API (v1.0) simplifies connecting to advanced AI services by offering a single interface for multiple providers like OpenAI, Gemini, ElevenLabs, and RunwayML. Follow the steps below to integrate it seamlessly into your application.

## Visual Representation on how the PoM Unified API (v1.0) works: 

![Untitled design - 2024-12-30T223904 272](https://github.com/user-attachments/assets/05d48802-0378-4b92-8e87-e2bc5c2282b7)
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

```

# The Second Part of the PoM Unified API (v1.0)

The second part of the PoM Unified API (v1.0) focuses on advanced querying and retrieval services, leveraging intelligent workflows to simplify interactions with supported AI models. These endpoints enable seamless integration with AI functionalities designed to adapt to complex requirements.

---

## 2. Querying AI Services: Advanced Features

### Endpoint:
POST /api/v1/ai/services?queryType=2&searchModel={model-id}

yaml
Copy code

This endpoint allows users to send more advanced queries to supported AI models.

---

### Query Parameters:

| Parameter       | Type   | Description                                                   | Required |
|------------------|--------|---------------------------------------------------------------|----------|
| `queryType`      | Number | Identifies the advanced query type (always `2` for this).     | Yes      |
| `searchModel`    | Number | Model or service ID (e.g., `1` for Gemini, `2` for OpenAI).   | Yes      |

---

### Request Body:

```json
{
  "advancedPrompt": "Provide a detailed analysis of climate change trends using AI insights."
}
Authentication: Include your Bearer Token in the Authorization header:

text
Copy code
Authorization: Bearer your-generated-bearer-token

Example Code: Advanced Query Integration
Below is an example of using JavaScript to make an advanced query request:

javascript
Copy code
const fetch = require("node-fetch");

async function queryPoMAPIAdvanced(advancedPrompt) {
  const response = await fetch("https://api.pom.example/ai/services?queryType=2&searchModel=23", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-generated-bearer-token",
    },
    body: JSON.stringify({ advancedPrompt }),
  });

  if (!response.ok) {
    throw new Error("Error connecting to PoM API for advanced query");
  }

  const data = await response.json();
  return data.response;
}

// Example Usage:
queryPoMAPIAdvanced("Generate an advanced analysis on market trends.")
  .then(response => console.log(response))
  .catch(error => console.error(error));
```
# View our Documentation for more information

---

## Our Docs provides everything you need to know, including our roadmap and future plans, along with the actual functionality of PoM

---

*Discord: https://discord.gg/RuphQvfd
*Twitter: https://x.com/pomdotfun
*Website: https://proofofme.fun
*Docs: xxx

*Contract address: 
