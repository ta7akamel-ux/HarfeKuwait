import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm('service_id_placeholder', 'template_id_placeholder', form.current, 'Y8wHoJzZJKqgH8vDf')
      .then((result) => {
          setStatus('success');
          e.target.reset();
      }, (error) => {
          setStatus('error');
      });
  };

  return (
    <footer id="contact" className="tathyeel-al-safha bg-brand-navy border-t border-white/5 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        
        <div className="qism-al-tawasul flex flex-col lg:flex-row justify-between gap-16 items-start">
          
          {/* Contact Info (Visually on the Right in RTL, logically first here) */}
          <motion.div 
            className="maelumat-al-tawasul w-full lg:w-5/12 order-2 lg:order-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary font-bold mb-2">
              دعنا نصمم <br/>
              <span className="text-brand-gold">مطبخ أحلامك</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-10 text-lg">
              تواصل معنا اليوم لحجز استشارة مجانية أو لطلب تسعير لمشروعك. فريقنا جاهز للرد على كافة استفساراتك.
            </p>

            <div className="flex flex-col gap-8">
              <a href="tel:55307742" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-brand-navy border border-white/5 shadow-inner flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                  <Phone size={24} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">اتصل بنا</div>
                  <div className="text-xl font-medium text-text-primary" dir="ltr">55307742</div>
                </div>
              </a>

              <a href="mailto:info@harfekuwait.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-brand-navy border border-white/5 shadow-inner flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                  <Mail size={24} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">البريد الإلكتروني</div>
                  <div className="text-lg font-medium text-text-primary">info@harfekuwait.com</div>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-brand-navy border border-white/5 shadow-inner flex items-center justify-center group-hover:border-brand-gold/50 transition-colors">
                  <MapPin size={24} className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">المعرض الرئيسي</div>
                  <div className="text-lg font-medium text-text-primary">مدينة الكويت، الكويت</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form (Visually on the Left in RTL, logically second) */}
          <motion.div 
            className="namouthaj-al-tawasul w-full lg:w-6/12 order-1 lg:order-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-panel p-8 md:p-10 rounded-2xl shadow-2xl relative">
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary px-1">الاسم الكريم</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="أدخل اسمك هنا" 
                    required 
                    className="w-full bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-gold/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary px-1">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="55307742" 
                    dir="rtl"
                    required 
                    className="w-full bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-gold/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary px-1">نوع الخدمة</label>
                  <select 
                    name="service" 
                    required 
                    className="w-full bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-text-secondary/50">اختر الخدمة...</option>
                    <option value="تصميم جديد">تصميم مطبخ جديد</option>
                    <option value="صيانة">صيانة وإصلاح</option>
                    <option value="تجديد">تجديد وتطوير</option>
                    <option value="أخرى">استفسار عام</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text-secondary px-1">رسالتك (اختياري)</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="تفاصيل إضافية حول مشروعك..." 
                    className="w-full bg-brand-navy/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-gold/50 transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-brand-gold text-brand-navy font-bold text-lg rounded-xl py-4 mt-2 hover:bg-brand-gold-light transition-colors shadow-gold hover:shadow-gold-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
                
                {status === 'success' && <p className="text-green-400 text-sm text-center mt-2">✓ تم إرسال طلبك بنجاح!</p>}
                {status === 'error' && <p className="text-red-400 text-sm text-center mt-2">✗ حدث خطأ، يرجى المحاولة لاحقاً.</p>}
              </form>
            </div>
          </motion.div>

        </div>

        {/* Bottom Footer Section */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
          
          {/* Column 1: Brand & Copyright */}
          <div className="flex flex-col items-start gap-5 order-1 md:order-1 md:max-w-sm">
            <h3 className="text-3xl font-serif font-bold text-brand-gold">حرفي الكويت</h3>
            <p className="text-base text-text-secondary leading-relaxed">
              نصنع الفخامة من الألومنيوم، رواد تصميم وصيانة المطابخ الفاخرة في الكويت بمعايير عالمية.
            </p>
            <p className="text-sm text-text-secondary/70 mt-2 font-sans">
              © 2024 حرفي الكويت. التميز في صناعة الألومنيوم.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="flex flex-col items-start gap-4 order-2 md:order-2" aria-label="روابط سريعة">
            <h3 className="text-brand-gold font-bold text-base mb-2">روابط سريعة</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-base text-text-secondary hover:text-brand-gold transition-colors font-sans">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-base text-text-secondary hover:text-brand-gold transition-colors font-sans">شروط الخدمة</a></li>
              <li><a href="#" className="text-base text-text-secondary hover:text-brand-gold transition-colors font-sans">الضمان</a></li>
              <li><a href="#" className="text-base text-text-secondary hover:text-brand-gold transition-colors font-sans">دليل الصيانة</a></li>
            </ul>
          </nav>

          {/* Column 3: Contact Us */}
          <address className="flex flex-col items-start gap-4 order-3 md:order-3 not-italic">
            <h3 className="text-brand-gold font-bold text-base mb-2">تواصل معنا</h3>
            
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="flex items-center gap-3 text-base text-text-secondary hover:text-brand-gold transition-colors group">
                  <MapPin size={18} className="text-brand-gold/70 group-hover:text-brand-gold transition-colors shrink-0" />
                  <span className="font-sans">الموقع</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-base text-text-secondary hover:text-brand-gold transition-colors group" aria-label="إنستغرام">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold/70 group-hover:text-brand-gold transition-colors shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="font-sans">إنستغرام</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-base text-text-secondary hover:text-brand-gold transition-colors group" aria-label="واتساب">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold/70 group-hover:text-brand-gold transition-colors shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span className="font-sans">واتساب</span>
                </a>
              </li>
            </ul>
          </address>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;
