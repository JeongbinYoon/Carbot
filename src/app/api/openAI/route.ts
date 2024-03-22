import * as dotenv from 'dotenv';
import Configuration from 'openai';
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const config = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(config);

export async function POST(req: Request) {
  if (!config.apiKey) {
    NextResponse.json(
      {
        error: {
          message: 'OpenAI API key not configured',
        },
      },
      { status: 500 }
    );
    return;
  }
  const data = await req.json();
  const question = data.question || '';

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Please provide movement instructions in the format ['forward', 3000]`,
      },
      {
        role: 'user',
        content: question,
      },
    ],
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1,
  });

  return NextResponse.json(response.choices[0].message);
}

// import OpenAI from 'openai'
// import { OpenAIStream, StreamingTextResponse } from 'ai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

// export const runtime = 'edge'

// export async function POST(req: Request) {
//   const { messages } = await req.json()
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages,
//   })

//   const stream = OpenAIStream(response)

//   return new StreamingTextResponse(stream)
// }
