import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://harfekuwait.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/background_1.png`;

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
      <meta property="og:site_name" content="حرفي الكويت للألومنيوم" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
