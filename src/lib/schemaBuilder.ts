// lib/schemaBuilder.ts

export function buildSchemas(post: PostCard) {
  const {
    title,
    slug,
    summary,
    mainImage,
    author,
    publishedAt,
    _updatedAt,
    faqs = [],
  } = post

  const baseUrl = 'https://blog-site-green-one.vercel.app/' // ✅ Change to your actual domain
  const canonical = `${baseUrl}/blog/${slug}`

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    headline: title,
    description: summary,
    mainImage,
    author: { '@type': 'Person', name: author?.name || 'Editorial Team' },
    publisher: {
      '@type': 'Organization',
      name: 'Your Brand Name',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`, // Replace with your logo
      },
    },
    datePublished: publishedAt,
    dateModified: _updatedAt ?? publishedAt,
  }

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq: { question: string; answer: string }) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return faqSchema ? [blogSchema, faqSchema] : blogSchema
}