
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume API_KEY is present.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getMarketPrediction = async (marketName: string, marketDescription: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI features are currently unavailable. Please check API key configuration.");
  }
  
  try {
    const prompt = `
      You are a crypto market analyst specializing in prediction markets.
      Analyze the following Polymarket market and provide a concise prediction.
      
      Market: "${marketName}"
      Description: "${marketDescription}"

      Provide your analysis in three short paragraphs:
      1.  **Bull Case:** What factors support a "Yes" outcome?
      2.  **Bear Case:** What factors support a "No" outcome?
      3.  **Conclusion:** Based on the evidence, what is the most likely outcome and why?

      Be objective and base your analysis on general market knowledge. Do not give financial advice.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching prediction from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while fetching the AI prediction: ${error.message}`;
    }
    return "An unknown error occurred while fetching the AI prediction.";
  }
};
