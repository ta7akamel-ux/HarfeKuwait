import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'أم فهد الرشيد',
    location: 'الجهراء',
    text: 'شغل ممتاز وسرعة في التنفيذ، النظافة تفتح النفس من اللي شفته، ما شاء الله عليكم!',
    rating: 5,
  },
  {
    id: 2,
    name: 'خالد العتيبي',
    location: 'حولي',
    text: 'صراحة فريق محترف وأسعار معقولة، نظفولي أشياء وكنت على وشك أرميها.',
    rating: 5,
  },
  {
    id: 3,
    name: 'سارة المطيري',
    location: 'الفروانية',
    text: 'التنظيف صار دقيق! التصاميم روعة والتنفيذ أروع، الله يعطيكم العافية.',
    rating: 5,
  },
  {
    id: 4,
    name: 'محمد العنزي',
    location: 'الأحمدي',
    text: 'شغل نظيف وفريق مهذب، بس كان في تأخير بسيط في التسليم، لكن النتيجة ترضي.',
    rating: 4,
  },
  {
    id: 5,
    name: 'فاطمة الدوسري',
    location: 'السالمية',
    text: 'ما شاء الله عليكم! سعر معقول وشغل ممتاز، النظافة صار أحسن من الأول بكثير.',
    rating: 5,
  },
  {
    id: 6,
    name: 'عبدالله الشمري',
    location: 'الجهراء',
    text: 'الشغل ممتاز والتسليم كويس، كان ممكن يكون أحسن في التواصل بس بشكل عام راضي.',
    rating: 4,
  },
  {
    id: 7,
    name: 'نورة الخالد',
    location: 'مبارك الكبير',
    text: 'فريق محترف جداً! جابوا عمالة بمواصفات عالية وخلصوا في الوقت المحدد.',
    rating: 5,
  },
  {
    id: 8,
    name: 'أحمد البلوشي',
    location: 'الفروانية',
    text: 'خدمة كويسة وتعامل طيب، النظافة حلوة بس كان ودي لو في المزيد من الخيارات.',
    rating: 4,
  },
  {
    id: 9,
    name: 'مريم العجمي',
    location: 'حولي',
    text: 'أفضل قرار اتخذته! النظافة تفتح النفس والفريق شغال بضمير.',
    rating: 5,
  },
  {
    id: 10,
    name: 'يوسف الهاجري',
    location: 'الأحمدي',
    text: 'شغل عادي، مش أحسن شي بس مش أسوأ شي، السعر مناسب للجودة.',
    rating: 3,
  },
  {
    id: 11,
    name: 'هند الرشيد',
    location: 'العاصمة',
    text: 'روعة في التعامل والتنفيذ! نظفولي بشلول عملية وفرت علي المساحة والفلوس.',
    rating: 5,
  },
  {
    id: 12,
    name: 'طلال العازمي',
    location: 'الجهراء',
    text: 'شغل حلو وفريق مهذب، كان في بعض التأخير بس النتيجة كانت مرضية.',
    rating: 4,
  },
  {
    id: 13,
    name: 'لطيفة الصباح',
    location: 'السالمية',
    text: 'ما قصروا! شغل احترافي ونتيجة فوق التوقعات، أنصح الكل يتعامل معاهم.',
    rating: 5,
  },
  {
    id: 14,
    name: 'سعد الكندري',
    location: 'مبارك الكبير',
    text: 'كويس بس مش ممتاز، التنظيف حلو والسعر معقول لكن كان ممكن يكون أفضل.',
    rating: 3,
  },
  {
    id: 15,
    name: 'عائشة العتيقي',
    location: 'الفروانية',
    text: 'الخدمة مرضية جداً! التنظيف صار أحلى بكتير في البيت والعمال نظيفين ومحترمين.',
    rating: 5,
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center gap-1 mb-4" dir="ltr">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-[#DBBB92]' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 metallic-text-animated">آراء عملائنا</h2>
          <div className="gold-line mb-6"></div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            شوف إيش يقولون عملائنا عن خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StarRating rating={testimonial.rating} />
              
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow text-sm md:text-base font-medium">
                "{testimonial.text}"
              </p>
              
              <div className="mt-auto">
                <h4 className="text-white font-bold text-lg mb-1">{testimonial.name}</h4>
                <p className="text-[#DBBB92] text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
