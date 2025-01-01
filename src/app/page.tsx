import LatestBlog from "@/components/ui/LatestBlog";
import { kumbhSans } from "./font";
import BlogSection from "@/components/sections/BlogSection";
import Hero from "@/components/sections/Hero";

export default async function Home() {

  return (
    <div className="max-w-[1600px] flex flex-col items-center min-h-screen mb-20">
      <Hero />
      <div className="border-b-4 px-5 sm:px-10 border-border my-6">
      <h2 className={`${kumbhSans.className} tracking-widest font-bold text-3xl xl:text-5xl 2xl:text-6xl text-heading text-center uppercase py-5 mt-5`}>Latest Blog</h2>
      <LatestBlog />
      </div>
      <h2 className={`${kumbhSans.className} tracking-widest font-bold text-3xl xl:text-5xl 2xl:text-6xl text-heading text-center uppercase py-5 my-5 mt-10`}>More Blogs</h2>
      <BlogSection />
    </div>
  );
}
