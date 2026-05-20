
import axios from 'axios'

const geminiResponse = async (command,assistantName,userName) => {
    
  try {

    const apiKey = process.env.GEMINI_API_KEY;
   const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.

You are not Google. You will now behave like a smart voice-enabled assistant similar to Siri, Google Assistant, or Jarvis.

Your task is to understand the user's natural language input and respond ONLY in valid JSON format like this:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",

  "userInput": "<original user input>",{}

  "response": "<short spoken response for the user>"
}
  now your userInput- ${command}
  Important:
  - only response with the JSON object,nothing else
- Do not return markdown or extra text.
- Remove the assistant name from userInput if it exists.
- If the user wants to search something on Google or YouTube, userInput should contain ONLY the search query.
- Keep the response short and natural like a real voice assistant.
- Detect the correct type based on the user's intent.

Examples:

User: "Open YouTube"
Response:
{
  "type": "youtube_search",
  "userInput": "",
  "response": "Opening YouTube"
}

User: "Search cats videos on YouTube"
Response:
{
  "type": "youtube_search",
  "userInput": "cats videos",
  "response": "Searching cats videos on YouTube"
}


User: "Open Instagram"
Response:
{
  "type": "instagram_open",
  "userInput": "",
  "response": "Opening Instagram"
}
`;
     
   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const result = await axios.post(apiUrl, {
     "contents": [{
          "parts": [{"text": prompt} ]
         }
      ]
    });

    return result.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

  }

}

export default geminiResponse;