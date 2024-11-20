'use client';

import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import SignOutButton from '../auth/SignOutButton';
import Image from 'next/image';

const linkClassName =
  'w-full text-center font-bold hover:bg-neutral-200 rounded-lg px-[10px] py-[10px] transform duration-300';

export default function Toggle() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative flex items-center'>
      {session && (
        <div className='text-[16px] font-semibold mr-[20px] '>
          <h1>{session.user?.name} 님</h1>
          {session.user?.image && (
            <Image
              src={session.user?.image || ''}
              alt='profile-image'
              width={33}
              height={33}
              className='rounded-full'
            />
          )}
        </div>
      )}
      <button onClick={handleToggle} className=''>
        <Menu size={30} />
      </button>
      <section
        className={`
          absolute 
          flex flex-col 
          items-center 
          justify-center 
          w-[120px]
          top-10 
          right-1 
          gap-2 
          shadow-lg 
          p-2 
          rounded-lg
          bg-white
          transform
          transition-all
          duration-300
          ease-in
           ${isOpen ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <Link href='/about' className={linkClassName}>
          About
        </Link>
        <Link href='/chatbot' className={linkClassName}>
          ChatBot
        </Link>
        <Link href='/ai-image' className={linkClassName}>
          AI Image
        </Link>
        {session ? (
          <SignOutButton />
        ) : (
          <Link
            href='/login'
            className='w-[100px] font-bold bg-red-600 text-white p-[10px] rounded-3xl hover:bg-red-700 duration-200 text-center'
          >
            LOGIN
          </Link>
        )}
      </section>
    </div>
  );
}
