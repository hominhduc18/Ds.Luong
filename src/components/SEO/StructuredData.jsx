import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/siteConfig';

const StructuredData = ({ data, type = 'Organization' }) => {
  // Base Schema for Organization
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl,
    "logo": `${siteConfig.siteUrl}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.business.phone,
      "contactType": "customer service"
    },
    "sameAs": [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube
    ]
  };

  // Base Schema for Person (E-E-A-T)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.author.name,
    "jobTitle": siteConfig.author.role,
    "description": siteConfig.author.description,
    "url": `${siteConfig.siteUrl}/about`,
    "sameAs": [siteConfig.social.facebook]
  };

  const getSchema = () => {
    switch(type) {
      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "image": data.image,
          "description": data.description,
          "brand": {
            "@type": "Brand",
            "name": data.brand
          },
          "offers": {
            "@type": "Offer",
            "url": `${siteConfig.siteUrl}/san-pham/${data.slug}`,
            "priceCurrency": "VND",
            "price": data.price,
            "availability": data.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        };
      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "image": data.image,
          "datePublished": data.date,
          "author": {
            "@type": "Person",
            "name": siteConfig.author.name
          },
          "publisher": {
            "@type": "Organization",
            "name": siteConfig.siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${siteConfig.siteUrl}/logo.png`
            }
          }
        };
      case 'FAQ':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };
      case 'Person':
        return personSchema;
      default:
        return orgSchema;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
