import Link from 'next/link';
import Toggle from './Toggle';
import LoginButton from './LoginButton';

const linkClassName =
  'text-[24px] font-bold hover:bg-neutral-200 rounded-lg px-[10px] py-[5px] transform duration-300  whitespace-nowrap';

export default function Navbar() {
  return (
    <nav className='relative w-full h-[60px] flex justify-evenly items-center px-[20px] shadow-sm'>
      <div className='w-full flex justify-start'>
        <Link href='/' className={linkClassName}>
          LEVI
        </Link>
      </div>
      <div className='w-full md:flex justify-center items-center hidden md:left-[290px] lg:left-[600px]'>
        <Link href='/about' className={linkClassName}>
          About
        </Link>
        <Link href='/chatbot' className={linkClassName}>
          ChatBot
        </Link>
        <Link href='/ai-image' className={linkClassName}>
          AI Image
        </Link>
      </div>
      <LoginButton />
      <div className='absolute flex items-center md:hidden top-4 right-6'>
        <Toggle />
      </div>
    </nav>
  );
}
