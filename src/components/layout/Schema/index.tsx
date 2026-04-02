import Script from "next/script";

export default function Schema({ data }: { data: object }) {
  return (
    <Script
      id="schema-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// uso:

// <Schema
//   data={{
//     "@context": "https://schema.org",
//     "@type": "Service",
//     name: "Landing Pages",
//     provider: {
//       "@type": "Organization",
//       name: "Mavellium",
//     },
//   }}
// />
