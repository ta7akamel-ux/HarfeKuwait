// Initialize EmailJS
(function () {
    // تهيئة EmailJS مع المفتاح الصحيح
    if (typeof emailjs !== 'undefined') {
        emailjs.init("Y8wHoJzZJKqgH8vDf"); // مفتاح EmailJS محدث
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS library not loaded, using fallback methods');
    }
})();

// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Enhanced Contact Form functionality
document.addEventListener('DOMContentLoaded', function () {
    console.log('Contact form script loading...');

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    console.log('Form elements found:', {
        contactForm: !!contactForm,
        submitBtn: !!submitBtn,
        formStatus: !!formStatus
    });

    if (contactForm) {
        // Initialize form validation and interactions
        initializeFormValidation();
        initializeCharacterCount();

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            console.log('Form submitted!');

            // Validate form before submission
            if (!validateFormData()) {
                console.log('Form validation failed');
                showFormStatus('يرجى تصحيح الأخطاء المذكورة أعلاه', 'error');
                return;
            }

            console.log('Form validation passed');

            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                service: formData.get('service'),
                message: formData.get('message'),
                privacy: formData.get('privacy')
            };

            // Show loading state
            setFormLoading(true);
            showFormStatus('جاري إرسال رسالتك...', 'info');

            try {
                // Try to send email using multiple methods
                const result = await sendContactEmail(data);

                if (result.success) {
                    const successMessages = {
                        'formsubmit': 'تم إرسال رسالتك بنجاح! 📧',
                        'formspree': 'تم إرسال رسالتك بنجاح! 📧',
                        'mailto': 'تم فتح برنامج البريد الإلكتروني 📧',
                        'clipboard': 'تم نسخ معلومات التواصل للحافظة 📋'
                    };

                    const message = successMessages[result.method] || 'تم إرسال رسالتك بنجاح! 📧';
                    showFormStatus(`🎉 ${message}\n\nسنتواصل معك خلال 24 ساعة على الرقم: ${data.phone}`, 'success');

                    contactForm.reset();
                    resetFormValidation();

                    // Track successful submission
                    trackFormSubmission(data, result.method);

                    // Track Google Ads conversion
                    if (typeof gtag_report_conversion === 'function') {
                        gtag_report_conversion();
                    }

                    // Show additional success feedback
                    setTimeout(() => {
                        showFormStatus('تم حفظ رسالتك بنجاح! سنتواصل معك قريباً', 'info');
                    }, 3000);
                } else {
                    throw new Error('فشل في إرسال الرسالة');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormStatus('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.', 'error');
            } finally {
                setFormLoading(false);
            }
        });
    }

    // Form validation functions
    function initializeFormValidation() {
        const inputs = contactForm.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }

    function validateField(field) {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Clear previous states
        fieldGroup.classList.remove('error', 'success');
        errorElement.classList.remove('show');

        // Validate based on field type
        switch (field.name) {
            case 'name':
                if (!field.value.trim()) {
                    errorMessage = 'الاسم مطلوب';
                    isValid = false;
                } else if (field.value.trim().length < 2) {
                    errorMessage = 'الاسم يجب أن يكون حرفين على الأقل';
                    isValid = false;
                } else if (!/^[أ-يa-zA-Z\s]+$/.test(field.value.trim())) {
                    errorMessage = 'يرجى استخدام الحروف العربية أو الإنجليزية فقط';
                    isValid = false;
                }
                break;

            case 'phone':
                if (!field.value.trim()) {
                    errorMessage = 'رقم الهاتف مطلوب';
                    isValid = false;
                } else if (!/^(\+965|965|00965)?[2456789]\d{7}$/.test(field.value.replace(/\s/g, ''))) {
                    errorMessage = 'يرجى إدخال رقم هاتف كويتي صحيح';
                    isValid = false;
                }
                break;

            case 'email':
                if (!field.value.trim()) {
                    errorMessage = 'البريد الإلكتروني مطلوب';
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
                    isValid = false;
                }
                break;

            case 'message':
                if (!field.value.trim()) {
                    errorMessage = 'الرسالة مطلوبة';
                    isValid = false;
                } else if (field.value.trim().length < 10) {
                    errorMessage = 'الرسالة يجب أن تكون 10 أحرف على الأقل';
                    isValid = false;
                } else if (field.value.length > 1000) {
                    errorMessage = 'الرسالة طويلة جداً (الحد الأقصى 1000 حرف)';
                    isValid = false;
                }
                break;

            case 'privacy':
                if (!field.checked) {
                    errorMessage = 'يجب الموافقة على سياسة الخصوصية';
                    isValid = false;
                }
                break;
        }

        // Update UI based on validation
        if (!isValid) {
            fieldGroup.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        } else {
            fieldGroup.classList.add('success');
        }

        return isValid;
    }

    function validateFormData() {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // Check privacy checkbox
        const privacyCheckbox = contactForm.querySelector('#privacy');
        if (!validateField(privacyCheckbox)) {
            isFormValid = false;
        }

        return isFormValid;
    }

    function resetFormValidation() {
        const fieldGroups = contactForm.querySelectorAll('.form-group');
        fieldGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    }

    // Character count functionality
    function initializeCharacterCount() {
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('char-count');

        if (messageField && charCount) {
            messageField.addEventListener('input', function () {
                const currentLength = this.value.length;
                charCount.textContent = currentLength;

                // Update character count styling
                const countElement = charCount.parentElement;
                countElement.classList.remove('warning', 'danger');

                if (currentLength > 800) {
                    countElement.classList.add('danger');
                } else if (currentLength > 600) {
                    countElement.classList.add('warning');
                }
            });
        }
    }

    // Form UI state management
    function setFormLoading(loading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        if (loading) {
            contactForm.classList.add('form-loading');
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
        } else {
            contactForm.classList.remove('form-loading');
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type} show`;

        // Auto hide after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        }
    }

    // Analytics tracking
    function trackFormSubmission(data, method) {
        try {
            // Track successful form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: method,
                    value: 1
                });
            }

            console.log('Form submitted successfully via:', method);
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }
});

// Show message function for rating form
function showMessage(message, type) {
    // Remove existing message if any
    const existingMsg = document.querySelector('.rating-message');
    if (existingMsg) existingMsg.remove();

    const msgDiv = document.createElement('div');
    msgDiv.className = `rating-message ${type}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        font-weight: 600;
        animation: fadeInUp 0.3s ease-out;
        ${type === 'error'
            ? 'background: rgba(197, 48, 48, 0.1); color: #c53030; border: 1px solid rgba(197, 48, 48, 0.3);'
            : 'background: rgba(45, 125, 50, 0.1); color: #2d7d32; border: 1px solid rgba(45, 125, 50, 0.3);'
        }
    `;

    const ratingForm = document.getElementById('ratingForm');
    if (ratingForm) {
        ratingForm.insertBefore(msgDiv, ratingForm.querySelector('button[type="submit"]'));
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (msgDiv.parentNode) {
            msgDiv.style.opacity = '0';
            msgDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => msgDiv.remove(), 300);
        }
    }, 5000);
}

// Rating System functionality
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');
    const ratingForm = document.getElementById('ratingForm');

    // Star rating interaction with accessibility improvements
    stars.forEach((star, index) => {
        // إضافة دعم قارئ الشاشة
        star.setAttribute('role', 'button');
        star.setAttribute('tabindex', '0');
        star.setAttribute('aria-label', `تقييم ${index + 1} من 5 نجوم`);

        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;

            // تحديث aria-label للنجوم
            stars.forEach((s, i) => {
                const starNum = i + 1;
                if (i < rating) {
                    s.setAttribute('aria-label', `نجمة ${starNum} - محددة`);
                    s.setAttribute('aria-pressed', 'true');
                } else {
                    s.setAttribute('aria-label', `نجمة ${starNum} - غير محددة`);
                    s.setAttribute('aria-pressed', 'false');
                }
            });

            // Update star display
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        // دعم التنقل بلوحة المفاتيح
        star.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                const nextStar = stars[Math.min(index + 1, stars.length - 1)];
                nextStar.focus();
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                const prevStar = stars[Math.max(index - 1, 0)];
                prevStar.focus();
            }
        });

        star.addEventListener('mouseover', function () {
            const rating = this.getAttribute('data-rating');
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.style.color = '#f39c12';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });

    // Reset stars on mouse leave
    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', function () {
            const currentRating = ratingInput.value;
            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.style.color = '#f39c12';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    }

    // Rating form submission
    if (ratingForm) {
        ratingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {
                customerName: formData.get('customerName'),
                rating: formData.get('rating'),
                feedback: formData.get('feedback')
            };

            // تحقق واضح لحقول نموذج التقييم فقط
            if (!data.customerName || !data.feedback) {
                showMessage('يرجى إدخال الاسم والتعليق', 'error');
                return;
            }
            if (!data.rating || Number(data.rating) < 1) {
                showMessage('يرجى اختيار عدد النجوم (3 فما فوق مفضل)', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;

            // Show loading state
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;

            // Send rating email
            sendRatingEmail(data)
                .then((result) => {
                    if (result.success) {
                        showMessage('🎉 شكراً لك! تم إرسال تقييمك بنجاح وسيظهر قريباً.', 'success');

                        // Add the new review to the reviews section
                        addNewReviewToPage(data);

                        // Save review to local storage
                        saveReviewToStorage(data);

                        ratingForm.reset();
                        if (ratingInput) ratingInput.value = '';
                        stars.forEach(s => {
                            s.classList.remove('active');
                            s.style.color = '#ddd';
                        });
                    } else {
                        throw new Error('فشل في إرسال التقييم');
                    }
                })
                .catch((error) => {
                    console.error('Rating submission error:', error);
                    showMessage('حدث خطأ في إرسال التقييم. يرجى المحاولة مرة أخرى.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Enhanced Email sending function with multiple fallbacks and rate limiting
async function sendContactEmail(data) {
    console.log('Starting email send process with data:', data);

    // Rate limiting - تحديد معدل الإرسال
    const rateLimitKey = 'harfe_contact_form_last_submit';
    const rateLimitDelay = 30000; // 30 ثانية بين كل إرسال
    const lastSubmit = localStorage.getItem(rateLimitKey);

    if (lastSubmit && (Date.now() - parseInt(lastSubmit)) < rateLimitDelay) {
        const remainingTime = Math.ceil((rateLimitDelay - (Date.now() - parseInt(lastSubmit))) / 1000);
        throw new Error(`يرجى الانتظار ${remainingTime} ثانية قبل إرسال رسالة أخرى`);
    }

    // تسجيل وقت الإرسال
    localStorage.setItem(rateLimitKey, Date.now().toString());

    // Method 1: Try EmailJS first (most reliable when configured)
    if (typeof emailjs !== 'undefined') {
        try {
            const emailData = {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone,
                service: data.service || 'غير محدد',
                message: data.message,
                reply_to: data.email
            };

            const response = await emailjs.send(
                'service_harfekuwait',
                'template_contact',
                emailData
            );

            if (response.status === 200) {
                console.log('Email sent successfully via EmailJS');
                return { success: true, method: 'emailjs' };
            }
        } catch (error) {
            console.warn('EmailJS failed, trying fallback methods:', error);
        }
    }

    // Method 2: Use FormSubmit (works immediately, no setup required)
    try {
        const formSubmitData = new FormData();
        formSubmitData.append('name', data.name);
        formSubmitData.append('email', data.email);
        formSubmitData.append('phone', data.phone);
        formSubmitData.append('service', data.service || 'غير محدد');
        formSubmitData.append('message', data.message);
        formSubmitData.append('_subject', `طلب تواصل جديد من ${data.name} - حرفي الكويت للألومنيوم`);
        formSubmitData.append('_captcha', 'false');
        formSubmitData.append('_template', 'table');

        const formSubmitResponse = await fetch('https://formsubmit.co/harfekuwait@gmail.com', {
            method: 'POST',
            body: formSubmitData
        });

        if (formSubmitResponse.ok) {
            console.log('Email sent successfully via FormSubmit');
            return { success: true, method: 'formsubmit' };
        }
    } catch (error) {
        console.warn('FormSubmit failed, trying next method:', error);
    }

    // Method 3: Use Formspree (backup)
    try {
        const formspreeData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service || 'غير محدد',
            message: data.message,
            _replyto: data.email,
            _subject: `طلب تواصل جديد من ${data.name} - حرفي الكويت للألومنيوم`
        };

        const formspreeResponse = await fetch('https://formspree.io/f/xpznvqko', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formspreeData)
        });

        if (formspreeResponse.ok) {
            console.log('Email sent successfully via Formspree');
            return { success: true, method: 'formspree' };
        }
    } catch (error) {
        console.warn('Formspree failed, trying next method:', error);
    }

    // Method 3: Fallback to mailto with pre-filled content
    const subject = encodeURIComponent(`طلب تواصل من ${data.name} - موقع حرفي الكويت`);
    const serviceText = data.service ? `\nنوع الخدمة: ${data.service}` : '';
    const body = encodeURIComponent(`
مرحبا،

تم إرسال طلب تواصل جديد من الموقع:

الاسم: ${data.name}
رقم الهاتف: ${data.phone}
البريد الإلكتروني: ${data.email}${serviceText}

الرسالة:
${data.message}

---
تم الإرسال من موقع حرفي الكويت للألومنيوم
التاريخ: ${new Date().toLocaleString('ar-KW')}
    `);

    // Open default email client
    const mailtoLink = `mailto:harfekuwait@gmail.com?subject=${subject}&body=${body}`;

    // Try to open mailto link
    try {
        window.open(mailtoLink, '_self');
        return { success: true, method: 'mailto' };
    } catch (error) {
        // If mailto fails, copy to clipboard as final fallback
        const contactText = `
الاسم: ${data.name}
الهاتف: ${data.phone}
الإيميل: ${data.email}
الخدمة: ${data.service || 'غير محدد'}
الرسالة: ${data.message}
        `;

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(contactText);
            return { success: true, method: 'clipboard' };
        }

        throw new Error('جميع طرق الإرسال فشلت');
    }
}

async function sendRatingEmail(data) {
    console.log('Sending rating email with data:', data);

    // Method 1: Use FormSubmit for ratings
    try {
        const starsText = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
        const formSubmitData = new FormData();
        formSubmitData.append('customer_name', data.customerName);
        formSubmitData.append('rating', data.rating);
        formSubmitData.append('stars', starsText);
        formSubmitData.append('feedback', data.feedback);
        formSubmitData.append('_subject', `تقييم جديد من ${data.customerName} - ${starsText} (${data.rating}/5)`);
        formSubmitData.append('_captcha', 'false');
        formSubmitData.append('_template', 'table');

        const formSubmitResponse = await fetch('https://formsubmit.co/harfekuwait@gmail.com', {
            method: 'POST',
            body: formSubmitData
        });

        if (formSubmitResponse.ok) {
            console.log('Rating sent successfully via FormSubmit');
            return { success: true, method: 'formsubmit' };
        }
    } catch (error) {
        console.warn('FormSubmit failed for rating, trying fallback:', error);
    }

    // Method 2: Use Formspree for ratings
    try {
        const starsText = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
        const formspreeData = {
            customer_name: data.customerName,
            rating: data.rating,
            stars: starsText,
            feedback: data.feedback,
            _subject: `تقييم جديد من ${data.customerName} - ${starsText} (${data.rating}/5)`
        };

        const formspreeResponse = await fetch('https://formspree.io/f/xpznvqko', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formspreeData)
        });

        if (formspreeResponse.ok) {
            console.log('Rating sent successfully via Formspree');
            return { success: true, method: 'formspree' };
        }
    } catch (error) {
        console.warn('Formspree failed for rating, using fallback:', error);
    }

    // Method 3: Fallback to mailto
    const starsText = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const subject = encodeURIComponent(`تقييم جديد من ${data.customerName} - ${starsText}`);
    const body = encodeURIComponent(`
تقييم جديد من العميل:

اسم العميل: ${data.customerName}
التقييم: ${starsText} (${data.rating}/5)

التعليق:
${data.feedback}

---
تم الإرسال من موقع حرفي الكويت للألومنيوم
التاريخ: ${new Date().toLocaleString('ar-KW')}
    `);

    window.open(`mailto:harfekuwait@gmail.com?subject=${subject}&body=${body}`, '_self');
    return { success: true, method: 'mailto' };
}

// Function to add new review to the page
function addNewReviewToPage(reviewData) {
    const reviewsGrid = document.querySelector('.reviews-grid');
    if (!reviewsGrid) return;

    // Create stars HTML
    const starsHtml = Array.from({ length: 5 }, (_, i) => {
        return i < reviewData.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }).join('');

    // Create new review card
    const newReviewCard = document.createElement('div');
    newReviewCard.className = 'review-card new-review';
    newReviewCard.innerHTML = `
        <div class="review-stars">
            ${starsHtml}
        </div>
        <p>"${reviewData.feedback}"</p>
        <div class="review-author">
            <h4>${reviewData.customerName}</h4>
            <span>عميل جديد</span>
        </div>
        <div class="review-badge">جديد!</div>
    `;

    // Add special styling for new review
    const newReviewStyles = document.createElement('style');
    newReviewStyles.textContent = `
        .review-card.new-review {
            position: relative;
            border: 2px solid var(--neutral-medium);
            background: linear-gradient(135deg, var(--white), rgba(223, 208, 184, 0.2));
            animation: newReviewGlow 2s ease-in-out;
        }
        
        @keyframes newReviewGlow {
            0%, 100% { 
                box-shadow: 0 8px 25px rgba(34, 40, 49, 0.1); 
            }
            50% { 
                box-shadow: 0 15px 35px rgba(148, 137, 121, 0.4); 
                transform: translateY(-5px) scale(1.02);
            }
        }
        
        .review-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            animation: bounce 1s ease-in-out infinite alternate;
        }
        
        @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-3px); }
        }
        
        .review-card.new-review .review-stars i {
            color: #f39c12;
            filter: drop-shadow(0 2px 4px rgba(243, 156, 18, 0.3));
        }
    `;

    document.head.appendChild(newReviewStyles);

    // Insert at the beginning of reviews grid
    reviewsGrid.insertBefore(newReviewCard, reviewsGrid.firstChild);

    // Scroll to the new review
    setTimeout(() => {
        newReviewCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 500);

    // Remove the "new" styling after 10 seconds
    setTimeout(() => {
        newReviewCard.classList.remove('new-review');
        const badge = newReviewCard.querySelector('.review-badge');
        if (badge) {
            badge.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => badge.remove(), 500);
        }
    }, 10000);

    console.log('New review added to page:', reviewData);
}

// Function to save reviews to localStorage for persistence
function saveReviewToStorage(reviewData) {
    try {
        const existingReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        const newReview = {
            ...reviewData,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            approved: false // Reviews need approval before permanent display
        };

        existingReviews.unshift(newReview); // Add to beginning

        // Keep only last 20 reviews
        if (existingReviews.length > 20) {
            existingReviews.splice(20);
        }

        localStorage.setItem('customerReviews', JSON.stringify(existingReviews));
        console.log('Review saved to storage:', newReview);
    } catch (error) {
        console.warn('Could not save review to storage:', error);
    }
}

// Function to load and display saved reviews on page load
function loadSavedReviews() {
    try {
        const savedReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        const recentReviews = savedReviews.slice(0, 3); // Show only 3 most recent

        recentReviews.forEach(review => {
            if (review.approved) { // Only show approved reviews permanently
                addNewReviewToPage(review);
            }
        });

        console.log('Loaded saved reviews:', recentReviews.length);
    } catch (error) {
        console.warn('Could not load saved reviews:', error);
    }
}

// Global utility function to show messages (used by other parts of the site)
function showMessage(message, type) {
    // Try to use the form status if available
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type} show`;

        // Auto hide after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        }
        return;
    }

    // Fallback: Create message element
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        const lastForm = forms[forms.length - 1];
        lastForm.parentNode.insertBefore(messageDiv, lastForm.nextSibling);
    }

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Enhanced Gallery lazy loading with performance optimization
document.addEventListener('DOMContentLoaded', function () {
    // Initialize lazy loading for gallery images
    const lazyImages = document.querySelectorAll('.lazy-image');
    const spinners = document.querySelectorAll('.loading-spinner');

    // Create intersection observer for better performance
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const spinner = img.parentElement.querySelector('.loading-spinner');

                // Start loading the image
                const tempImg = new Image();
                tempImg.onload = function () {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    if (spinner) {
                        spinner.classList.add('hidden');
                    }
                };
                tempImg.onerror = function () {
                    if (spinner) {
                        spinner.classList.add('hidden');
                    }
                    // Hide broken image gracefully
                    img.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-broken-placeholder';
                    placeholder.style.cssText = 'width:100%;height:100%;border-radius:12px;background:linear-gradient(135deg,#DFD0B8,#948979);display:flex;align-items:center;justify-content:center;color:#222831;font-weight:600;';
                    placeholder.textContent = 'الصورة غير متاحة';
                    placeholder.setAttribute('role', 'img');
                    placeholder.setAttribute('aria-label', img.getAttribute('alt') || 'صورة مطبخ ألومنيوم غير متاحة');
                    img.parentElement.appendChild(placeholder);
                };
                tempImg.src = img.dataset.src;

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // Observe all lazy images
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Preload first 3 images for better UX
    const firstThreeImages = Array.from(lazyImages).slice(0, 3);
    firstThreeImages.forEach(img => {
        const tempImg = new Image();
        const spinner = img.parentElement.querySelector('.loading-spinner');

        tempImg.onload = function () {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            if (spinner) {
                spinner.classList.add('hidden');
            }
        };
        tempImg.src = img.dataset.src;
    });

    // Fallback for old browsers without IntersectionObserver
    if (!window.IntersectionObserver) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            const spinner = img.parentElement.querySelector('.loading-spinner');
            if (spinner) {
                spinner.classList.add('hidden');
            }
        });
    }
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// WhatsApp floating button removed

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]:not([type="hidden"]), textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e9ecef';
        }
    });

    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }

    // Phone validation (Kuwaiti numbers)
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^(\+965|965|00965)?[2456789]\d{7}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
            phoneInput.style.borderColor = '#e74c3c';
            showMessage('يرجى إدخال رقم هاتف كويتي صحيح', 'error');
            isValid = false;
        }
    }

    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (this.id === 'ratingForm') return; // نموذج التقييم لديه منطق مخصص
            if (!validateForm(this)) {
                e.preventDefault();
                showMessage('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'error');
            }
        });
    });
});

// Performance optimization: Defer non-critical scripts
window.addEventListener('load', function () {
    // Initialize any non-critical functionality here
    console.log('موقع حرفي الكويت للألومنيوم تم تحميله بنجاح');
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Advanced UX Enhancements

// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', function () {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', function () {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Enhanced Image Loading with Fade Effect
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function () {
                this.classList.add('loaded');
            });
        }
    });

    // Lazy loading للفيديوهات الخلفية
    const videos = document.querySelectorAll('video[data-src]');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.dataset.src;
                video.classList.add('loaded');
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
});

// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', function () {
    // Add page transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(overlay);

    // Add CSS for transitions
    const transitionStyles = document.createElement('style');
    transitionStyles.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3498db, #2ecc71);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .page-transition.active {
            opacity: 1;
            visibility: visible;
        }
        
        .loader {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(transitionStyles);

    // Hide transition on load
    window.addEventListener('load', function () {
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 500);
    });
});

// Enhanced Navbar with Active Section Highlighting
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// Enhanced Gallery with Lightbox Effect
document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-caption"></div>
            <div class="lightbox-nav">
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Add lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .lightbox-content {
            position: relative;
            margin: auto;
            padding: 20px;
            width: 90%;
            max-width: 800px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox-img {
            max-width: 100%;
            max-height: 80%;
            object-fit: contain;
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10001;
        }
        
        .lightbox-close:hover {
            color: #3498db;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
        
        .lightbox-prev, .lightbox-next {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 15px 20px;
            font-size: 24px;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .lightbox-prev:hover, .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.4);
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(lightboxStyles);

    let currentImageIndex = 0;
    const images = Array.from(galleryItems);

    function openLightbox(index) {
        currentImageIndex = index;
        const img = images[index].querySelector('img');
        const caption = images[index].querySelector('.gallery-overlay h4').textContent;

        lightbox.querySelector('.lightbox-img').src = img.src;
        lightbox.querySelector('.lightbox-caption').textContent = caption;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
});

// Enhanced Form Interactions
document.addEventListener('DOMContentLoaded', function () {
    const formInputs = document.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        // Add floating label effect
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.transition = 'all 0.3s ease';
            label.style.position = 'absolute';
            label.style.pointerEvents = 'none';
            label.style.color = '#999';
        }

        // Focus and blur effects
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Real-time validation feedback
        input.addEventListener('input', function () {
            if (this.checkValidity()) {
                this.style.borderColor = '#2ecc71';
            } else {
                this.style.borderColor = '#e74c3c';
            }
        });
    });
});

// Performance Monitoring
document.addEventListener('DOMContentLoaded', function () {
    // Monitor page load performance
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

        // Report slow loading if over 3 seconds
        if (loadTime > 3000) {
            console.warn('Page loading is slower than expected');
        }

        // Core Web Vitals monitoring
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                const lcp = lastEntry.startTime;

                console.log('LCP:', lcp);

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'web_vitals', {
                        event_category: 'Web Vitals',
                        event_label: 'LCP',
                        value: Math.round(lcp),
                        custom_map: { metric_id: 'lcp' }
                    });
                }

                // تسجيل LCP للمراجعة
                const vitals = JSON.parse(localStorage.getItem('harfe_vitals') || '{}');
                vitals.lcp = lcp;
                vitals.timestamp = new Date().toISOString();
                localStorage.setItem('harfe_vitals', JSON.stringify(vitals));

            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay (FID)
            new PerformanceObserver((entryList) => {
                const firstInput = entryList.getEntries()[0];
                const fid = firstInput.processingStart - firstInput.startTime;

                console.log('FID:', fid);

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'web_vitals', {
                        event_category: 'Web Vitals',
                        event_label: 'FID',
                        value: Math.round(fid),
                        custom_map: { metric_id: 'fid' }
                    });
                }

                const vitals = JSON.parse(localStorage.getItem('harfe_vitals') || '{}');
                vitals.fid = fid;
                localStorage.setItem('harfe_vitals', JSON.stringify(vitals));

            }).observe({ entryTypes: ['first-input'] });
        }
    });

    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                scrollTimeout = null;
                // Scroll performance monitoring code here
            }, 16); // ~60fps
        }
    });
});

// Enhanced Accessibility Features
document.addEventListener('DOMContentLoaded', function () {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3498db;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function () {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function () {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('#home');
    if (mainContent) {
        mainContent.id = 'main-content';
    }

    // Enhance keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function () {
            this.style.outline = '3px solid #3498db';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function () {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Error Handling and Fallbacks
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.error);

    // تتبع الأخطاء وإرسالها للتحليل
    try {
        const errorInfo = {
            message: e.error ? e.error.message : e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            stack: e.error ? e.error.stack : 'No stack trace',
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };

        // إرسال تقرير الخطأ (يمكن إضافة خدمة مثل Sentry مستقبلاً)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: errorInfo.message,
                fatal: false
            });
        }

        // حفظ محلياً للمراجعة
        const errors = JSON.parse(localStorage.getItem('harfe_errors') || '[]');
        errors.push(errorInfo);
        if (errors.length > 10) errors.shift(); // الاحتفاظ بآخر 10 أخطاء فقط
        localStorage.setItem('harfe_errors', JSON.stringify(errors));

    } catch (reportError) {
        console.warn('Could not report error:', reportError);
    }
});

// تتبع الأخطاء غير المعالجة في Promise
window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);

    try {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `Promise rejection: ${e.reason}`,
                fatal: false
            });
        }
    } catch (reportError) {
        console.warn('Could not report promise rejection:', reportError);
    }
});

// Fallback for older browsers
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
}

// Touch gesture support for mobile
document.addEventListener('DOMContentLoaded', function () {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            // Could implement swipe navigation here
            console.log(diff > 0 ? 'Swiped left' : 'Swiped right');
        }
    }
});

// Contact Button Functionality - Add to Contacts
document.addEventListener('DOMContentLoaded', function () {
    const openContactsBtn = document.getElementById('openContactsBtn');

    if (openContactsBtn) {
        openContactsBtn.addEventListener('click', function () {
            // Create vCard data
            const vCardData = createVCard();

            // Check if device supports native contact handling
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                // iOS - try to open in Contacts app
                downloadVCard(vCardData, 'حرفي_الكويت_للألومنيوم.vcf');
            } else if (navigator.userAgent.match(/Android/i)) {
                // Android - try multiple approaches
                if (navigator.contacts && navigator.contacts.create) {
                    // Native Contacts API (if available)
                    addContactNative();
                } else {
                    // Fallback to vCard download
                    downloadVCard(vCardData, 'حرفي_الكويت_للألومنيوم.vcf');
                }
            } else {
                // Desktop or other devices - download vCard
                downloadVCard(vCardData, 'حرفي_الكويت_للألومنيوم.vcf');
            }

            // Show success message
            showMessage('تم إنشاء ملف جهة الاتصال. يرجى حفظه في هاتفك.', 'success');
        });
    }
});

// Create vCard format contact
function createVCard() {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:حرفي الكويت للألومنيوم
ORG:حرفي الكويت للألومنيوم
TEL;TYPE=WORK,VOICE:+96555307742
EMAIL;TYPE=WORK:harfekuwait@gmail.com
URL:https://harfekuwait.com
ADR;TYPE=WORK:;;الكويت;;;;الكويت
NOTE:متخصصون في صيانة وتصميم مطابخ الألومنيوم الفاخرة بالكويت. خبرة +15 سنة، ضمان شامل، صيانة مجانية.
CATEGORIES:مطابخ ألومنيوم,صيانة مطابخ,تصميم مطابخ,الكويت
END:VCARD`;

    return vCard;
}

// Download vCard file
function downloadVCard(vCardData, filename) {
    try {
        // Create blob with vCard data
        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });

        // Create download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(link.href);

        return true;
    } catch (error) {
        console.error('Error downloading vCard:', error);
        // Fallback: copy to clipboard
        copyContactToClipboard();
        return false;
    }
}

// Native contact creation (for supported devices)
function addContactNative() {
    try {
        const contact = {
            displayName: 'حرفي الكويت للألومنيوم',
            name: {
                givenName: 'حرفي الكويت',
                familyName: 'للألومنيوم'
            },
            phoneNumbers: [{
                type: 'work',
                value: '+96555307742',
                pref: true
            }],
            emails: [{
                type: 'work',
                value: 'harfekuwait@gmail.com',
                pref: true
            }],
            urls: [{
                type: 'work',
                value: 'https://harfekuwait.com',
                pref: true
            }],
            organizations: [{
                name: 'حرفي الكويت للألومنيوم',
                department: 'مطابخ الألومنيوم',
                title: 'متخصصون في صيانة وتصميم مطابخ الألومنيوم'
            }],
            addresses: [{
                type: 'work',
                country: 'الكويت',
                locality: 'الكويت'
            }],
            note: 'متخصصون في صيانة وتصميم مطابخ الألومنيوم الفاخرة بالكويت. خبرة +15 سنة، ضمان شامل، صيانة مجانية.'
        };

        // Create contact using native API
        navigator.contacts.create(contact,
            function (contact) {
                showMessage('تمت إضافة جهة الاتصال بنجاح!', 'success');
            },
            function (error) {
                console.error('Error creating contact:', error);
                // Fallback to vCard download
                const vCardData = createVCard();
                downloadVCard(vCardData, 'حرفي_الكويت_للألومنيوم.vcf');
            }
        );
    } catch (error) {
        console.error('Native contact creation failed:', error);
        // Fallback to vCard download
        const vCardData = createVCard();
        downloadVCard(vCardData, 'حرفي_الكويت_للألومنيوم.vcf');
    }
}

// Fallback: Copy contact info to clipboard
function copyContactToClipboard() {
    const contactInfo = `حرفي الكويت للألومنيوم
📞 الهاتف: +96555307742
📧 البريد الإلكتروني: harfekuwait@gmail.com
🌐 الموقع: https://harfekuwait.com
📍 الموقع: الكويت

متخصصون في صيانة وتصميم مطابخ الألومنيوم الفاخرة بالكويت
خبرة +15 سنة | ضمان شامل | صيانة مجانية`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contactInfo)
            .then(() => {
                showMessage('تم نسخ معلومات الاتصال. يمكنك لصقها في جهات الاتصال.', 'success');
            })
            .catch(() => {
                showContactInfoModal(contactInfo);
            });
    } else {
        // Fallback for older browsers
        showContactInfoModal(contactInfo);
    }
}

// Show contact info in modal for manual copying
function showContactInfoModal(contactInfo) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="contact-modal-content">
            <div class="contact-modal-header">
                <h3>معلومات الاتصال</h3>
                <button class="contact-modal-close">&times;</button>
            </div>
            <div class="contact-modal-body">
                <textarea readonly class="contact-info-text">${contactInfo}</textarea>
                <button class="btn-copy-contact">نسخ المعلومات</button>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }
        
        .contact-modal-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .contact-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }
        
        .contact-modal-header h3 {
            margin: 0;
            color: var(--primary-dark);
        }
        
        .contact-modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .contact-modal-close:hover {
            color: #333;
        }
        
        .contact-info-text {
            width: 100%;
            height: 200px;
            padding: 1rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-family: inherit;
            font-size: 0.9rem;
            line-height: 1.5;
            resize: none;
            margin-bottom: 1rem;
            direction: rtl;
            text-align: right;
        }
        
        .btn-copy-contact {
            background: linear-gradient(135deg, var(--neutral-medium), var(--secondary-dark));
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        .btn-copy-contact:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = modal.querySelector('.contact-modal-close');
    const copyBtn = modal.querySelector('.btn-copy-contact');
    const textarea = modal.querySelector('.contact-info-text');

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    });

    copyBtn.addEventListener('click', () => {
        textarea.select();
        try {
            document.execCommand('copy');
            showMessage('تم نسخ معلومات الاتصال بنجاح!', 'success');
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        } catch (err) {
            showMessage('يرجى نسخ المعلومات يدوياً', 'error');
        }
    });

    // Auto-select text
    textarea.select();
}

// Enhanced contact button with better UX
document.addEventListener('DOMContentLoaded', function () {
    const contactBtn = document.getElementById('openContactsBtn');

    if (contactBtn) {
        // Add loading state
        contactBtn.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري الإنشاء...</span>';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }
});

// Call Now Button functionality
document.addEventListener('DOMContentLoaded', function () {
    const callNowBtn = document.getElementById('callNowBtn');

    if (callNowBtn) {
        callNowBtn.addEventListener('click', function () {
            openContactOptions();
        });
    }
});

// Contact Options Modal
function openContactOptions() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'contact-options-modal';
    modal.innerHTML = `
        <div class="contact-options-content">
            <div class="contact-options-header">
                <h3>📞 كلمنا الحين</h3>
                <button class="contact-options-close">&times;</button>
            </div>
            <div class="contact-options-body">
                <div class="contact-option" id="directCall">
                    <div class="option-icon">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    <div class="option-content">
                        <h4>اتصال مباشر</h4>
                        <p>اتصل بنا مباشرة</p>
                    </div>
                </div>
                
                <div class="contact-option" id="quickMessage">
                    <div class="option-icon message">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div class="option-content">
                        <h4>رسالة سريعة</h4>
                        <p>أرسل رسالة مباشرة للشركة</p>
                        <span class="phone-number">harfekuwait@gmail.com</span>
                    </div>
                </div>
                
                <div class="contact-option" id="addToContacts">
                    <div class="option-icon contacts">
                        <i class="fas fa-address-book"></i>
                    </div>
                    <div class="option-content">
                        <h4>حفظ الرقم</h4>
                        <p>إضافة للجهات الاتصال</p>
                        <span class="phone-number">حرفي الكويت للألومنيوم</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .contact-options-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        }
        
        .contact-options-content {
            background: linear-gradient(135deg, var(--white), rgba(223, 208, 184, 0.1));
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        .contact-options-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(223, 208, 184, 0.3);
        }
        
        .contact-options-header h3 {
            margin: 0;
            color: var(--primary-dark);
            font-size: 1.5rem;
        }
        
        .contact-options-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .contact-options-close:hover {
            background: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
            transform: scale(1.1);
        }
        
        .contact-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            background: rgba(255, 255, 255, 0.5);
        }
        
        .contact-option:hover {
            background: rgba(223, 208, 184, 0.2);
            border-color: var(--neutral-medium);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .option-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            background: linear-gradient(135deg, var(--neutral-medium), var(--secondary-dark));
        }
        
        .option-icon.message {
            background: linear-gradient(135deg, #f39c12, #e67e22);
        }
        
        .option-icon.contacts {
            background: linear-gradient(135deg, #3498db, #2980b9);
        }
        
        .option-content h4 {
            margin: 0 0 0.25rem 0;
            color: var(--primary-dark);
            font-size: 1.1rem;
        }
        
        .option-content p {
            margin: 0 0 0.25rem 0;
            color: var(--text-medium);
            font-size: 0.9rem;
        }
        
        .phone-number {
            font-weight: bold;
            color: var(--neutral-medium);
            font-size: 1rem;
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = modal.querySelector('.contact-options-close');
    const directCallBtn = modal.querySelector('#directCall');
    const quickMessageBtn = modal.querySelector('#quickMessage');
    const addContactsBtn = modal.querySelector('#addToContacts');

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    });

    // Contact options functionality
    directCallBtn.addEventListener('click', () => {
        // Track conversion for phone calls
        if (typeof gtag_report_conversion === 'function') {
            gtag_report_conversion();
        }
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });

    quickMessageBtn.addEventListener('click', () => {
        // Open the quick contact modal
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
        openQuickContactModal();
    });

    addContactsBtn.addEventListener('click', () => {
        try {
            const vCardData = createVCard();
            if (navigator.userAgent.match(/Android/i) && navigator.contacts && navigator.contacts.create) {
                addContactNative();
            } else {
                downloadVCard(vCardData, 'حرفي_الكويت_للألومنيوم.vcf');
            }
            showMessage('تم إنشاء جهة الاتصال. يرجى حفظها في هاتفك.', 'success');
        } catch (error) {
            console.warn('Add to contacts failed, copying to clipboard instead:', error);
            copyContactToClipboard();
        } finally {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    });
}

// Quick Contact Modal
function openQuickContactModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-contact-modal';
    modal.innerHTML = `
        <div class="quick-contact-content">
            <div class="quick-contact-header">
                <h3>📧 تواصل سريع معانا</h3>
                <button class="quick-contact-close">&times;</button>
            </div>
            <div class="quick-contact-body">
                <form id="quickContactForm" class="quick-contact-form">
                    <div class="form-group">
                        <label for="quickName">الاسم *</label>
                        <input type="text" id="quickName" name="name" required placeholder="اسمك الكريم">
                    </div>
                    <div class="form-group">
                        <label for="quickPhone">رقم الهاتف *</label>
                        <input type="tel" id="quickPhone" name="phone" required placeholder="أدخل رقم هاتفك">
                    </div>
                    <div class="form-group">
                        <label for="quickMessage">رسالتك *</label>
                        <textarea id="quickMessage" name="message" rows="4" required placeholder="اكتب رسالتك هنا..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" id="quickSubmitBtn">
                        <span class="btn-text">إرسال الرسالة</span>
                        <span class="btn-loader" style="display: none;">
                            <i class="fas fa-spinner fa-spin"></i> جاري الإرسال...
                        </span>
                    </button>
                    <div class="form-status" id="quickFormStatus"></div>
                </form>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .quick-contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .quick-contact-content {
            background: linear-gradient(135deg, var(--white), rgba(223, 208, 184, 0.1));
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(50px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .quick-contact-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(223, 208, 184, 0.3);
        }
        
        .quick-contact-header h3 {
            margin: 0;
            color: var(--primary-dark);
            font-size: 1.5rem;
        }
        
        .quick-contact-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .quick-contact-close:hover {
            background: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
            transform: scale(1.1);
        }
        
        .quick-contact-form .form-group {
            margin-bottom: 1rem;
        }
        
        .quick-contact-form label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--primary-dark);
            font-weight: 600;
        }
        
        .quick-contact-form input,
        .quick-contact-form textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid rgba(223, 208, 184, 0.5);
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
            font-family: inherit;
            background: rgba(255, 255, 255, 0.9);
        }
        
        .quick-contact-form input:focus,
        .quick-contact-form textarea:focus {
            outline: none;
            border-color: var(--neutral-medium);
            box-shadow: 0 0 0 3px rgba(148, 137, 121, 0.1);
            transform: translateY(-1px);
        }
        
        .quick-contact-form .btn {
            width: 100%;
            margin-top: 1rem;
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = modal.querySelector('.quick-contact-close');
    const form = modal.querySelector('#quickContactForm');

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    });

    // Form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('Quick contact form submitted!');

        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: 'quick-contact@harfekuwait.com', // Default email for quick contact
            service: 'تواصل سريع',
            message: formData.get('message'),
            privacy: true // Assumed consent for quick contact
        };

        const submitBtn = document.getElementById('quickSubmitBtn');
        const formStatus = document.getElementById('quickFormStatus');

        // Show loading
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';

        try {
            const result = await sendContactEmail(data);

            if (result.success) {
                formStatus.textContent = '🎉 تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                formStatus.className = 'form-status success show';

                // Track Google Ads conversion for quick contact
                if (typeof gtag_report_conversion === 'function') {
                    gtag_report_conversion();
                }

                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(modalStyles);
                }, 2000);
            } else {
                throw new Error('فشل في الإرسال');
            }
        } catch (error) {
            console.error('Quick contact error:', error);
            formStatus.textContent = 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.';
            formStatus.className = 'form-status error show';
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    });

    // Focus first input
    setTimeout(() => {
        modal.querySelector('#quickName').focus();
    }, 300);
}

// Final initialization
document.addEventListener('DOMContentLoaded', function () {
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Load saved reviews
    setTimeout(() => {
        loadSavedReviews();
    }, 1000);

    console.log('🎉 موقع حرفي الكويت للألومنيوم - تم تحميل جميع التحسينات بنجاح!');
});

