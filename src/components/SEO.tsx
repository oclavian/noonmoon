import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaMarkup?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'বাংলা সফটওয়্যার, নুন-মুন, Noon-Moon, বাংলা কনভার্টার, বাংলা বয়স ক্যালকুলেটর, Avro to Bijoy, Unicode to Bijoy, বাংলা টাইপিং, Bangla tools, Bengali calendar, Bangla templates',
  canonicalUrl = 'https://noon-moon.tools',
  ogImage = 'https://noon-moon.tools/og-image.png',
  schemaMarkup
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Schema.org Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}
    </Helmet>
  );
};
