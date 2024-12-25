import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { CustomComponent } from "@/components/CustomComponent";
import CommentsSection from "@/components/CommentsSection";

async function Page({ params: { slug } }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == "${slug}"]{
  title,
  mainImage,
  summary,
  content,
  publishedAt,
  author->{name},
  categories[]->{title}
}[0]`;

  const blog: PostCard = await client.fetch(query);

  return (
    <article className="flex flex-col min-h-screen mb-20 ">
      <div className="relative border-b-4 border-border ">
        <Image
          className="flex h-[400px] 2xl:h-[700px] w-screen object-cover items-center justify-center"
          src={urlFor(blog.mainImage).url() as string}
          alt={blog.title}
          width={1000}
          height={600}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 from-15% via-black/50 to-transparent">
          <h1
            className={`absolute bottom-10 left-0 right-0 mx-auto w-fit text-3xl lg:text-5xl 2xl:text-6xl font-bold text-center text-white`}
          >
            {blog.title}
          </h1>
        </div>
      </div>
      {/* Blog Section */}
      <div className="flex flex-col lg:flex-row-reverse">
        {/* Blog Sidebar */}
        <div className="flex flex-col lg:w-1/3 items-center border-l-4 border-border py-14 sticky right-0">
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 lg:gap-y-8 gap-x-20 mx-auto">
            <div className="flex flex-col border-border">
              <h1 className="text-sm xl:text-base 2xl:text-lg mb-1">
                Published Date
              </h1>
              <p className="text-sm xl:text-base 2xl:text-lg font-medium text-heading">
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm xl:text-base 2xl:text-lg mb-1">Author</h1>
              <p className="text-sm xl:text-base 2xl:text-lg font-medium text-heading">
                {blog.author.name}
              </p>
            </div>
          </div>
        </div>
        {/* Blog Content */}
        <div className="flex flex-col lg:w-4/6 py-8 md:py-14 border-t-4 lg:border-t-0 border-border pb-14">
          <h1 className="xl:text-lg 2xl:text-xl text-heading mb-3 px-5 md:px-12 font-medium">
            Summary
          </h1>
          <p className="text-sm xl:text-base 2xl:text-lg border-b-4 border-border px-5 md:px-12 pb-14">
            {blog.summary}
          </p>
          <section className="text-sm xl:text-base 2xl:text-lg px-5 py-10 md:px-12">
            <PortableText value={blog.content} components={CustomComponent} />
          </section>
          {/* Comments Section */}
          <CommentsSection slug={slug} />
        </div>
      </div>
    </article>
  );
}

export default Page;
