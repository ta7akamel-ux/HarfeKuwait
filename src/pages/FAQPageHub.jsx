import React from 'react';
import SEO from '../components/SEO';
import StructuredData, { generatePageSchema } from '../components/StructuredData';
import FAQ, { defaultFaqs } from '../components/FAQ';
import businessData from '../businessData';

const additionalFaqs = [
  {
    question: "كيف يمكنني حجز موعد لصيانة المطبخ؟",
    answer: "يمكنك حجز موعد عن طريق الاتصال بنا مباشرة أو إرسال رسالة عبر الواتساب على الرقم " + businessData.phoneDisplay + ". سنقوم بترتيب موعد يناسب جدولك بأسرع وقت ممكن."
  },
  {
    question: "هل تقدمون خدمات الصيانة في جميع المناطق؟",
    answer: "نعم، نقدم خدمات فك وتركيب وصيانة المطابخ في جميع محافظات الكويت: " + businessData.serviceAreas.join('، ') + "."
  },
  {
    question: "هل يوجد ضمان على قطع الغيار المستخدمة؟",
    answer: businessData.warrantyText
  }
];

const allFaqs = [...defaultFaqs, ...additionalFaqs];

export default function FAQPageHub() {
  const schema = generatePageSchema({
    canonical: '/اسئلة-شائعة/',
    pageName: 'الأسئلة الشائعة | حرفي الكويت',
    pageDescription: 'إجابات على الأسئلة الشائعة حول خدمات صيانة وتصليح وفك وتركيب المطابخ في الكويت، بالإضافة إلى طرق تحديد التكلفة وطرق التواصل.',
    breadcrumbs: [
      { name: 'الرئيسية', url: '/' },
      { name: 'الأسئلة الشائعة', url: '/اسئلة-شائعة/' }
    ],
    service: false,
    faqs: allFaqs
  });

  return (
    <>
      <SEO 
        title="الأسئلة الشائعة حول صيانة المطابخ | حرفي الكويت"
        description="إجابات على الأسئلة الشائعة حول خدمات صيانة وتصليح وفك وتركيب المطابخ في الكويت، بالإضافة إلى طرق تحديد التكلفة وطرق التواصل."
        canonical="/اسئلة-شائعة/"
      />
      <StructuredData data={schema} />

      <header className="pt-32 pb-8 bg-brand-navy flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            إجابات على الأسئلة الشائعة حول خدمات صيانة وتصليح المطابخ، طرق تحديد التكلفة، وطرق التواصل.
          </p>
        </div>
      </header>

      <div className="pb-12 bg-brand-navy">
        <FAQ faqs={allFaqs} />
      </div>
    </>
  );
}
