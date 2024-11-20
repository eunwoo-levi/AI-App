import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import React from 'react';

export default function RegisterPage() {
  return (
    <main className='w-full flex flex-col items-center pt-[10px] lg:pt-[40px]'>
      <div className='w-[480px] flex flex-col items-center border border-blue-500 p-[20px] rounded-xl shadow-md shadow-blue-300'>
        <h1 className='text-[40px] font-bold mb-[40px] text-blue-700'>Register</h1>
        <RegisterForm />
        <div className='flex gap-[10px] mt-[20px]'>
          <p>Already have an account?</p>
          <Link href='/login' className='text-blue-500 font-semibold underline'>
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
