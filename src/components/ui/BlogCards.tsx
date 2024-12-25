import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

const BlogCards = ({ post }: { post: PostCard }) => {
  return (
    <div className="flex flex-col gap-4 p-2 hover:scale-105 duration-300 ease-in-out shadow-lg border border-border rounded-lg">
      <Image
        className="rounded-lg w-full"
        src={urlFor(post.mainImage).url() as string}
        alt={post.title}
        width={400}
        height={250}
      />
      <div className="flex flex-col gap-2 p-3">
        <h2 className="font-semibold text-sm xl:text-base 2xl:text-xl text-heading">
          {post.title}
        </h2>
        <p className="max-sm:text-xs text-sm xl:text-base 2xl:text-lg">
          {/* Mapping through the categories and joining them with a comma */}
          {post.categories.map((category) => category.title).join(", ")}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-5  mt-2 justify-between items-end">
          <div className="flex flex-wrap gap-6 sm:gap-10 max-sm:text-xs text-sm xl:text-base 2xl:text-lg sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="">Publication Date</p>
              <p className="text-heading">
                {/* Formatting the date */}
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Author</p>
              <p className="text-heading">{post.author.name}</p>
            </div>
          </div>
          {/* Dynamically adding the slug in Read More Button */}
          <Link href={`/blog/${post.slug.current}`}>
            <button className="group border-border border-2 rounded-lg py-2 px-4 flex gap-3 sm:mt-0 mt-2">
              Read More{" "}
              <ArrowRight className="text-primary group-hover:-rotate-45 duration-200 " />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
