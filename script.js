// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2026-06-06T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Enhanced scroll observer for smooth animations
const smoothObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
});

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(44, 24, 16, 0.2)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleMove ${15 + Math.random() * 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add particle move animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleMove {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Color Slider
function initColorSlider() {
    const slider = document.getElementById('colorSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const items = slider.querySelectorAll('.collage-item');
    let currentIndex = 0;
    
    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateSlider() {
        const translateX = -currentIndex * 100;
        slider.style.transform = `translateX(${translateX}%)`;
        slider.style.transition = 'transform 0.5s ease';
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = items.length - 1;
        if (currentIndex >= items.length) currentIndex = 0;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    // Auto-play every 5 seconds
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Pause on hover/touch
    const sliderWrapper = slider.closest('.collage-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        sliderWrapper.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoPlayInterval);
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Observe detail cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize color slider
    initColorSlider();
    
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Create floating particles
    createFloatingParticles();

    // Observe detail cards
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe quote section
    const quote = document.querySelector('.quote');
    if (quote) {
        smoothObserver.observe(quote);
    }
    
    // Observe RSVP section
    const rsvpSection = document.querySelector('.rsvp-section');
    if (rsvpSection) {
        smoothObserver.observe(rsvpSection);
    }
    
    // Observe invitation text
    const invitationText = document.querySelector('.invitation-text');
    if (invitationText) {
        smoothObserver.observe(invitationText);
    }
    
    // Observe dresscode section
    const dresscodeSection = document.querySelector('.dresscode-section');
    if (dresscodeSection) {
        smoothObserver.observe(dresscodeSection);
    }
    
    // Observe gifts section
    const giftsSection = document.querySelector('.gifts-section');
    if (giftsSection) {
        smoothObserver.observe(giftsSection);
    }
    
    // Observe contact section
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        smoothObserver.observe(contactSection);
    }
    
    // Observe children section
    const childrenSection = document.querySelector('.children-section');
    if (childrenSection) {
        smoothObserver.observe(childrenSection);
    }
    
    // Observe footer
    const footer = document.querySelector('.footer');
    if (footer) {
        smoothObserver.observe(footer);
    }

    // Parallax effect on scroll for background elements (only on desktop)
    let ticking = false;
    function updateParallax() {
        if (window.innerWidth > 768) {
            const currentScroll = window.pageYOffset;
            const orbs = document.querySelectorAll('.gradient-orb');
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                orb.style.transform = `translateY(${currentScroll * speed}px)`;
            });
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Touch support for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    // Add sparkle effect to names on hover
    const names = document.querySelectorAll('.bride-name, .groom-name');
    names.forEach(name => {
        name.addEventListener('mouseenter', () => {
            name.style.transition = 'all 0.3s ease';
            name.style.transform = 'scale(1.1)';
        });
        
        name.addEventListener('mouseleave', () => {
            name.style.transform = 'scale(1)';
        });
    });
});

// RSVP Modal
const rsvpModal = document.getElementById('rsvpModal');
const rsvpButton = document.querySelector('.rsvp-button');
const closeModal = document.getElementById('closeModal');
const rsvpForm = document.getElementById('rsvpForm');
const addGuestBtn = document.getElementById('addGuestBtn');
const guestsContainer = document.getElementById('guestsContainer');
let guestCount = 1;

// Open modal
if (rsvpButton) {
    rsvpButton.addEventListener('click', () => {
        rsvpModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        rsvpModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal on overlay click
if (rsvpModal) {
    rsvpModal.addEventListener('click', (e) => {
        if (e.target === rsvpModal) {
            rsvpModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Add guest
if (addGuestBtn) {
    addGuestBtn.addEventListener('click', () => {
        guestCount++;
        const guestItem = document.createElement('div');
        guestItem.className = 'guest-item';
        guestItem.innerHTML = `
            <button type="button" class="remove-guest-btn" onclick="this.parentElement.remove()">&times;</button>
            <h3>Дополнительный гость ${guestCount}</h3>
            <div class="form-group">
                <label>Имя</label>
                <input type="text" name="guestFirstName" class="guest-input">
            </div>
            <div class="form-group">
                <label>Фамилия</label>
                <input type="text" name="guestLastName" class="guest-input">
            </div>
        `;
        guestsContainer.appendChild(guestItem);
    });
}

// Form submission to Google Sheets
// 
// ИНСТРУКЦИЯ ПО НАСТРОЙКЕ GOOGLE SHEETS:
// 1. Создайте новую Google Таблицу (https://sheets.google.com)
// 2. Создайте заголовки в первой строке: Имя | Фамилия | Алкоголь | Дата
// 3. В меню таблицы выберите: Расширения -> Apps Script
// 4. Удалите весь код по умолчанию и вставьте следующий:
//
// function doPost(e) {
//   try {
//     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     const data = JSON.parse(e.postData.contents);
//     
//     // Добавляем основного гостя
//     sheet.appendRow([
//       data.firstName || '',
//       data.lastName || '',
//       data.alcohol || '',
//       new Date()
//     ]);
//     
//     // Добавляем дополнительных гостей
//     if (data.guests && data.guests.length > 0) {
//       data.guests.forEach(guest => {
//         if (guest.firstName || guest.lastName) {
//           sheet.appendRow([
//             guest.firstName || '',
//             guest.lastName || '',
//             data.alcohol || '',
//             new Date()
//           ]);
//         }
//       });
//     }
//     
//     return ContentService.createTextOutput(JSON.stringify({success: true}))
//       .setMimeType(ContentService.MimeType.JSON);
//   } catch (error) {
//     return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
// }
//
// 5. Сохраните проект (Ctrl+S или Cmd+S)
// 6. Нажмите "Развернуть" -> "Новое развертывание"
// 7. Выберите тип: "Веб-приложение"
// 8. Настройки:
//    - Описание: любое
//    - Выполнять от имени: Меня
//    - У кого есть доступ: Все
// 9. Нажмите "Развернуть" и скопируйте URL веб-приложения
// 10. Вставьте скопированный URL ниже вместо 'YOUR_GOOGLE_SCRIPT_URL'
//
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyaxxTSGfZRiomgBS_LzCtm-95oLXHvWPJZH1fd6aWPmI6258iU9OXNjS_SMp9NllFkSA/exec';

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = rsvpForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            alcohol: document.getElementById('alcohol').value,
            guests: []
        };
        
        // Collect guest data
        const guestItems = guestsContainer.querySelectorAll('.guest-item');
        guestItems.forEach(item => {
            const firstName = item.querySelector('input[name="guestFirstName"]').value;
            const lastName = item.querySelector('input[name="guestLastName"]').value;
            if (firstName || lastName) {
                formData.guests.push({ firstName, lastName });
            }
        });
        
        try {
            // Send to Google Sheets via Google Apps Script
            // ВАЖНО: Сначала настройте Google Apps Script (инструкции в комментариях выше)
            // и замените 'YOUR_GOOGLE_SCRIPT_URL' на URL вашего веб-приложения
            if (GOOGLE_SCRIPT_URL === '') {
                alert('Пожалуйста, настройте Google Sheets интеграцию. Смотрите инструкции в коде.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Show success message
            alert('Спасибо! Ваше подтверждение получено.');
            rsvpForm.reset();
            rsvpModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset guest container
            guestsContainer.innerHTML = `
                <div class="guest-item">
                    <h3>Дополнительный гость</h3>
                    <div class="form-group">
                        <label>Имя</label>
                        <input type="text" name="guestFirstName" class="guest-input">
                    </div>
                    <div class="form-group">
                        <label>Фамилия</label>
                        <input type="text" name="guestLastName" class="guest-input">
                    </div>
                </div>
            `;
            guestCount = 1;
            
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Add remove button style
const removeGuestStyle = document.createElement('style');
removeGuestStyle.textContent = `
    .remove-guest-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--chocolate-black);
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    .remove-guest-btn:hover {
        background: rgba(44, 24, 16, 0.1);
    }
    .guest-item {
        position: relative;
    }
`;
document.head.appendChild(removeGuestStyle);


