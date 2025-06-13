import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate text content based on category using Gemini.
 * @param {'coding' | 'humor' | 'motivational' | 'social'} category
 * @returns {Promise<string>} Generated content
 */
export async function generateCreativeContent(category = 'coding') {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });

  const prompts = {
    coding: "Give a coding insight or useful tip for developers in a short and engaging way. with hashtags in mern stack frontend or backend or full stack",
    humor: "Generate a short and funny programming joke or tech meme in one or two lines with hashtags.",
    motivational: "Write a short motivational message for tech professionals or learners with hashtags.",
    social: "Write a short text expressing concern or raising awareness about a current social issue in a thoughtful tone with hashtags ",
  };

  const prompt = prompts[category] || prompts.coding;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    console.log("Generated content:", text);
    return text;
  } catch (err) {
    console.error("Error generating content:", err);
    return "Something went wrong while generating content.";
  }
}

const text = await generateCreativeContent("humor");
console.log("Generated:", text);
