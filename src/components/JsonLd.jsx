// Structured data for search engines (schema.org, as JSON-LD): what a page
// is, said in a form they read, beside what people read. `<` is escaped, so
// no text in it can close the script.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
