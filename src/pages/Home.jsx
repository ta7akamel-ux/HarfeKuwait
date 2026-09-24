import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import StructuredData, { generatePageSchema } from '../components/StructuredData';
import { defaultFaqs } from '../components/FAQ';

export default function Home() {
  const schema = generatePageSchema({
    canonical: '/',
    pageName: 'صيانة مطابخ الكويت | تصليح وفك وتركيب مطابخ الألمنيوم — حرفي الكويت',
    pageDescription: 'فني ألمنيوم متخصص في صيانة وتصليح مطابخ الكويت. خدمات فك وتركيب المطابخ، تصليح كبتات وأدراج ومفصلات المطبخ.',
    faqs: defaultFaqs
  });

  return (
    <>
      <SEO 
        title="صيانة مطابخ الكويت | تصليح وفك وتركيب مطابخ الألمنيوم — حرفي الكويت"
        description="فني ألمنيوم متخصص في صيانة وتصليح مطابخ الكويت. خدمات فك وتركيب المطابخ، تصليح كبتات وأدراج ومفصلات المطبخ بحرفية عالية. اتصل الآن 55307742."
        canonical="/"
      />
      <StructuredData data={schema} />
      <Hero />
      <StatsBar />
      <Services />
      <WhyUs />
      <Testimonials />
      <Gallery />
      <FAQ />
    </>
  );
}
