'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const labelClassName = 'text-[18px] font-bold';
const inputClassName = 'w-[350px] py-[3px] pl-[10px] border rounded-sm';

export default function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      // 필드 유효성 검사
      if (!name) {
        throw new Error('Username is required.');
      }
      if (!email) {
        throw new Error('Email is required.');
      }
      if (!password) {
        throw new Error('Password is required.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const res = await axios.post('/api/register', { name, email, password });

      if (res.status === 201) {
        router.push('/login');
        alert('회원가입을 완료하였습니다.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-[20px]'>
      <div className='flex flex-col gap-[6px]'>
        <label htmlFor='name' className={labelClassName}>
          Username
        </label>
        <input name='name' id='name' type='text' placeholder='Enter your Username' className={inputClassName} />
      </div>
      <div className='flex flex-col gap-[6px]'>
        <label htmlFor='email' className={labelClassName}>
          Email
        </label>
        <input name='email' id='email' type='email' placeholder='Enter your Email' className={inputClassName} />
      </div>
      <div className='flex flex-col gap-[6px]'>
        <label htmlFor='password' className={labelClassName}>
          Password
        </label>
        <input
          name='password'
          id='password'
          type='password'
          placeholder='Enter your password'
          className={inputClassName}
        />
      </div>
      <div className='flex flex-col gap-[6px]'>
        <label htmlFor='confirmPassword' className={labelClassName}>
          Confirm Password
        </label>
        <input
          name='confirmPassword'
          id='confirmPassword'
          type='password'
          placeholder='Confirm your password'
          className={inputClassName}
        />
      </div>
      {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
      <button
        type='submit'
        className='w-[380px] font-bold bg-red-600 text-[20px] text-white p-[5px] rounded-3xl mt-[20px] hover:scale-110 hover:bg-red-700 duration-200'
      >
        Register
      </button>
    </form>
  );
}
