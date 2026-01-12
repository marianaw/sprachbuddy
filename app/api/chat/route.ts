import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { ChatRequest, UserSettings } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildSystemPrompt(settings: UserSettings, summaryMode: boolean = false): string {
  if (summaryMode) {
    return `You are DeutschBuddy, a German language learning assistant. Please provide a lesson summary with:
1. New vocabulary introduced (with English translations)
2. Mistakes the learner made (if any)
3. A suggested next activity to continue learning

Keep it concise and encouraging.`;
  }

  const cefrDescriptions = {
    A1: 'beginner (basic phrases and simple sentences)',
    A2: 'elementary (simple conversations on familiar topics)',
    B1: 'intermediate (clear standard speech on familiar matters)',
    B2: 'upper intermediate (complex texts and spontaneous conversation)',
    C1: 'advanced (complex topics with fluency)',
    C2: 'proficient (near-native fluency)',
  };

  const strictnessDescriptions = {
    lenient: 'Only correct major errors that impede understanding. Encourage and praise effort.',
    moderate: 'Correct noticeable errors but maintain a supportive tone. Balance corrections with encouragement.',
    strict: 'Correct all errors including minor grammatical and pronunciation issues. Provide detailed explanations.',
  };

  let prompt = `You are DeutschBuddy, a friendly and encouraging German language learning assistant.

User Profile:
- CEFR Level: ${settings.cefrLevel} (${cefrDescriptions[settings.cefrLevel]})
- Learning Goals: ${settings.goals || 'General German language improvement'}
- Correction Style: ${strictnessDescriptions[settings.strictness]}`;

  if (settings.correctMe) {
    prompt += '\n- IMPORTANT: When the user makes errors, correct them gently and explain why. Show the correct version.';
  } else {
    prompt += '\n- IMPORTANT: Do NOT correct errors unless they severely impede understanding. Focus on conversation flow.';
  }

  if (settings.germanOnly) {
    prompt += '\n- IMPORTANT: Respond ONLY in German. Do not use English except for brief translations in parentheses when introducing new words.';
  } else {
    prompt += '\n- You may mix German and English to help understanding. Use English for explanations when helpful.';
  }

  prompt += `

Teaching Approach:
- Adapt your language complexity to the user's CEFR level
- Be encouraging and supportive
- Use natural, conversational German
- Introduce new vocabulary gradually
- Provide context and examples
- Make learning fun and engaging

When introducing new words or phrases, briefly provide the English translation in parentheses.
Celebrate progress and effort!`;

  return prompt;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages, settings, summaryMode = false } = body;

    if (!process.env.OPENAI_API_KEY) {
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    const systemPrompt = buildSystemPrompt(settings, summaryMode);

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: openaiMessages,
      stream: true,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
