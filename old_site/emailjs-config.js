// EmailJS Configuration for Aluminum Kitchen MVP
// تكوين EmailJS لموقع مطابخ الألومنيوم

// EmailJS Service Configuration
const EMAIL_CONFIG = {
    // معرف الخدمة العام - محدث للعمل مباشرة
    PUBLIC_KEY: 'Y8wHoJzZJKqgH8vDf', // EmailJS Public Key فعال
    SERVICE_ID: 'service_harfekuwait', // خدمة حرفي الكويت
    TEMPLATE_ID: 'template_contact', // قالب نموذج الاتصال
    
    // إعدادات افتراضية للعمل بدون تسجيل
    FALLBACK_CONFIG: {
        // استخدام خدمة مجانية افتراضية
        enabled: true,
        recipient: 'harfekuwait@gmail.com',
        subject_prefix: '[موقع حرفي الكويت] - '
    }
};

// Initialize EmailJS with fallback
function initializeEmailJS() {
    try {
        // محاولة تهيئة EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
            return true;
        }
    } catch (error) {
        console.warn('EmailJS initialization failed, using fallback methods');
    }
    return false;
}

// Send email function with multiple fallbacks
async function sendContactEmail(formData) {
    const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: EMAIL_CONFIG.FALLBACK_CONFIG.recipient,
        subject: EMAIL_CONFIG.FALLBACK_CONFIG.subject_prefix + 'طلب تواصل جديد'
    };

    // Method 1: Try EmailJS if available and configured
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        try {
            const response = await emailjs.send(
                EMAIL_CONFIG.SERVICE_ID,
                EMAIL_CONFIG.TEMPLATE_ID,
                emailData
            );
            
            if (response.status === 200) {
                return { success: true, method: 'emailjs' };
            }
        } catch (error) {
            console.warn('EmailJS failed, trying fallback methods');
        }
    }

    // Method 2: Use Formspree (free service)
    try {
        const formspreeResponse = await fetch('https://formspree.io/f/xpznvqko', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                _replyto: formData.email,
                _subject: 'طلب تواصل جديد من موقع حرفي الكويت'
            })
        });

        if (formspreeResponse.ok) {
            return { success: true, method: 'formspree' };
        }
    } catch (error) {
        console.warn('Formspree failed, trying next method');
    }

    // Method 3: Use Netlify Forms (if hosted on Netlify)
    try {
        const netlifyResponse = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'form-name': 'contact',
                'name': formData.name,
                'email': formData.email,
                'phone': formData.phone,
                'message': formData.message
            }).toString()
        });

        if (netlifyResponse.ok) {
            return { success: true, method: 'netlify' };
        }
    } catch (error) {
        console.warn('Netlify Forms failed, using final fallback');
    }

    // Method 4: Fallback to mailto with pre-filled content
    const subject = encodeURIComponent('طلب تواصل من الموقع - ' + formData.name);
    const body = encodeURIComponent(`
مرحبا،

تم إرسال طلب تواصل جديد من الموقع:

الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}

الرسالة:
${formData.message}

---
تم الإرسال من موقع حرفي الكويت للألومنيوم
${new Date().toLocaleString('ar-KW')}
    `);

    // Open default email client
    window.open(`mailto:${EMAIL_CONFIG.FALLBACK_CONFIG.recipient}?subject=${subject}&body=${body}`);
    
    return { success: true, method: 'mailto' };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAIL_CONFIG, initializeEmailJS, sendContactEmail };
}
