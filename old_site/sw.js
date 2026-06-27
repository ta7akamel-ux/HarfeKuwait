// Service Worker for Aluminum Kitchen MVP
// Version 1.0.0

const CACHE_NAME = 'aluminum-kitchen-v1.2.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/emailjs-config.js',
    '/manifest.json',
    '/safari-pinned-tab.svg',
    // Favicon files
    '/favicon.ico',
    '/assets/favicon-32x32.png',
    '/assets/favicon-16x16.png',
    // Background images
    '/assets/background_1.png',
    '/assets/background_2.png',
    '/assets/background_3.png',
    '/assets/background_4.png',
    '/assets/background_5.png',
    '/assets/background_6.png',
    '/assets/background_7.png',
    '/assets/background_8.png',
    // Critical gallery images
    '/assets/gallery/photo_2025-08-16_07-54-22.jpg',
    '/assets/gallery/photo_2025-08-16_07-55-01.jpg',
    '/assets/gallery/photo_2025-08-16_07-55-06.jpg',
    '/assets/gallery/photo_2025-08-16_07-55-11.jpg',
    '/assets/gallery/photo_2025-08-16_07-55-17.jpg',
    '/assets/gallery/5845b3fe88ef0a1bbea9b2ebda32405f.jpg',
    '/assets/gallery/00379c0d8e7c6cb4409e8938f6f7fa6e.jpg',
    // External resources
    'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Cairo:wght@300;400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching files');
                // Cache files one by one to handle failures gracefully
                return Promise.allSettled(
                    urlsToCache.map(url => 
                        cache.add(url).catch(error => {
                            console.warn(`Failed to cache ${url}:`, error);
                            return null;
                        })
                    )
                );
            })
            .then(function(results) {
                const failed = results.filter(result => result.status === 'rejected');
                if (failed.length > 0) {
                    console.warn(`Service Worker: ${failed.length} files failed to cache`);
                }
                console.log('Service Worker: Cache installation completed');
                self.skipWaiting(); // Force activate immediately
            })
            .catch(function(error) {
                console.error('Service Worker: Cache installation failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                
                // Clone the request because it's a stream
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(function(response) {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it's a stream
                    const responseToCache = response.clone();
                    
                    // Add to cache for future use
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(function() {
                    // Fallback for offline scenarios
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Background sync for form submissions (future enhancement)
self.addEventListener('sync', function(event) {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

function syncContactForm() {
    // Implementation for syncing form data when back online
    return new Promise(function(resolve) {
        // Sync logic here
        resolve();
    });
}

// Push notifications (future enhancement)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'رسالة جديدة من حرفي الكويت',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'عرض الموقع',
                icon: '/favicon.ico'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/favicon.ico'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('حرفي الكويت للألومنيوم', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('Service Worker: Aluminum Kitchen MVP loaded successfully');

