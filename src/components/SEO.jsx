export default function SEO({ title, description, canonical }) {
  const url = `https://harfekuwait.com${canonical}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={encodeURI(url)} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={encodeURI(url)} />
    </>
  );
}
