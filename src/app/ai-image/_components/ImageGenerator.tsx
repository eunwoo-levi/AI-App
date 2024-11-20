'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('프롬프트를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Sending request with prompt:', prompt);

      const response = await axios.post(
        '/api/ai-image',
        { prompt },
        {
          timeout: 120000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response received');

      if (response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
        setError(null);
      } else {
        throw new Error('이미지 URL을 받지 못했습니다.');
      }
    } catch (error) {
      console.error('Error occurred:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 503) {
          setError('AI 모델이 준비중입니다. 잠시 후 다시 시도해주세요. (약 1-2분 소요)');
        } else {
          setError(error.response?.data?.error || '이미지 생성에 실패했습니다.');
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <form onSubmit={generateImage} className='space-y-4'>
        <div>
          <label htmlFor='prompt' className='block text-sm font-medium text-gray-700 mb-2'>
            이미지 설명 (영어로 입력)
          </label>
          <input
            id='prompt'
            type='text'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Enter your image description in English...'
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            disabled={loading}
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading || !prompt.trim()}
          className={`w-full rounded-md px-4 py-2 text-white transition-colors 
            ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
        >
          {loading ? (
            <span className='flex items-center justify-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              생성 중...
            </span>
          ) : (
            '이미지 생성'
          )}
        </button>
      </form>

      {error && <div className='mt-4 p-3 bg-red-50 text-red-600 rounded-md'>{error}</div>}

      {imageUrl && (
        <div className='mt-8'>
          <img src={imageUrl} alt='Generated' className='w-full rounded-lg shadow-lg' />
        </div>
      )}
    </div>
  );
}
