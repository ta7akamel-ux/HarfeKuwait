/**
 * businessData.js — Single source of truth for all HarfeKuwait business information.
 * 
 * RULES:
 * - Only include VERIFIED information from the repository.
 * - Do NOT invent data.
 * - All components should import from here instead of hard-coding values.
 * - If a value cannot be verified, set it to null.
 */

const BASE_URL = 'https://harfekuwait.com';

const businessData = {
  // === IDENTITY ===
  name: 'حرفي الكويت',
  nameEn: 'HarfeKuwait',
  url: BASE_URL,
  
  // === CONTACT ===
  phone: '+96555307742',
  phoneDisplay: '55307742',
  whatsapp: 'https://wa.me/96555307742',
  email: 'info@harfekuwait.com',

  // === SOCIAL ===
  instagram: 'https://www.instagram.com/harfekuwait',
  tiktok: 'https://www.tiktok.com/@harfekuwait',

  // === MEDIA ===
  logo: `${BASE_URL}/favicon.jpg`,
  ogImage: `${BASE_URL}/assets/background_1.png`,

  // === LOCATION ===
  country: 'الكويت',
  countryCode: 'KW',
  
  /**
   * Verified service areas (governorates).
   * These appear consistently across all service pages and FAQ answers in the repository.
   */
  serviceAreas: [
    'العاصمة',
    'حولي',
    'الفروانية',
    'الأحمدي',
    'الجهراء',
    'مبارك الكبير'
  ],

  // === SERVICES ===
  services: [
    {
      name: 'صيانة مطابخ الألمنيوم',
      slug: '/صيانة-مطابخ-المنيوم/',
      shortName: 'صيانة المنيوم'
    },
    {
      name: 'تصليح مطابخ الكويت',
      slug: '/تصليح-مطابخ-الكويت/',
      shortName: 'تصليح مطابخ'
    },
    {
      name: 'فك وتركيب مطابخ',
      slug: '/فك-وتركيب-مطابخ/',
      shortName: 'فك وتركيب'
    },
    {
      name: 'تصليح كبتات وأدراج المطبخ',
      slug: '/تصليح-كبتات-المطابخ/',
      shortName: 'تصليح كبتات'
    }
  ],

  // === BUSINESS DESCRIPTION ===
  description: 'فني ألمنيوم متخصص في صيانة وتصليح مطابخ الألمنيوم في الكويت. نقدم خدمات فك وتركيب المطابخ، تصليح كبتات وأدراج ومفصلات المطبخ.',
  shortDescription: 'صيانة وتصليح مطابخ الألمنيوم في الكويت',

  // === WARRANTY ===
  // NOTE: The repository contains contradictory warranty values (5 years in StatsBar, 10 years in WhyUs).
  // Until the business owner confirms the correct value, we use neutral wording.
  warrantyVerified: false,
  warrantyText: 'تفاصيل الضمان تختلف حسب نوع الخدمة والقطعة المستخدمة.',

  // === WORKING HOURS ===
  // Not verified in the repository — set to null.
  workingHours: null,

  // === PHYSICAL ADDRESS ===
  // This is a service-area business. No verified storefront address.
  address: null,

  // === EXPERIENCE / STATS ===
  // NOTE: "10+ years" and "500+ projects" appeared in StatsBar but are UNVERIFIED.
  // These are set to null to prevent false claims.
  yearsExperience: null,
  projectsCompleted: null,
};

export default businessData;
export { BASE_URL };
