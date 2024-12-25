import { defineField } from "sanity";

export const comments = {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule) => Rule.required().email(),
      }),
      defineField({
        name: 'comment',
        title: 'Comment',
        type: 'text',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{ type: 'post' }],
      }),
    ],
  };
  