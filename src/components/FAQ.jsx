import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "كم أسعار صيانة وتصليح مطابخ الالمنيوم في الكويت؟",
    answer: "تعتمد أسعار صيانة وتصليح مطابخ الالمنيوم على حجم العمل ونوع قطع الغيار المطلوبة، لكننا في حرفي الكويت نضمن تقديم أسعار تنافسية ومدروسة تناسب جميع الميزانيات مع الحفاظ على أعلى معايير الجودة."
  },
  {
    question: "هل تقومون بتصليح كبتات وأدراج المطبخ المستعملة وتغيير المفصلات؟",
    answer: "نعم، لدينا فريق متخصص في تصليح كبتات وأدراج المطبخ المستعملة، وتغيير المفصلات القديمة بأخرى أصلية ومضمونة لتعود وكأنها جديدة."
  },
  {
    question: "ما هي مواعيد ومناطق عمل فني الألمنيوم في الكويت؟",
    answer: "نقدم خدماتنا في جميع مناطق الكويت، ومواعيد عملنا مرنة لتناسب جدولك. يمكنك التواصل معنا في أي وقت لتحديد موعد لزيارة الفني."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[800px]">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-text-primary font-bold mb-4">الأسئلة الشائعة</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold-light to-brand-gold rounded-full mx-auto"></div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-right text-text-primary hover:text-brand-gold transition-colors focus:outline-none"
              >
                <h3 className="font-bold font-serif text-lg md:text-xl pr-2">{faq.question}</h3>
                <ChevronDown 
                  className={`text-brand-gold transform transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-text-secondary leading-relaxed border-t border-white/5 mt-2 mx-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
