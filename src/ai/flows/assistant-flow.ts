'use server';
/**
 * @fileOverview AI Assistant flow powered by Groq.
 * Clean, concise, conversational responses formatted for mobile & desktop chatbots.
 */

import { groq } from '@/ai/groq';
import projectData from '@/lib/placeholder-images.json';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface AssistantInput {
  message: string;
  history?: ChatMessage[];
}

export interface AssistantOutput {
  reply: string;
}

function buildSystemPrompt(): string {
  const topProjects = projectData.placeholderImages
    .slice(0, 8)
    .map(
      (p) =>
        `- **${p.title}** (${p.category}): ${p.description}${
          p.liveLink ? ` | [Live Demo](${p.liveLink})` : ''
        }${p.githubLink ? ` | [GitHub](${p.githubLink})` : ''}`
    )
    .join('\n');

  return `You are "Rajeel AI", the friendly, intelligent assistant for Muhammad Rajeel Siddiqui's portfolio.

ABOUT RAJEEL:
- Name: Muhammad Rajeel Siddiqui
- Current Job: Full-Stack Developer at MN Enterprises (Next.js, Laravel Blade, MERN).
- Past Experience: Genentech Solutions (Django & Next.js), Hakam Techsoul (React).
- Core Skills: Next.js, React, Node.js, Express, Python (Django), MERN Stack, Docker, AWS, Agentic AI.
- Education: Aptech (Web Dev Diploma), PIAIC (Agentic AI - 4 quarters), Intermediate (ICS 1st year), Hafiz-e-Quran.
- Contact: Phone/WhatsApp: +92 330 0644215 / +92 371 8004041 | Email: rajeelsiddiqui3@gmail.com
- Links: [LinkedIn](https://www.linkedin.com/in/rajeel-siddiqui-60532529b/) | [GitHub](https://github.com/RajeelSiddiqui1/)

FEATURED PROJECTS:
${topProjects}

CRITICAL FORMATTING RULES:
1. NEVER use markdown tables (| Column | Column |). Tables look broken on mobile chat screens.
2. Keep responses brief, clean, and conversational (under 120 words).
3. Use bullet points for lists.
4. When sharing projects, highlight maximum 3-4 most relevant projects with clickable links [Project Name](url).
5. Never cut off sentences. Always complete your thought.
6. Match the language: If user writes in Roman Urdu or Urdu, reply warmly in Roman Urdu. If in English, reply in English.`;
}

export async function askAssistant(input: AssistantInput): Promise<AssistantOutput> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      reply:
        "Groq API Key is not configured yet. Please add GROQ_API_KEY in your .env file to enable instant AI responses!",
    };
  }

  const candidateModels = [
    'openai/gpt-oss-20b',
    'openai/gpt-oss-120b',
    'qwen/qwen3.6-27b',
  ];

  const systemPrompt = buildSystemPrompt();

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];

  if (input.history && input.history.length > 0) {
    for (const msg of input.history) {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      });
    }
  }

  messages.push({
    role: 'user',
    content: input.message,
  });

  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await groq.chat.completions.create({
        model,
        messages,
        temperature: 0.6,
        max_tokens: 1200,
      });

      let reply = response.choices[0]?.message?.content || '';
      // Remove any internal thinking tags
      reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

      if (reply) {
        return { reply };
      }
    } catch (error: any) {
      lastError = error;
      console.warn(`Groq model ${model} failed, trying fallback...`, error?.message);
    }
  }

  console.error('All Groq models failed:', lastError);
  return {
    reply: `Sorry, there was an issue processing your request. Please reach out to Rajeel directly via WhatsApp or Call at 03300644215!`,
  };
}
