import { client } from '@/sanity/lib/client';
import React from 'react'
import BlogCards from '../ui/BlogCards';

const BlogSection = async ({ limit, excludeLatest }: BlogSectionProps) => {
    // Query to fetch posts for BlogSection
      const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      mainImage,
      publishedAt,
      author->{name},
      categories[]->{title}
    }`
    
      const blogs = await client.fetch(query);

      let displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

        // Exclude the latest post if required
  if (excludeLatest) {
    displayedBlogs = displayedBlogs.slice(1);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-5 sm:px-10 gap-6">
    {/* Displaying the blog cards */}
    {
      displayedBlogs.map((blog:PostCard, index:number) => (
        <BlogCards key={index} post={blog} />
      ))
    }
  </div>
  )
}

export default BlogSection