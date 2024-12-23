import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

export const CustomComponent: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-heading">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-3 text-heading">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-2 text-heading">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-medium mt-6 mb-1 text-heading">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-base leading-7 mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc text-base ml-6 mb-10">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal text-base ml-6 mb-10">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    bold: ({ children }) => <strong className="font-semibold text-text2">{children}</strong>,
    italic: ({ children }) => <em className="italic text-text2">{children}</em>,
    underline: ({ children }) => <span className="underline text-text2">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text2 underline hover:text-primary"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-sm p-1 rounded-md text-gray-200 font-mono">{children}</code>
    ),
  },
  types: {
    image: ({ value }) => (
      <Image
        src={value.asset?.url}
        alt={value.alt || 'Image'}
        className="w-full rounded-lg my-4"
      />
    ),
  },
};
