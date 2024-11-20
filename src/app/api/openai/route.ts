import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, StreamData } from 'ai';
import { Message } from 'ai/react';

// Constants and types
const CODE_PATTERNS = {
  BLOCK: /```[\s\S]*?```/g,
  INLINE: /`[^`]+`/g,
} as const;

interface LanguageHint {
  [key: string]: string;
}

const LANGUAGE_HINTS: LanguageHint = {
  'import': 'python',
  'function': 'javascript',
  'def': 'python',
  'const': 'javascript',
  'let': 'javascript',
  'var': 'javascript',
  'public class': 'java',
  'interface': 'typescript',
  'type': 'typescript',
  'package': 'go',
  '#include': 'c/c++',
  'using namespace': 'c++',
};

const SYSTEM_PROMPT = {
  role: "system",
  content: `당신은 전문적인 코드 리뷰어입니다. 다음 규칙을 따르세요:
1. 코드가 발견되면 다음 항목들을 체계적으로 분석하세요:
   - 버그와 오류 검사
   - 성능 개선 가능성
   - 코드 스타일 및 가독성
   - 보안 취약점
   - 베스트 프랙티스 준수 여부
2. 발견된 문제점에 대해 다음 형식으로 답변하세요:
   🔍 발견된 문제:
   ✨ 개선된 코드:
   💡 설명:
3. 코드가 없는 메시지에는 "코드를 공유해 주시면 분석해드리겠습니다."라고 답변하세요.`
} as const;

// Helper functions
function containsCode(message: string): boolean {
  return CODE_PATTERNS.BLOCK.test(message) || CODE_PATTERNS.INLINE.test(message);
}

function extractCodeFromMessage(message: string): string {
  const matches = message.match(CODE_PATTERNS.BLOCK);
  if (!matches) return message;
  
  // Remove markdown code block syntax and return the actual code
  return matches[0].replace(/```[\w]*\n?/, '').replace(/```$/, '').trim();
}

function detectLanguage(code: string): string {
  // Reset regex lastIndex to ensure consistent behavior
  CODE_PATTERNS.BLOCK.lastIndex = 0;
  CODE_PATTERNS.INLINE.lastIndex = 0;

  const cleanCode = extractCodeFromMessage(code);
  
  for (const [keyword, language] of Object.entries(LANGUAGE_HINTS)) {
    if (cleanCode.includes(keyword)) {
      return language;
    }
  }
  return 'unknown';
}

// API Handler
export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const data = new StreamData();
  
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { messages } = await req.json() as { messages: Message[] };
    const userMessage = messages[messages.length - 1];

    if (userMessage.role !== 'user' || !containsCode(userMessage.content)) {
      return new Response(
        JSON.stringify({ 
          message: "코드를 공유해 주시면 분석해드리겠습니다. 코드는 백틱(```)으로 감싸서 공유해 주세요." 
        }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const language = detectLanguage(userMessage.content);
    
    const enhancedSystemPrompt = {
      ...SYSTEM_PROMPT,
      content: `${SYSTEM_PROMPT.content}
감지된 프로그래밍 언어: ${language}
이 언어의 베스트 프랙티스와 컨벤션을 기준으로 분석해 주세요.`
    };
    
    const enhancedMessages = [
      enhancedSystemPrompt,
      ...convertToCoreMessages(messages)
    ];
    
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: enhancedMessages,
      temperature: 0.1,
      onFinish() {
        data.close();
      },
    });
    
    return result.toDataStreamResponse({ 
      data,
      headers: {
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    console.error('Error in OpenAI route:', error);
    data.close();
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        helpMessage: "코드 분석 중 오류가 발생했습니다. 코드가 올바른 형식으로 공유되었는지 확인해 주세요." 
      }), 
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}