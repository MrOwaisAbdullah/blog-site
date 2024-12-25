'use client';

import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';

interface Props {
  slug: string;
}

export const revalidate = 10;

const CommentsSection: React.FC<Props> = ({ slug }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetching comments on initial render
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/comments?slug=${slug}`);
        const data = await res.json();
        setComments(data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [slug]);

  // Adding new comment to the state
  const addComment = (newComment: BlogComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  // Time ago function 
  const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 61) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 61);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
  };
  

  return (
    <div className='border-t-2 pt-10 border-border'>
      <h3 className="text-xl text-heading font-bold mb-5 mx-10">Comments</h3>
      <div className='mx-10'><CommentForm slug={slug} onCommentAdded={addComment} /></div>
      {/* Loading comments */}
      {loading && <p className='mx-10'>Loading comments...</p>}

      {/* If no comments */}
      {!loading && comments.length === 0 && (
        <p className="mx-10 text-gray-500">No comments yet. Be the first to comment!</p>
      )}
      {/* Display comments */}
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="border-b border-zinc-700 py-5 mx-10">
            <p className="font-semibold text-heading capitalize">{comment.name} <span className="text-sm font-light text-gray-500 ml-2">
        {timeAgo(comment._createdAt)} </span></p>
            <p className='ml-3 my-2'>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
