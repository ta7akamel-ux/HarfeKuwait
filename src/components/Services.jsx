import React from 'react';
import { motion } from 'framer-motion';
import { Archive, Wrench, RefreshCw, Compass } from 'lucide-react';

const services = [
  {
    title: 'تركيب وتفصيل مطابخ الكويت',
    description: 'تصميم وتفصيل مطابخ ألومنيوم تواكب أحدث الصيحات العالمية لتناسب مساحتك واحتياجاتك.',
    icon: <Archive size={28} className="text-brand-gold" />
  },
  {
    title: 'تصليح كبتات مطبخ',
    description: 'فريق متخصص لتصليح كبتات المطبخ، صيانة المفصلات والأسطح لتعود كالجديدة.',
    icon: <Wrench size={28} className="text-brand-gold" />
  },
  {
    title: 'صيانة ادراج مطابخ المنيوم',
    description: 'تجديد وتطوير أدراج مطابخ المنيوم وتغيير الواجهات بأقل تكلفة مع ضمان الجودة.',
    icon: <RefreshCw size={28} className="text-brand-gold" />
  },
  {
    title: 'قياس وتخطيط دقيق',
    description: 'رفع مقاسات دقيق وتقديم رسم هندسي 3D لضمان أفضل استغلال للمساحة قبل البدء.',
    icon: <Compass size={28} className="text-brand-gold" />
  }
];

const Services = () => {
  return (
    <section id="services" className="aqsam-al-khadamat py-24 bg-brand-navy relative">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="unwan-al-qism text-3xl md:text-4xl font-serif text-text-primary font-bold mb-4">خدمات تركيب وتفصيل مطابخ الكويت</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-gold-light to-brand-gold rounded-full mx-auto"></div>
        </motion.div>

        <div className="shabakat-al-khadamat grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="khidma-card glass-card p-8 rounded-2xl relative overflow-hidden group text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
            >
              <div className="ramz-al-khidma w-16 h-16 mx-auto bg-brand-navy border border-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner relative z-10">
                {service.icon}
                <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="unwan-al-khidma text-xl font-bold text-text-primary mb-3 font-serif relative z-10">{service.title}</h3>
              <p className="wasf-al-khidma text-sm text-text-secondary leading-relaxed relative z-10">{service.description}</p>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-light to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
