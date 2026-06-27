import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import image1 from '../../Assets/unnamed (3).png';
import image2 from '../../Assets/unnamed (4).png';
import image3 from '../../Assets/unnamed (5).png';
import image4 from '../../Assets/unnamed (6).png';
import image5 from '../../Assets/unnamed.png';

const galleryImages = [
  { src: image1, title: 'تصميم مطبخ حديث', category: 'عصري', colSpan: 'col-span-1 md:col-span-1 lg:col-span-2' },
  { src: image2, title: 'مطبخ مودرن', category: 'مودرن', colSpan: 'col-span-1 md:col-span-1' },
  { src: image3, title: 'أدراج ذكية', category: 'تفاصيل', colSpan: 'col-span-1 md:col-span-1' },
  { src: image4, title: 'شقة العاصمة', category: 'تفاصيل ذهبية دقيقة', colSpan: 'col-span-1 md:col-span-1' },
  { src: image5, title: 'مطبخ أسود فاخر', category: 'كلاسيك', colSpan: 'col-span-1 md:col-span-1 lg:col-span-1' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="maerad-al-suwar py-24 bg-brand-navy">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="unwan-al-maerad text-3xl md:text-4xl font-serif text-text-primary font-bold mb-3">أعمالنا المميزة</h2>
            <p className="wasf-al-maerad text-text-secondary text-base">لمحة عن مشاريعنا الفاخرة في الكويت.</p>
          </motion.div>
          
          <motion.a 
            href="#gallery"
            className="hidden md:flex items-center gap-2 text-brand-gold font-medium hover:text-brand-gold-light transition-colors"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            عرض الكل <span className="transform rotate-180 inline-block">→</span>
          </motion.a>
        </div>

        <div className="shabakat-al-suwar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index}
              className={`unsur-sura relative overflow-hidden rounded-2xl cursor-pointer group border border-white/5 shadow-lg hover:shadow-gold transition-shadow ${image.colSpan} ${index === 3 ? 'row-span-2' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <ZoomIn size={24} className="text-brand-gold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100" />
                <h4 className="text-lg font-serif font-bold text-text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">{image.title}</h4>
                <span className="text-sm text-brand-gold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-brand-navy/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="relative max-w-5xl w-full h-full max-h-[90vh] flex flex-col items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-10 -right-4 md:top-0 md:-right-12 text-text-secondary hover:text-brand-gold transition-colors" 
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10" />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif text-brand-gold font-bold">{selectedImage.title}</h3>
                <p className="text-text-secondary mt-2">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
