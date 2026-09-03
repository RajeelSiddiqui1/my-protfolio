import Groq from "groq-sdk";

// Initialize Groq client with API key from environment
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});
