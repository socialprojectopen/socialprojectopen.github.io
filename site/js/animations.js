// ===================================
// Анимации
// ===================================

// Typed.js эффект (упрощенная версия)
class TypedText {
    constructor(element, strings, options = {}) {
        this.element = element;
        this.strings = strings;
        this.options = {
            typeSpeed: options.typeSpeed || 50,
            backSpeed: options.backSpeed || 30,
            startDelay: options.startDelay || 500,
            backDelay: options.backDelay || 2000,
            loop: options.loop !== false,
            showCursor: options.showCursor !== false,
            cursorChar: options.cursorChar || '|',
            ...options
        };
        
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.timeout = null;
        
        this.init();
    }
    
    init() {
        if (this.options.showCursor) {
            this.cursor = document.createElement('span');
            this.cursor.className = 'typed-cursor';
            this.cursor.textContent = this.options.cursorChar;
            this.element.parentNode.appendChild(this.cursor);
        }
        
        setTimeout(() => {
            this.type();
        }, this.options.startDelay);
    }
    
    type() {
        const currentString = this.strings[this.currentStringIndex];
        
        if (this.isDeleting) {
            // Удаление
            this.element.textContent = currentString.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
                this.timeout = setTimeout(() => this.type(), this.options.backDelay);
                return;
            }
        } else {
            // Печать
            this.element.textContent = currentString.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentString.length) {
                this.isDeleting = true;
                this.timeout = setTimeout(() => this.type(), this.options.backDelay);
                return;
            }
        }
        
        const speed = this.isDeleting ? this.options.backSpeed : this.options.typeSpeed;
        this.timeout = setTimeout(() => this.type(), speed);
    }
    
    destroy() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.cursor) {
            this.cursor.remove();
        }
    }
}

// Инициализация Typed эффекта
document.addEventListener('DOMContentLoaded', function() {
    const typedElement = document.getElementById('typedText');
    if (typedElement) {
        const typed = new TypedText(typedElement, [
            'в Кыргызстане',
            'по всему миру',
            'с гарантией',
            'надежно и быстро'
        ], {
            typeSpeed: 60,
            backSpeed: 40,
            startDelay: 1000,
            backDelay: 2000,
            loop: true,
            showCursor: true
        });
    }
});

// Анимация счетчиков
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Инициализация счетчиков при появлении в viewport
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.feature-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
                if (target && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    const originalText = entry.target.textContent;
                    const suffix = originalText.replace(/\d/g, '');
                    animateCounter(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = target + suffix;
                    }, 2000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Плавное появление элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(el);
    });
});
