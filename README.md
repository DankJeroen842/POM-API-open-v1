# PoM Unified API v1.0

The **PoM Unified API** simplifies AI development by integrating leading providers such as **Gemini**, **OpenAI**, **ElevenLabs**, and **RunwayML** into a single unified interface. Built to empower developers with adaptive AI workflows and powerful tools, the API is your gateway to next-generation innovation.

![PoM Unified API Overview](Untitled-design-2024-12-30T221727.463.png)

---

## Features

- **Unified Access**: A single API to interact with multiple providers.
- **Smart Workflows**: Create adaptive agents for complex processes.
- **Plug-and-Play Frameworks**: Build faster with pre-integrated AI tools.
- **Innovative AI Tools**: Enhance projects with cutting-edge technology.

---

## Installation

To set up the PoM Unified API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/DankJeroen842/POM-API-open-v1.git
   cd POM-API-open-v1
Install dependencies:

bash
Copy code
npm install
Start the API service:

bash
Copy code
npm start
Quick Start
Register a User
Use the /register-user endpoint to create a new user:

Endpoint: POST /api/v1/user/register-user

Request Body:

json
Copy code
{
  "email": "example@gmail.com",
  "geminiKey": "your_gemini_key",
  "openAIKey": "your_openai_key",
  "elevenLabsKey": "your_elevenlabs_key",
  "runwayMLKey": "your_runwayml_key"
}
Response:

json
Copy code
{
  "statusCode": 200,
  "success": true,
  "message": "User Registered Successfully, Collect the Token and start playing!",
  "data": "a72cc0b2b6e8d22e62bb4f88303b4527954287da"
}
Using the API
Example: Querying AI Services
Endpoint: POST /api/v1/ai/services?searchModel=4

Request Body:

json
Copy code
{
  "prompt": "Describe the applications of AI in education."
}
Authentication: Include a Bearer Token from the registration response.

Code Example
javascript
Copy code
const fetch = require('node-fetch');

async function queryPoMAPI(prompt) {
    const response = await fetch("https://api.pom.example/ai/services?searchModel=4", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_API_TOKEN`
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        throw new Error("Error connecting to PoM API");
    }

    const data = await response.json();
    return data.response;
}

queryPoMAPI("What are the key benefits of AI?")
    .then(response => console.log(response))
    .catch(error => console.error(error));
Supported Providers (v1.0)
Gemini: Advanced multimodal AI for text and visual tasks.
OpenAI: Robust text generation (e.g., GPT-4 and GPT-3.5).
ElevenLabs: High-quality audio and voice synthesis.
RunwayML: Tools for media and generative workflows.
Roadmap
The current version, v1.0, includes the above providers. The v2.0 release will bring additional integrations and features for a broader scope of AI-powered development. Stay updated by exploring the documentation.

Contributing
We welcome contributions to improve the PoM Unified API. Submit your pull requests or report issues for discussion.

License
This project is licensed under the MIT License.
