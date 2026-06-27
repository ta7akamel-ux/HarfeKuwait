# إعدادات الأمان لموقع حرفي الكويت

## Content Security Policy (CSP)

### للإضافة في رأس الصفحة أو ملف .htaccess:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://www.googletagmanager.com 
    https://cdn.jsdelivr.net 
    https://unpkg.com 
    https://cdnjs.cloudflare.com
    https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' 
    https://fonts.googleapis.com 
    https://cdnjs.cloudflare.com 
    https://unpkg.com;
  font-src 'self' 
    https://fonts.gstatic.com 
    https://cdnjs.cloudflare.com;
  img-src 'self' data: blob: 
    https://www.google-analytics.com;
  connect-src 'self' 
    https://formsubmit.co 
    https://formspree.io 
    https://api.emailjs.com
    https://www.google-analytics.com;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self' 
    https://formsubmit.co 
    https://formspree.io;
">
```

### أو في ملف .htaccess:

```apache
<IfModule mod_headers.c>
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https://www.google-analytics.com; connect-src 'self' https://formsubmit.co https://formspree.io https://api.emailjs.com https://www.google-analytics.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co https://formspree.io;"
</IfModule>
```

## الحماية الإضافية

### Headers أخرى للأمان:

```apache
<IfModule mod_headers.c>
    # منع clickjacking
    Header always set X-Frame-Options "DENY"
    
    # منع MIME type sniffing
    Header always set X-Content-Type-Options "nosniff"
    
    # تفعيل XSS protection
    Header always set X-XSS-Protection "1; mode=block"
    
    # إجبار HTTPS (إذا كان متوفراً)
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # التحكم في المراجع
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # منع التحميل من مصادر غير موثوقة
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

## تحسينات الأداء

### ضغط الملفات:

```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### التخزين المؤقت:

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/icon "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

## التحقق من الأمان

### أدوات للاختبار:
1. **Mozilla Observatory**: https://observatory.mozilla.org/
2. **Security Headers**: https://securityheaders.com/
3. **CSP Evaluator**: https://csp-evaluator.withgoogle.com/

### اختبار CSP:
أضف `Content-Security-Policy-Report-Only` أولاً للاختبار قبل التطبيق الكامل.

## ملاحظات مهمة

⚠️ **قبل التطبيق:**
1. اختبر جميع وظائف الموقع
2. تأكد من عمل EmailJS وFormspree
3. اختبر تحميل الخطوط والأيقونات
4. تحقق من عمل Google Analytics

✅ **فوائد التطبيق:**
- حماية من XSS attacks
- منع clickjacking
- حماية من code injection
- تحسين SEO وثقة المستخدمين
- امتثال لمعايير الأمان الحديثة
