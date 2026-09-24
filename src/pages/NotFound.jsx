import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="الصفحة غير موجودة | حرفي الكويت"
        description="الصفحة التي تبحث عنها غير موجودة. تصفح خدمات صيانة وتصليح مطابخ الكويت من حرفي الكويت."
        canonical="/"
        noindex={true}
      />
      <div className="pt-32 pb-24 bg-brand-navy min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-gold mb-6">404</h1>
          <p className="text-2xl md:text-3xl text-text-primary font-bold mb-4">الصفحة غير موجودة</p>
          <p className="text-text-secondary text-lg mb-10">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يمكنك العودة للصفحة الرئيسية أو تصفح خدماتنا.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="px-8 py-4 bg-brand-gold text-brand-navy font-bold rounded-full hover:bg-brand-gold-light transition-all shadow-gold hover:shadow-gold-lg"
            >
              العودة للرئيسية
            </Link>
            <Link 
              to="/صيانة-مطابخ-المنيوم/" 
              className="px-8 py-4 border-2 border-brand-gold/50 text-brand-gold font-bold rounded-full hover:bg-brand-gold hover:text-brand-navy transition-all"
            >
              تصفح خدماتنا
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
