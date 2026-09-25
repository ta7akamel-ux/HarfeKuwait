import React from 'react';
import SEO from '../components/SEO';
import StructuredData, { generatePageSchema } from '../components/StructuredData';
import FAQ, { defaultFaqs } from '../components/FAQ';
import businessData from '../businessData';

const additionalFaqs = [
  {
    question: "ما الذي يقدمه فني الألمنيوم للمطابخ؟",
    answer: "يقدم فني الألمنيوم لدينا خدمات مخصصة للمطابخ تشمل تصليح الأبواب، معالجة الأعطال، تغيير المفصلات التالفة، وإصلاح كبتات وأدراج المطبخ لضمان عملها بكفاءة."
  },
  {
    question: "هل يوجد فني لتصليح مطابخ الألمنيوم؟",
    answer: "نعم، لدينا فني ألمنيوم متخصص تحديداً في صيانة وإصلاح مطابخ الألمنيوم في الكويت، مجهز بأفضل الأدوات وقطع الغيار الأصلية لمعالجة كافة الأعطال."
  },
  {
    question: "هل يمكن إصلاح باب خزانة المطبخ؟",
    answer: "نعم، يمكن إصلاح باب خزانة المطبخ في معظم الحالات. نقوم بفحص الباب وتغيير المفصلات التالفة وإعادة ضبطه ليعمل بشكل طبيعي دون الحاجة لتغيير الخزانة بالكامل."
  },
  {
    question: "هل يمكن إصلاح مفصلات المطابخ؟",
    answer: "بالتأكيد، يمكننا إصلاح وتغيير مفصلات المطابخ التالفة بأنواع أصلية ومضمونة. نتعامل مع كافة أنواع المفصلات (العادية والهيدروليكية) لإعادة الحركة السلسة للأبواب."
  },
  {
    question: "هل يمكن فك وتركيب المطبخ؟",
    answer: "نعم، نقدم خدمة فك وتركيب مطابخ الألمنيوم باحترافية تامة. سواء كنت تنتقل إلى منزل جديد أو تحتاج لتعديل المطبخ الحالي، فريقنا متخصص لضمان النقل الآمن وإعادة التركيب بدقة."
  },
  {
    question: "كيف أعرف أن المطبخ يحتاج إلى صيانة؟",
    answer: "يحتاج المطبخ إلى صيانة إذا لاحظت أصواتاً مزعجة عند فتح الأبواب، عدم إغلاق الأبواب بإحكام، صعوبة في سحب الأدراج، أو إذا كانت المفصلات تبدو صدئة أو مكسورة. التدخل المبكر يمنع تفاقم المشكلة."
  },
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
