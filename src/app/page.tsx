import LatestBlog from "@/components/ui/LatestBlog";
import { kumbhSans } from "./font";
import BlogSection from "@/components/sections/BlogSection";

export default async function Home() {

  return (
    <div className="max-w-[1600px] flex flex-col items-center min-h-screen px-5 sm:px-10 mb-20">
      <div className="border-b-4 border-border mb-5">
      <h2 className={`${kumbhSans.className} tracking-widest font-bold text-3xl xl:text-4xl 2xl:text-5xl text-heading text-center uppercase py-5 mt-5`}>Latest Blog</h2>
      <LatestBlog />
      </div>
      <h2 className={`${kumbhSans.className} tracking-widest font-bold text-3xl xl:text-4xl 2xl:text-5xl text-heading text-center uppercase py-5 mt-5`}>More Blogs</h2>
      <BlogSection />
    </div>
  );
}
