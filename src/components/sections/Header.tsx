import Image from 'next/image'
import React from 'react'
import icon from '@/public/icon.png'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex bg-border border border-[#262626] px-5 md:px-12 justify-between items-center p-3 md:p-5">
        <Link href={"/"} ><Image className="w-1/2 sm:w-4/5" src={icon} alt="Blog Site"/></Link>
        <nav>
            <ul className="flex gap-3 md:gap-6 text-sm md:text-lg">
            <Link href={"/"}><li className='hover:bg-background border-border p-2 rounded hover:border-[#262626] border'>Home</li></Link>
            <Link href={"https://www.linkedin.com/in/mrowaisabdullah/"} target='_blank'><li className='hover:bg-background border-border p-2 rounded hover:border-[#262626] border'>Contact Me</li></Link>
            </ul>
        </nav>
    </header>
  )
}

export default Header