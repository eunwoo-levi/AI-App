import { auth } from '@/auth';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <main className='w-full min-h-screen flex justify-center '>
        <h1>세션없음</h1>
      </main>
    );
  }

  return (
    <main className='w-full min-h-screen flex justify-center '>
      <h1>
        세션 결과!!
        <section>
          <div>아이디: {session.user?.id}</div>
          <div>이메일: {session.user?.email}</div>
          <div>이름: {session.user?.name}</div>
          <div>
            이미지:{' '}
            {session.user?.image ? (
              <Image
                width={200}
                height={200}
                src={session.user.image} // 이미지가 있을 때만 렌더링
                alt='avatar'
              />
            ) : (
              <span>이미지 없음</span> // 이미지가 없을 때 표시할 텍스트 또는 대체 이미지
            )}
          </div>
        </section>
      </h1>
    </main>
  );
}
