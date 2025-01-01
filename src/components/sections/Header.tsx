import Image from 'next/image'
import React from 'react'
import icon from '@/public/icon.png'
import Link from 'next/link'

const Header = () => {
  return (
    <header >
      <div></div>
        <div className="flex bg-background2 border border-border px-5 md:px-12 justify-between items-center p-3 md:p-5">
        <Link href={"/"} ><Image className="w-11/12" src={icon} alt="Blog Site"/></Link>
        <nav>
            <ul className="flex gap-3 md:gap-6 text-sm md:text-lg">
            <Link href={"/"}><li className='hover:bg-background border-background2 p-2 rounded hover:border-border border'>Home</li></Link>
            <Link href={"https://www.linkedin.com/in/mrowaisabdullah/"} target='_blank'><li className='hover:bg-background border-background2 p-2 rounded hover:border-border border'>About Me</li></Link>
            </ul>
        </nav>
        <Link href={"https://www.linkedin.com/in/mrowaisabdullah/"} target='_blank'>
        <button className='bg-primary hover:bg-background2 hover:border-2 border-border hover:text-primary font-medium text-background px-3 py-2 rounded'>Contact Me</button>
        </Link>
        </div>
    </header>
  )
}

export default Header