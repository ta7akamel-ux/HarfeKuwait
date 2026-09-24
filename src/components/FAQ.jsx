import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const defaultFaqs = [
  {
    question: "كيف يتم تحديد تكلفة صيانة المطبخ؟",
    answer: "تختلف تكلفة صيانة أو تصليح المطبخ من حالة إلى أخرى، ولا يوجد سعر ثابت لجميع المطابخ. يتم تحديد التكلفة حسب نوع المشكلة، حالة المطبخ، القطع المطلوبة، وحجم العمل والجهد اللازم لتنفيذ الإصلاح. لذلك تختلف تكلفة إصلاح مفصلة أو درج حسب حالة القطعة ونوع الإصلاح المطلوب."
  },
  {
    question: "هل تقومون بتصليح كبتات وأدراج المطبخ المستعملة وتغيير المفصلات؟",
    answer: "نعم، لدينا فريق متخصص في تصليح كبتات وأدراج المطبخ المستعملة، وتغيير المفصلات القديمة بأخرى أصلية ومضمونة لتعود وكأنها جديدة. نتعامل مع جميع أنواع المفصلات (الهيدروليكية والعادية) وسكك الأدراج بمختلف أنواعها. الإصلاح في كثير من الحالات يوفر عليك تكلفة تغيير المطبخ بالكامل."
  },
  {
    question: "ما هي مواعيد ومناطق عمل فني الألمنيوم في الكويت؟",
    answer: "نقدم خدماتنا في جميع مناطق الكويت بما في ذلك العاصمة وحولي والفروانية والأحمدي والجهراء ومبارك الكبير. مواعيد عملنا مرنة لتناسب جدولك، ويمكنك التواصل معنا في أي وقت لتحديد موعد لزيارة الفني. نصلك في أقرب وقت ممكن."
  }
];

const FAQ = ({ faqs = defaultFaqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-brand-navy relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="container mx-auto px-6 max-w-[800px]">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-serif text-text-primary font-bold mb-4">الأسئلة الشائعة</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold-light to-brand-gold rounded-full mx-auto"></div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-answer-${index}`;
            const buttonId = `faq-question-${index}`;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/5"
              >
                <button 
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full px-6 py-5 flex items-center justify-between text-right text-text-primary hover:text-brand-gold transition-colors focus:outline-none"
                >
                  <h3 className="font-bold font-serif text-lg md:text-xl pr-2">{faq.question}</h3>
                  <ChevronDown 
                    className={`text-brand-gold transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                    size={24} 
                  />
                </button>
                
                {/* Answer is ALWAYS in the DOM for crawlers/prerendering. 
                    Visibility is controlled via CSS (max-height + overflow). */}
                <div 
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="px-6 pb-6 pt-2 text-text-secondary leading-relaxed border-t border-white/5 mt-2 mx-4">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
