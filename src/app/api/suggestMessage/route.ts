import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by ' I '. 
These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. 
Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. 
Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.
For example, your output should be structured like this: 
'What's a hobby you've recently started? I If you could have dinner with any historical figure, who would it be? I What's a simple thing that makes you happy?'`;

export async function POST() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedQuestions = response.text();

    return new Response(
      JSON.stringify({ role: 'ai', content: generatedQuestions }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate AI response' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
