import {
    GoogleGenerativeAI,
} from "@google/generative-ai";
  
const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt, history=[]){
    const chat = model.startChat({generationConfig, history});
    const result = await chat.sendMessageStream(prompt); 
    return result.stream;
}

export default run;
  