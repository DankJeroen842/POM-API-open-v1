const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OpenAI } = require("openai"); // Add this line to import OpenAIAPI
const { RunwayML } = require("@runwayml/sdk"); // Add this line to import RunwayMLAPI
const { ElevenLabsClient, play } = require("elevenlabs");
const ApiError = require("../utils/ApiError")
const config = require('../config/config');
const { uploadImage } = require("../utils/uplaodDocument")
const fs = require('fs');


// - Gemini: Text → Text  
// - OpenAI: Text → Text  
// - RunwayML: Text + Images → Video    
// - Eleven Labs: Text → Audio  



const selectAIServiceProvider = async (req, res) => {

    if (!req.user) throw new ApiError(404, "User Not Found!")

    const { searchModel } = req.query 

    switch (searchModel) { // Added switch statement
        case '1':
            return await geminiTextToText(req, res);
        case '2':
            return await openAITextToText(req, res);
        case '3':
            return await runwayMLTextImageToVideo(req, res);
        case '4':
            return await elevenLabsTextToAudio(req, res);
        default:
            throw new ApiError(400, "Invalid Model Input");
    }

}
 
const geminiTextToText = async (req, res) => {

    if (!req.user.geminiKey) throw new ApiError(404, "No key found for using this Model!")
    const genAI = new GoogleGenerativeAI(req.user.geminiKey);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_TEXT_MODEL});

    // Getting prompt from body
    const prompt = req.body.prompt

    let result
    try{
        // Generating response against the given promp
        result = await model.generateContent(prompt);
    }catch(error){
        throw new ApiError(400, error)
    }
    const data = result.response.text();

    //console.log(data);
    return data

}


const openAITextToText = async (req, res) => {

    const openAI = new OpenAI({
        apiKey: req.user.openAIKey
    });

    let response
    try {
        response = await openAI.chat.completions.create({
            model: process.env.OPEN_AI_TEXT_MODEL,
            messages: [{ role: "user", content: req.body.prompt }], // Added messages parameter
            max_tokens: 50  // Adjust max_tokens as needed to control the length of the generated text
        })
    } catch (error) {
        throw new ApiError(400, error)
    }

    return response.choices[0].message.content

}


const runwayMLTextImageToVideo = async (req, res) => {


    if (!req.files || req.files.length === 0) throw new ApiError(404, "Image Not Found!")
    //console.log(req.files)
    const image = await uploadImage(req)
    //console.log(image)
    const runwayML = new RunwayML({
        apiKey: req.user.runwayMLKey, // This is the default and can be omitted
    });
    //console.log(req.user.runwayMLKey)
    const imageToVideo = await runwayML.imageToVideo.create({
        model: 'gen3a_turbo',
        promptImage: image,
        promptText: req.body.prompt,
    }).catch(async (err) => {
        throw new ApiError(err.status, err)
    })
    
    console.log(imageToVideo);
    const taskId = imageToVideo.id;

    // Poll the task until it's complete
    let task;
    do {
      // Wait for ten seconds before polling
      await new Promise(resolve => setTimeout(resolve, 10000));
  
      task = await runwayML.tasks.retrieve(taskId);
    } while (!['SUCCEEDED', 'FAILED'].includes(task.status));
  
    console.log('Task complete:', task.output[0]);
    return task.output[0]

}


const elevenLabsTextToAudio = async (req, res) => {

    if (req.body.prompt.length < 100) {
        throw new ApiError(400, "Prompt length must be at least 100 characters");
    }
    try {

        const elevenlabs = new ElevenLabsClient({
            apiKey: req.user.elevenLabsKey, // Defaults to process.env.ELEVENLABS_API_KEY
        });
        
        const voices = await elevenlabs.textToVoice.createPreviews({
            voice_description: "Generate audio in a polite man voice",
            text: req.body.prompt
        });

        const voicePreview1 = voices.previews[0].audio_base_64;
        const uniqueFileName = `voicePreview_${Date.now()}.mp3`;
        const filePath = path.join(__dirname, '..', 'public', 'audio', uniqueFileName);
        fs.writeFileSync(filePath, Buffer.from(voicePreview1, 'base64'));
        const audioLink = process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL_PRODUCTION}/public/audio/${uniqueFileName}` : `${process.env.BASE_URL_DEVELOPMENT}/public/audio/${uniqueFileName}`;

        return {
            base64Audio: voicePreview1,
            audioLink: audioLink
        }

    } catch (error) {
        console.log(error)
        throw new ApiError(400, error)

    }
}


module.exports = { 
    selectAIServiceProvider 
}
