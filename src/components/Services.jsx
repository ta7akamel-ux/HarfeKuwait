import React from 'react';
import { motion } from 'framer-motion';
import { Archive, Wrench, RefreshCw, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'فك وتركيب المطابخ',
    description: 'خدمة فك وتركيب مطابخ الألمنيوم عند الانتقال أو التجديد، مع تعديل القياسات وضبط الميزانية بدقة.',
    icon: <Archive size={28} className="text-brand-gold" />,
    link: '/فك-وتركيب-مطابخ/'
  },
  {
    title: 'إصلاح كبتات ودواليب المطبخ',
    description: 'فريق متخصص لتصليح كبتات المطبخ، صيانة المفصلات والأسطح لتعود كالجديدة.',
    icon: <Wrench size={28} className="text-brand-gold" />,
    link: '/تصليح-كبتات-المطابخ/'
  },
  {
    title: 'صيانة مطابخ الألمنيوم',
    description: 'تجديد وتطوير مطابخ المنيوم وصيانة جميع الأعطال بأقل تكلفة مع ضمان الجودة.',
    icon: <RefreshCw size={28} className="text-brand-gold" />,
    link: '/صيانة-مطابخ-المنيوم/'
  },
  {
    title: 'تصليح المطابخ وصيانتها',
    description: 'صيانة وتصليح شامل لجميع أنواع المطابخ، إعادة ميزانية وتصليح الأبواب والمفصلات.',
    icon: <Compass size={28} className="text-brand-gold" />,
    link: '/تصليح-مطابخ-الكويت/'
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
          <h2 className="unwan-al-qism text-3xl md:text-4xl font-serif text-text-primary font-bold mb-4">خدمات صيانة وتصليح المطابخ في الكويت</h2>
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
              <Link to={service.link} className="block w-full h-full">
                <div className="ramz-al-khidma w-16 h-16 mx-auto bg-brand-navy border border-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner relative z-10">
                  {service.icon}
                  <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="unwan-al-khidma text-xl font-bold text-text-primary mb-3 font-serif relative z-10">{service.title}</h3>
                <p className="wasf-al-khidma text-sm text-text-secondary leading-relaxed relative z-10 mb-4">{service.description}</p>
                
                <span className="inline-block text-brand-gold font-medium text-sm group-hover:underline">اقرأ المزيد &larr;</span>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-light to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
