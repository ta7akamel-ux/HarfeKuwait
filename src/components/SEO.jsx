import { Helmet } from 'react-helmet-async';
import businessData, { BASE_URL } from '../businessData';

const DEFAULT_OG_IMAGE = businessData.ogImage;

export default function SEO({ title, description, canonical, ogImage, ogType = 'website', noindex = false }) {
  const url = `${BASE_URL}${canonical}`;
  const encodedUrl = encodeURI(url);
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={encodedUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={encodedUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ar_KW" />
      <meta property="og:site_name" content={businessData.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
