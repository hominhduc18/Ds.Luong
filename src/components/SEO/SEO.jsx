import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/siteConfig';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  canonical,
  keywords
}) => {
  const seoTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.brandName;
  const seoDesc = description || siteConfig.defaultDescription;
  const seoImage = image || siteConfig.defaultImage;
  const seoUrl = url ? `${siteConfig.siteUrl}${url}` : siteConfig.siteUrl;
  const seoCanonical = canonical || seoUrl;
  const seoKeywords = keywords || siteConfig.defaultKeywords;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoCanonical} />
      <meta name="google-site-verification" content="hAPjrgcNLwMuNkV98cQhhzjjNk-29y_LFjMPOhDWrQg" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDesc} />
      <meta property="twitter:image" content={seoImage} />

    </Helmet>
  );
};

export default SEO;
