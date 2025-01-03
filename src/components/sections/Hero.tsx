import { kumbhSans } from '@/app/font'
import Image from 'next/image'
import React from 'react'
import author from '@/public/authors.png'
import hero from '@/public/hero.png'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className='flex flex-col md:flex-row border-b-4 border-border'>
        <div className='flex flex-col p-5 md:p-14 mt-14 gap-2 md:gap-6'>
            <h2 className={`${kumbhSans.className} font-medium text-lg md:text-2xl`}>Your Journey to Tomorrow Begins Here</h2>
            <h1 className={`${kumbhSans.className} text-heading font-medium text-3xl md:text-6xl`}>Explore the Frontiers of Artificial Intelligence</h1>
            <p className='text-sm md:text-lg'>Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.</p>
        </div>
        <div className='relative flex bg-cover md:border-l-4 border-t-4 md:border-t-0 border-border bg-center'>
            <Image className='' src={hero} alt='Hero Abstract' width={500} height={500}></Image>
            <div className='flex flex-col absolute bottom-10 left-5 gap-3'>
                <Image src={author} alt={"Authors"} width={150} height={50}></Image>
                <h3>Explore 100+ resources</h3>
                <Link href={"#"}>
            <button className="group border-border border-2 rounded-lg py-2 px-4 flex gap-3 sm:mt-0 mt-2">
              Explore Resources
              <ArrowRight className="text-primary group-hover:-rotate-45 duration-200 " />
            </button>
          </Link>
            </div>
        </div>
    </section>
  )
}

export default Hero