import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, StreamData } from 'ai';
import { Message } from 'ai/react';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const data = new StreamData();
  
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const { messages } = await req.json() as { messages: Message[] };
    
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: convertToCoreMessages(messages),
      temperature: 0.9,
      onFinish() {
        data.close();
      },
    });
    
    return result.toDataStreamResponse({ data });

  } catch (error) {
    console.error('Error in OpenAI route:', error);
    data.close();
    
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}