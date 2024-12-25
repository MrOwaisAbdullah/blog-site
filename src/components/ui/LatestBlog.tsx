import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

const LatestBlog = async () => {

    const query = `*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        summary,
        mainImage,
        publishedAt,
        author->{name},
        categories[]->{title}
      }[0]`;
      
        const blogs: PostCard = await client.fetch(query);

  return (
    <div className='flex flex-col justify-center lg:flex-row gap-12 mx-auto px-2 py-16 '>
        <Image className='w-full lg:w-2/5  rounded-lg hover:scale-105 duration-300 ease-in-out' src={urlFor(blogs.mainImage).url()} alt={blogs.title} width={400} height={250}/>
        <div className='w-full lg:w-3/5 flex flex-col gap-4 pt-5'>
            <h2 className='font-semibold text-xl xl:text-2xl 2xl:text-3xl text-heading'>{blogs.title}</h2>
            <p className='xl:text-lg 2xl:text-xl'>{blogs.summary}</p>
            <div className='flex flex-wrap sm:flex-nowrap gap-4 sm:gap-10 max-sm:text-xs text-sm xl:text-base 2xl:text-lg'>
                <div className='flex flex-col gap-1 mt-2'>
                    <p className=''>Publication Date</p>
                    <p className='text-heading'>{new Date(blogs.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}</p>
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <p className=''>Author</p>
                    <p className='text-heading'>{blogs.author.name}</p>
                </div>
            </div>
            <div className='flex mt-3 justify-center md:justify-start'>
                <Link href={`/blog/${blogs.slug.current}`}><button className='group border-border border-2 rounded-lg py-2 px-4 flex gap-3'>Read More <ArrowRight className='text-primary group-hover:-rotate-45 duration-200 '/></button></Link>
            </div>
        </div>
    </div>
  )
}

export default LatestBlog