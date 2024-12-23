import { client } from '@/sanity/lib/client';
import React from 'react'
import BlogCards from '../ui/BlogCards';

const BlogSection = async ({ limit }: BlogSectionProps) => {

      const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      mainImage,
      publishedAt,
      author->{name},
      categories[]->{title}
    }`
    
      const blogs = await client.fetch(query);

      const displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {
      displayedBlogs.map((blog:PostCard) => (
        <BlogCards key={blog.slug} post={blog} />
      ))
    }
  </div>
  )
}

export default BlogSection