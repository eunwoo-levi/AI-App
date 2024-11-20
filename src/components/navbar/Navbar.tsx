import Link from 'next/link';
import LoginNav from './LoginNav';

const linkClassName = 'text-[18px] font-bold hover:bg-neutral-300 rounded-lg p-[8px]';

export default function Navbar() {
  return (
    <nav className='relative w-full h-[60px] flex justify-between items-center px-[20px] shadow-sm'>
      <div>
        <Link href='/' className={linkClassName}>
          LEVI
        </Link>
      </div>
      <div className='absolute top-4 lg:left-[610px]'>
        <Link href='/about' className={linkClassName}>
          About
        </Link>
        <Link href='/chatbot' className={linkClassName}>
          ChatBot
        </Link>
      </div>
      <LoginNav />
    </nav>
  );
}
