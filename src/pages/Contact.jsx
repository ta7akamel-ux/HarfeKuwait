import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData, { generatePageSchema } from '../components/StructuredData';
import businessData from '../businessData';

export default function Contact() {
  const schema = generatePageSchema({
    canonical: '/اتصل-بنا/',
    pageName: 'اتصل بنا | حرفي الكويت',
    pageDescription: 'تواصل مع حرفي الكويت لطلب صيانة أو تصليح مطبخ في الكويت. يمكنك التواصل عبر الهاتف أو الواتساب أو البريد الإلكتروني.',
    breadcrumbs: [
      { name: 'الرئيسية', url: '/' },
      { name: 'اتصل بنا', url: '/اتصل-بنا/' }
    ],
    service: false
  });

  return (
    <>
      <SEO 
        title="اتصل بنا | حرفي الكويت"
        description="تواصل مع حرفي الكويت لطلب صيانة أو تصليح مطبخ في الكويت. يمكنك التواصل عبر الهاتف أو الواتساب أو البريد الإلكتروني."
        canonical="/اتصل-بنا/"
      />
      <StructuredData data={schema} />

      <header className="pt-32 pb-12 bg-brand-navy min-h-[30vh] flex items-center">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4"
          >
            اتصل بحرفي الكويت
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            لطلب صيانة أو تصليح مطبخ في الكويت، يمكنك التواصل مع حرفي الكويت عبر الهاتف أو الواتساب وإرسال تفاصيل العطل أو صورته لتحديد الخدمة المناسبة.
          </motion.p>
        </div>
      </header>

      <section className="py-16 bg-brand-navy">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <motion.a 
              href={`tel:${businessData.phone}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:border-brand-gold transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone size={32} className="text-brand-gold" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">اتصل بنا</h2>
              <p className="text-text-secondary mb-4">نحن متاحون للرد على استفساراتكم.</p>
              <span className="text-2xl text-brand-gold font-sans font-bold" dir="ltr">{businessData.phoneDisplay}</span>
            </motion.a>

            <motion.a 
              href={businessData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:border-brand-gold transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">واتساب</h2>
              <p className="text-text-secondary mb-4">أرسل صور العطل لتحديد التكلفة أسرع.</p>
              <span className="text-xl text-brand-gold font-sans font-bold" dir="ltr">{businessData.phoneDisplay}</span>
            </motion.a>

          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <MapPin className="text-brand-gold" /> مناطق الخدمة
            </h2>
            <p className="text-text-secondary leading-relaxed">
              نقدم خدمات فك وتركيب وصيانة المطابخ في جميع محافظات الكويت: <strong>{businessData.serviceAreas.join('، ')}</strong>.
              نحن لا نمتلك معرضاً للزوار، بل نقدم الخدمة المتنقلة مباشرة إلى موقعك للحصول على أفضل معاينة وتشخيص.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
