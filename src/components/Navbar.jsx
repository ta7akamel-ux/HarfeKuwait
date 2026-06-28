import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = ['home', 'services', 'why-us', 'gallery', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { name: 'الرئيسية', href: '#home', id: 'home' },
    { name: 'من احنا', href: '#about', id: 'about' },
    { name: 'خدماتنا', href: '#services', id: 'services' },
    { name: 'ليش تختارنا؟', href: '#why-us', id: 'why-us' },
    { name: 'معرض شغلنا', href: '#gallery', id: 'gallery' },
    { name: 'تواصل معانا', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav 
        className={`sharit-al-tanaqul fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hawiyat-al-sharit max-w-[1200px] mx-auto px-8 flex justify-between items-center" dir="rtl">
          
          <a href="#home" className="shiear flex items-center gap-3 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold group-hover:text-brand-gold-light transition-colors"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
             <span className="text-brand-gold text-xl md:text-2xl font-serif font-bold tracking-wider group-hover:text-brand-gold-light transition-colors">
              حرفي الكويت | HarfeKuwait
            </span>
          </a>

          <ul className={`rawabit-al-tanaqul hidden md:flex md:flex-row items-center gap-8`} dir="rtl">
            {links.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href} 
                  className={`rabit relative text-sm font-medium transition-colors hover:text-brand-gold ${activeSection === link.id ? 'text-brand-gold' : 'text-text-primary'}`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.span 
                      className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 bg-brand-gold rounded-full -translate-x-1/2"
                      layoutId="activeDot"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button 
            className="zir-al-qaema md:hidden text-brand-gold" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="ghita-al-jawwal fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          >
            {links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="text-2xl font-medium text-text-primary hover:text-brand-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
