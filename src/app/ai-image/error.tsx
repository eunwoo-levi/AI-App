'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>오류가 발생했습니다</h2>
        <p className='text-gray-600 mb-4'>{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
        <button onClick={reset} className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
          다시 시도
        </button>
      </div>
    </div>
  );
}
