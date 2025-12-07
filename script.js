// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== MODAL FUNCTIONALITY =====
const testDriveModal = document.getElementById('testDriveModal');
const ctaBtn = document.getElementById('ctaBtn');
const exploreCars = document.getElementById('exploreCars');
const contactUs = document.getElementById('contactUs');
const modalClose = document.querySelector('.modal-close');

function openModal() {
    testDriveModal.classList.add('active');
}

function closeModal() {
    testDriveModal.classList.remove('active');
}

if (ctaBtn) ctaBtn.addEventListener('click', openModal);
if (exploreCars) exploreCars.addEventListener('click', () => {
    document.getElementById('vehicles').scrollIntoView({ behavior: 'smooth' });
});
if (contactUs) contactUs.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});
if (modalClose) modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === testDriveModal) {
        closeModal();
    }
});

// ===== FILTER VEHICLES =====
const filterBtns = document.querySelectorAll('.filter-btn');
const vehicleCards = document.querySelectorAll('.vehicle-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter vehicles
        vehicleCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== SMOOTH SCROLL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.vehicle-card, .service-card, .stat').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Simple validation feedback
        alert('Grazie per la tua richiesta! Ti contatteremo presto.');
        contactForm.reset();
    });
}

const modalForm = document.querySelector('.modal-form');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Prenotazione ricevuta! Ti contatteremo per confermare.');
        modalForm.reset();
        closeModal();
    });
}

// ===== BUTTON HOVER EFFECTS =====
const compareButtons = document.querySelectorAll('.btn-compare');
compareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add to comparison (could be expanded with real functionality)
        btn.textContent = 'Aggiunto ✓';
        btn.style.background = '#4ecdc4';
        setTimeout(() => {
            btn.textContent = 'Confronta';
            btn.style.background = '';
        }, 2000);
    });
});

// ===== MOUSE FOLLOW EFFECT ON HERO =====
const hero = document.querySelector('.hero');
const gradientBlur = document.querySelector('.gradient-blur');

if (hero && gradientBlur) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Subtle follow effect
        const moveX = (x - rect.width / 2) * 0.05;
        const moveY = (y - rect.height / 2) * 0.05;
        
        gradientBlur.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== VEHICLE CARD INTERACTIONS =====
const vehicleOverlays = document.querySelectorAll('.vehicle-overlay');
vehicleOverlays.forEach(overlay => {
    overlay.addEventListener('mouseenter', () => {
        overlay.parentElement.parentElement.style.transform = 'scale(1.02)';
    });
    
    overlay.addEventListener('mouseleave', () => {
        overlay.parentElement.parentElement.style.transform = '';
    });
});

// ===== ACTIVE NAVIGATION LINK =====
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== TESTIMONIAL COUNTER =====
const stats = document.querySelectorAll('.stat h3');
stats.forEach(stat => {
    let isAnimated = false;
    
    const animateCounter = () => {
        if (isAnimated) return;
        isAnimated = true;
        
        const finalValue = stat.textContent;
        const numValue = parseInt(finalValue);
        const duration = 2000; // 2 seconds
        const increment = numValue / (duration / 16);
        
        let currentValue = 0;
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numValue) {
                stat.textContent = finalValue;
                clearInterval(counter);
            } else {
                stat.textContent = Math.ceil(currentValue) + '+';
            }
        }, 16);
    };
    
    // Trigger animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounter();
            observer.unobserve(stat);
        }
    });
    
    observer.observe(stat);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== DYNAMIC FORM VALIDATION =====
const inputs = document.querySelectorAll('input[required], textarea[required]');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#ff6b6b';
            } else {
                input.style.borderColor = '#4ecdc4';
            }
        } else if (input.value) {
            input.style.borderColor = '#4ecdc4';
        }
    });
});

// ===== TOOLTIP ON HOVER =====
const specs = document.querySelectorAll('.spec');
specs.forEach(spec => {
    spec.addEventListener('mouseenter', function() {
        this.style.color = '#ff8787';
    });
    spec.addEventListener('mouseleave', function() {
        this.style.color = '';
    });
});

console.log('🚗 Rossi Auto - Sito Concessionaria Caricato!');
