import React from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import FAQ from '../components/FAQ';

export default function ServiceLayout({ title, description, h1, subtitle, features, content, canonical }) {
  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <div className="pt-24 pb-12 bg-brand-navy min-h-[40vh] flex items-center">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4"
          >
            {h1}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <a href="tel:+96555307742" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-navy font-bold rounded-full hover:bg-brand-gold-light transition-all shadow-gold hover:shadow-gold-lg transform hover:-translate-y-1 w-full sm:w-auto text-lg">
              <Phone size={24} className="transform transition-transform group-hover:scale-110" />
              <span>اتصل الآن:</span>
              <span dir="ltr" className="font-sans">55307742</span>
            </a>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-bg-secondary rounded-2xl p-8 shadow-lg mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-6">تفاصيل الخدمة</h2>
              <div className="prose prose-invert prose-lg max-w-none text-text-secondary">
                {content}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-bg-secondary/50 rounded-xl border border-border-color">
                  <CheckCircle2 className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{feature.title}</h3>
                    <p className="text-sm text-text-secondary">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="tel:+96555307742" className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-navy font-bold rounded-full hover:bg-brand-gold-light transition-all shadow-gold hover:shadow-gold-lg transform hover:-translate-y-1">
                <Phone size={24} />
                <span>اتصل الآن لحجز الخدمة</span>
                <span dir="ltr">55307742</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-navy border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-brand-gold mb-6">خدمات ذات صلة</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {canonical !== '/صيانة-مطابخ-المنيوم/' && (
              <Link to="/صيانة-مطابخ-المنيوم/" className="px-6 py-3 bg-bg-secondary border border-border-color rounded-full text-text-primary hover:border-brand-gold hover:text-brand-gold transition-colors">صيانة مطابخ المنيوم</Link>
            )}
            {canonical !== '/تصليح-مطابخ-الكويت/' && (
              <Link to="/تصليح-مطابخ-الكويت/" className="px-6 py-3 bg-bg-secondary border border-border-color rounded-full text-text-primary hover:border-brand-gold hover:text-brand-gold transition-colors">تصليح مطابخ الكويت</Link>
            )}
            {canonical !== '/فك-وتركيب-مطابخ/' && (
              <Link to="/فك-وتركيب-مطابخ/" className="px-6 py-3 bg-bg-secondary border border-border-color rounded-full text-text-primary hover:border-brand-gold hover:text-brand-gold transition-colors">فك وتركيب مطابخ</Link>
            )}
            {canonical !== '/تصليح-كبتات-المطابخ/' && (
              <Link to="/تصليح-كبتات-المطابخ/" className="px-6 py-3 bg-bg-secondary border border-border-color rounded-full text-text-primary hover:border-brand-gold hover:text-brand-gold transition-colors">تصليح كبتات وأدراج</Link>
            )}
          </div>
        </div>
      </section>
      
      <FAQ />
    </>
  );
}
