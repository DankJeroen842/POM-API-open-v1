# PoM Unified API v1.0

The **Proof of Me (PoM) Unified API** simplifies access to cutting-edge AI services by integrating multiple providers under one unified key. Version 1.0 supports the following providers:
- **Gemini**: Multimodal AI for text and vision-based tasks.
- **OpenAI**: Advanced text generation with GPT-4 and GPT-3.5.
- **ElevenLabs**: High-quality audio and voice synthesis.
- **RunwayML**: Tools for media and generative workflows.

This API allows developers to build intelligent agents, automate workflows, and accelerate AI innovation seamlessly.

---

## Installation

The PoM Unified API uses RESTful endpoints. Simply include your API key in the headers to authenticate.

---

## Example Integration

Here’s how to send a prompt to the API for text generation with OpenAI:

### Code Example (JavaScript)
```javascript
const fetch = require('node-fetch');

async function queryPoMAPI(prompt) {
    const response = await fetch("https://api.pom.example/ai/services?searchModel=4", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_API_TOKEN`,
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error("Error connecting to PoM API");
    }

    const data = await response.json();
    return data.response;
}

// Example usage
queryPoMAPI("What are the key benefits of AI?")
    .then(response => console.log(response))
    .catch(error => console.error(error));

