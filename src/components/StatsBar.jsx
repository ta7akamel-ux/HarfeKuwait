import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: 15, suffix: '+', label: 'عاماً من الخبرة' },
  { number: 500, suffix: '+', label: 'مشروع منجز' },
  { number: 10, suffix: '', label: 'سنوات ضمان' },
  { number: 100, prefix: '%', suffix: '', label: 'تغطية لكل الكويت' },
];

const Counter = ({ target, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref} dir="ltr" className="inline-block">{prefix}{count}{suffix}</span>;
};

const StatsBar = () => {
  return (
    <section id="about" className="sharit-al-ihsaeyat py-16 bg-brand-navy border-b border-white/5 relative z-20 -mt-10">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div 
          className="lawhat-ihsaeyat glass-panel rounded-2xl py-8 px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="unsur-ihsaey flex flex-col items-center justify-center text-center space-y-2">
              <div className="muhtawa-ihsaey flex flex-col items-center">
                <span className="raqm-ihsaey metallic-text text-4xl md:text-5xl font-bold font-serif mb-2">
                  <Counter target={stat.number} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <span className="wasf-ihsaey text-text-secondary text-sm md:text-base font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
