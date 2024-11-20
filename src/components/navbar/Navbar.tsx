import Link from 'next/link';
import LoginNav from './LoginNav';
import Toggle from './Toggle';

const linkClassName = 'text-[18px] font-bold hover:bg-neutral-200 rounded-lg px-[10px] py-[5px] transform duration-300';

export default function Navbar() {
  return (
    <nav className='relative w-full h-[60px] flex justify-between items-center px-[20px] shadow-sm'>
      <div>
        <Link href='/' className={linkClassName}>
          LEVI
        </Link>
      </div>
      <div className='hidden md:block absolute top-4 md:left-[290px] lg:left-[600px]'>
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

      <div className='absolute flex items-center md:hidden top-4 right-6'>
        <Toggle />
      </div>
    </nav>
  );
}
