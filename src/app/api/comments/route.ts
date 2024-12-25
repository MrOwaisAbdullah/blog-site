import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

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
    console.log('Received payload:', body);

    const { name, email, comment, slug } = body;

    // Fetching the post to ensure the slug exists
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]`,
      { slug }
    );

    if (!post) {
      console.error(`No post found for slug: ${slug}`);
      return NextResponse.json(
        { error: `Post not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    // Creating the comment
    const newComment = await client.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: post._id,
      },
    });

    console.log('Comment created successfully:', newComment);

    return NextResponse.json({ message: 'Comment submitted', comment: newComment });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Error submitting comment' },
      { status: 500 }
    );
  }
}
