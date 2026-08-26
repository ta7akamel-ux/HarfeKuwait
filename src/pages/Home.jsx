import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="صيانة مطابخ الكويت | تصليح وفك وتركيب المطابخ"
        description="صيانة مطابخ الكويت، فني ألمنيوم متخصص في تصليح كبتات وأدراج المطبخ، فك وتركيب المطابخ بخدمة سريعة بأسعار تنافسية. اتصل الآن."
        canonical="/"
      />
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
