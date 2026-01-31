'use server';
/**
 * @fileOverview AI Assistant flow for Rajeel's portfolio.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssistantInputSchema = z.object({
  message: z.string().describe('The user message or question about Rajeel.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Chat history for context.'),
});

const AssistantOutputSchema = z.object({
  reply: z.string().describe('The AI response to the user.'),
});

export type AssistantInput = z.infer<typeof AssistantInputSchema>;
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

const assistantPrompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AssistantInputSchema },
  output: { schema: AssistantOutputSchema },
  prompt: `You are the AI Assistant for Muhammad Rajeel Siddiqui's professional portfolio. 
Your goal is to answer questions about Rajeel accurately and professionally, highlighting his strengths.

Rajeel's Profile:
- Name: Muhammad Rajeel Siddiqui
- Current Role: Full-Stack Developer at MHN Enterprises.
- Expertise: React.js, Next.js, Django, MERN Stack, and Laravel.
- Skills: 
    - Frontend: HTML, CSS, JS, React, Bootstrap, Shadcn UI, Aceternity.
    - Backend: Node.js, Python (Django), C#, Laravel.
    - Databases: MySQL, MongoDB.
    - DevOps: Docker, VPS, AWS.
- Experience:
    - MHN Enterprises (Jan 2025 - Present): Full Stack Developer.
    - Genentech Solutions (Oct - Dec 2024): Full-Stack Developer (Django/Next.js).
    - Hakam Techsoul (Aug - Sep 2024): React Developer.
- Education: 
    - Diploma in Web Development (Aptech).
    - Agentic AI Course (PIAIC) - Currently in 2nd quarter of a 6-quarter program.
    - ICS (Inter) in Computer Science.
    - Hifz-ul-Quran (2021).
- Achievement: Winner of an HTML/CSS Hackathon.

Guidelines:
- Be friendly, concise, and professional.
- If asked about something not in his profile, politely state you don't have that specific information but highlight his general adaptability.
- Encourage users to download his CV or contact him via the links on the page.

Chat History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User: {{{message}}}`,
});

export async function askAssistant(input: AssistantInput): Promise<AssistantOutput> {
  const { output } = await assistantPrompt(input);
  if (!output) throw new Error('Failed to generate response');
  return output;
}
