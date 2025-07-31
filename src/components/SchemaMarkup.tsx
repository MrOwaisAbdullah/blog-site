'use client'
import Script from 'next/script'
import { buildSchemas } from '@/lib/schemaBuilder'

function SchemaMarkup({ post }: { post: PostCard }) {
  const schemas = buildSchemas(post)
  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas),
      }}
    />
  )
}

export default SchemaMarkup