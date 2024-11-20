import Link from 'next/link';
import ImageGenerator from './_components/ImageGenerator';

export default function AIImagePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <nav className='mb-8'>
          <Link href='/' className='text-blue-600 hover:text-blue-800 flex items-center gap-2'>
            ← 메인으로 돌아가기
          </Link>
        </nav>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-3xl font-bold text-center mb-2'>AI 이미지 생성기</h1>
          <p className='text-gray-600 text-center mb-8'>
            원하는 이미지를 설명해주세요. AI가 당신의 상상을 현실로 만들어드립니다.
          </p>

          <ImageGenerator />
        </div>
      </div>
    </div>
  );
}
