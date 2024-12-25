'use client';

import React, { useState } from 'react';

interface Props {
  slug: string;
  // Callback function to update parent state with new comment
  onCommentAdded: (newComment: BlogComment) => void; 
}

// CommentForm component
const CommentForm: React.FC<Props> = ({ slug, onCommentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Combining form data with slug
    const payload = { ...formData, slug }; 
  
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        // Printing error details from the server
        const errorData = await res.json(); 
        console.error('Error response from API:', errorData);
        throw new Error('Failed to submit comment');
      }
  
      const data = await res.json();
      // Printing the success response
      console.log('Comment submitted successfully:', data); 
      // Updating comments in the parent component
      onCommentAdded(data.comment); 
      // Resetting the the form after submitting the comment
      setFormData({ name: '', email: '', comment: '' }); 
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Error submitting comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 mb-10 gap-3">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="w-full rounded my-input bg-background border-border shadow-inner shadow-zinc-800 border-2 p-2 focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your email address"
        className="w-full rounded my-input bg-background border-border shadow-inner shadow-zinc-800 border-2 p-2 focus:ring-2 focus:ring-primary"
        required
      />
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Share your thoughts or ask a question..."
        className="w-full rounded my-input col-span-2 bg-background border-border shadow-inner placeholder: shadow-zinc-800 border-2 p-2 focus:ring-2 focus:ring-primary"
        rows={4}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="text-primary font-medium uppercase tracking-widest hover:text-white bg-background border-border border-2 ease-in-out duration-200 hover:bg-primary rounded-lg hover:shadow-none shadow-white/5 shadow-md col-span-2 px-4 py-2" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default CommentForm;
