import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { z } from "zod";
import { commentSchema } from "@/app/schemas/commentSchema";
import DOMPurify from "isomorphic-dompurify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    // Fetching the post to get its ID based on the slug
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]`,
      { slug }
    );

    if (!post) {
      return NextResponse.json(
        { error: `Post not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    // Fetching all comments linked to the post
    const comments = await client.fetch(
      `*[_type == "comment" && post._ref == $postId] | order(_createdAt desc)`,
      { postId: post._id }
    );

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Error fetching comments' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate and sanitize the input using Zod
    const validatedData = commentSchema.parse({
      ...body,
      comment: DOMPurify.sanitize(body.comment),
    });

    // Ensure the post exists
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]`,
      { slug: validatedData.slug }
    );

    if (!post) {
      return NextResponse.json(
        { error: `Post not found for slug: ${validatedData.slug}` },
        { status: 404 }
      );
    }

    // Creating the comment
    const newComment = await client.create({
      _type: "comment",
      name: validatedData.name,
      email: validatedData.email,
      comment: validatedData.comment,
      post: { _type: "reference", _ref: post._id },
    });

    console.log('Comment created successfully:', newComment);

    return NextResponse.json({ message: 'Comment submitted', comment: newComment });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Error submitting comment' },
      { status: 500 }
    );
  }
}
