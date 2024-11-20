// app/api/ai-image/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

const MODEL_ID = "stabilityai/stable-diffusion-xl-base-1.0";
const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await axios({
      method: 'post',
      url: API_URL,
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: prompt,
        parameters: {
          guidance_scale: 7.5,          // 이미지의 프롬프트 일치도 (높을수록 더 정확)
          num_inference_steps: 50,      // 생성 단계 (높을수록 더 섬세)
          negative_prompt: "blurry, bad quality, ugly, distorted",  // 제외할 특성
        },
        options: {
          wait_for_model: true,
          use_cache: false,
        }
      },
      responseType: 'arraybuffer',
      timeout: 120000  // 2분 타임아웃
    });

    // 응답이 JSON인 경우 (에러)
    const contentType = response.headers['content-type'];
    if (contentType?.includes('application/json')) {
      const jsonResponse = JSON.parse(
        Buffer.from(response.data).toString('utf8')
      );
      return NextResponse.json(
        { error: jsonResponse.error || 'Failed to generate image' },
        { status: 400 }
      );
    }

    // 이미지 응답 처리
    const base64 = Buffer.from(response.data).toString('base64');
    return NextResponse.json({
      imageUrl: `data:image/jpeg;base64,${base64}`
    });

  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error)) {
      // API 에러 응답이 있는 경우
      if (error.response?.data) {
        try {
          const errorMessage = Buffer.from(error.response.data).toString('utf8');
          const errorJson = JSON.parse(errorMessage);
          
          // 모델 로딩 중인 경우
          if (errorJson.error?.includes('loading')) {
            return NextResponse.json(
              { error: '모델을 준비중입니다. 잠시 후 다시 시도해주세요. (1-2분 소요)' },
              { status: 503 }
            );
          }
          
          return NextResponse.json(
            { error: errorJson.error || '이미지 생성 실패' },
            { status: error.response.status }
          );
        } catch (error) {
          return NextResponse.json(
            { error: '이미지 생성 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    }
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}