import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://harfekuwait.com';

/**
 * Central business entity data — single source of truth.
 * Only includes verified information from the repository.
 */
const businessEntity = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'حرفي الكويت للألومنيوم',
  alternateName: 'HarfeKuwait',
  url: `${BASE_URL}/`,
  telephone: '+96555307742',
  email: 'info@harfekuwait.com',
  image: `${BASE_URL}/assets/background_1.png`,
  logo: `${BASE_URL}/favicon.jpg`,
  description: 'فني ألمنيوم متخصص في صيانة وتصليح مطابخ الألمنيوم في الكويت. نقدم خدمات فك وتركيب المطابخ، تصليح كبتات وأدراج ومفصلات المطبخ.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'الكويت',
    addressCountry: 'KW'
  },
  areaServed: {
    '@type': 'Country',
    name: 'الكويت'
  },
  sameAs: [
    'https://www.instagram.com/harfekuwait',
    'https://www.tiktok.com/@harfekuwait'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+96555307742',
    contactType: 'customer service',
    availableLanguage: ['ar', 'en']
  }
};

const websiteEntity = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: 'حرفي الكويت للألومنيوم',
  publisher: { '@id': `${BASE_URL}/#business` },
  inLanguage: 'ar'
};

/**
 * Generates the full JSON-LD graph for a page.
 */
export function generatePageSchema({ canonical, pageName, pageDescription, breadcrumbs, service, faqs }) {
  const fullUrl = encodeURI(`${BASE_URL}${canonical}`);
  const graph = [businessEntity, websiteEntity];

  // WebPage
  const webPage = {
    '@type': 'WebPage',
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: pageName,
    description: pageDescription,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#business` },
    inLanguage: 'ar'
  };

  if (service) {
    webPage.mainEntity = { '@id': `${fullUrl}#service` };
  }

  graph.push(webPage);

  // BreadcrumbList
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: encodeURI(`${BASE_URL}${crumb.url}`)
      }))
    });
  }

  // Service
  if (service) {
    graph.push({
      '@type': 'Service',
      '@id': `${fullUrl}#service`,
      name: service.name,
      description: service.description,
      url: fullUrl,
      provider: { '@id': `${BASE_URL}/#business` },
      areaServed: {
        '@type': 'Country',
        name: 'الكويت'
      },
      serviceType: service.serviceType || service.name
    });
  }

  // FAQPage
  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${fullUrl}#faq`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

/**
 * Component that injects JSON-LD structured data into the page head.
 */
export default function StructuredData({ data }) {
  if (!data) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}
