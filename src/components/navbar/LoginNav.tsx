'use client';

import React from 'react';
import SignOutButton from '../auth/SignOutButton';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function LoginNav() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div className='flex items-center'>
          <span className='text-[16px] font-semibold mr-[20px] flex items-center gap-2'>
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
          </span>
          <SignOutButton />
        </div>
      ) : (
        <Link
          href='/login'
          className='w-[100px] font-bold bg-red-600 text-white p-[10px] rounded-3xl hover:bg-red-700 duration-200'
        >
          LOGIN
        </Link>
      )}
    </div>
  );
}
