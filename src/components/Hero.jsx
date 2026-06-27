import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import backgroundImg from '../../Assets/background.png';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const textVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section id="home" className="qism-al-batal relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      
      <div className="khalfiyat-al-batal absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-pulse"
          style={{ 
            backgroundImage: `url(${backgroundImg})`,
            animation: 'float 20s ease-in-out infinite alternate' 
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-brand-navy/80 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="muhtawa-al-batal relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Gold accent line & label */}
          <motion.div variants={textVariants} className="khut-dhahabi flex items-center gap-4 mb-6">
            <span className="text-brand-gold text-sm tracking-widest font-medium uppercase">حرفي الكويت للألومنيوم</span>
          </motion.div>

          <motion.h1 variants={textVariants} className="unwan-al-batal text-5xl md:text-7xl font-serif font-bold text-text-primary mb-6 leading-tight">
            فني المنيوم: تصميم و <br />
            صيانة مطابخ المنيوم بالكويت
          </motion.h1>
          
          <motion.p variants={textVariants} className="wasf-al-batal text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed">
            نجمع بين متانة الألومنيوم والفخامة العصرية لنصنع لك مطبخاً يعكس ذوقك ويدوم طويلاً.
            حرفية دقيقة، خامات ممتازة، وتصميمات استثنائية تناسب أرقى المنازل في الكويت.
          </motion.p>
          
          <motion.div variants={textVariants} className="azrar-al-batal flex flex-col sm:flex-row items-center gap-6">
            <a href="#contact" className="px-8 py-4 bg-brand-gold text-brand-navy font-bold rounded-full hover:bg-brand-gold-light transition-all shadow-gold hover:shadow-gold-lg transform hover:-translate-y-1 w-full sm:w-auto metallic-hover">
              احجز استشارتك الآن
            </a>
            <a href="#gallery" className="group px-8 py-4 border-2 border-brand-gold/30 text-text-primary font-bold rounded-full hover:border-brand-gold hover:text-brand-gold transition-all flex items-center justify-center gap-3 w-full sm:w-auto glass-card">
              استكشف أعمالنا
              <span className="transform transition-transform group-hover:-translate-x-2">←</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-brand-gold animate-scrollIndicator opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
