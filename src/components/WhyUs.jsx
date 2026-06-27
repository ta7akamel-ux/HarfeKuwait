import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Shield, Clock, Handshake } from 'lucide-react';
import image1 from '../../Assets/unnamed (1).png';
import image2 from '../../Assets/unnamed (2).png';

const features = [
  {
    title: 'خامات أصلية',
    description: 'ألومنيوم سماكة عالية مقاوم للصدأ والخدوش.',
    icon: <BadgeCheck size={24} className="text-brand-gold" />
  },
  {
    title: 'ضمان شامل',
    description: 'كفالة حقيقية تمتد لعشر سنوات على الهيكل والمفصلات.',
    icon: <Shield size={24} className="text-brand-gold" />
  },
  {
    title: 'تسليم بالموعد',
    description: 'نحترم وقتك ونلتزم بخطة عمل صارمة دون تأخير.',
    icon: <Clock size={24} className="text-brand-gold" />
  }
];

const WhyUs = () => {
  return (
    <section id="why-us" className="limatha-nahnu py-24 bg-brand-navy overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Images Section (Left side in LTR, Right side in RTL visually but flex-row keeps it normal in DOM) */}
          <div className="qism-al-suwar w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="h-64 rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
                <img src={image1} alt="فني تصليح كبتات مطبخ المنيوم في الكويت" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-navy/20 mix-blend-overlay"></div>
              </div>
              <div className="h-48 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <Handshake size={40} className="text-brand-gold mb-3" />
                <span className="text-lg font-bold font-serif text-text-primary">رضا العملاء أولاً</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="h-full rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl mt-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img src={image2} alt="أفضل محلات المطابخ في الكويت لتفصيل الألمنيوم" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-overlay"></div>
              <div className="absolute bottom-4 left-4 text-xs font-medium text-text-secondary">فريق محترف</div>
            </motion.div>
          </div>

          {/* Text Section */}
          <div className="qism-al-nass w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-text-primary font-bold mb-6">ليش تختار <br/><span className="text-brand-gold">حرفي الكويت؟</span></h2>
              <p className="text-text-secondary text-base leading-relaxed mb-12">
                باعتبارنا من أفضل محلات المطابخ في الكويت، نحن لا نصنع مجرد مطابخ، بل نبتكر مساحات عمل فنية تدوم لعقود. سواء كنت تبحث عن جودة مطابخ الشويخ الصناعية أو التصاميم العصرية، التزامنا بالجودة يبدأ من اختيار أصغر مسمار وحتى تسليم المشروع.
              </p>

              <div className="flex flex-col gap-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="mayiza-unsur flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif text-text-primary mb-2">{feature.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;
