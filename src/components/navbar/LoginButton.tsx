'use client';
import { useSession } from 'next-auth/react';
import SignOutButton from '../auth/SignOutButton';
import Link from 'next/link';

export default function LoginButton() {
  const { data: session } = useSession();
  return (
    <div className='justify-end w-full hidden md:flex'>
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
    </div>
  );
}
