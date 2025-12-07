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

// ===== AUTOSCOUT24 VEHICLES (DYNAMIC) =====
const vehiclesGrid = document.getElementById('vehiclesGrid');
const vehiclesStatus = document.getElementById('vehiclesStatus');
const filterBtns = document.querySelectorAll('.filter-btn');
let allVehicles = [];
let fadeObserver;
let imageObserver;
const autoscoutLinkEl = document.getElementById('autoscoutLink');

const sampleVehicles = [
    {
        title: 'Fiat 500 1.0 Hybrid',
        subtitle: 'Citycar 2022 • 12.300 km',
        price: 13490,
        fuel: 'Benzina/Hybrid',
        power: '70 CV',
        km: '12.300 km',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&auto=format&fit=crop',
        tags: ['used', 'citycar']
    },
    {
        title: 'Jeep Renegade 1.6 Mjt',
        subtitle: 'SUV 2021 • 24.000 km',
        price: 20900,
        fuel: 'Diesel',
        power: '130 CV',
        km: '24.000 km',
        year: '2021',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&auto=format&fit=crop',
        tags: ['used', 'suv']
    },
    {
        title: 'Toyota Yaris Cross',
        subtitle: 'Hybrid 2024 • KM0',
        price: 27900,
        fuel: 'Hybrid',
        power: '116 CV',
        km: 'KM0',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format&fit=crop',
        tags: ['new', 'suv']
    },
    {
        title: 'Audi A3 Sportback',
        subtitle: '1.5 TFSI 2023 • 8.500 km',
        price: 32900,
        fuel: 'Benzina',
        power: '150 CV',
        km: '8.500 km',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=950&auto=format&fit=crop',
        tags: ['used', 'sedan']
    }
];

const formatPrice = (value) => {
    if (!value && value !== 0) return 'Prezzo su richiesta';
    return `€${Number(value).toLocaleString('it-IT')}`;
};

const badgeForTags = (tags = []) => {
    if (tags.includes('new')) return { text: 'Nuovo', className: '' };
    if (tags.includes('km0')) return { text: 'KM0', className: '' };
    return { text: 'Usato', className: 'used-badge' };
};

const renderVehicles = (list) => {
    if (!vehiclesGrid) return;
    vehiclesGrid.innerHTML = '';

    list.forEach(vehicle => {
        const badge = badgeForTags(vehicle.tags);
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.dataset.category = (vehicle.tags || []).join(' ');

        card.innerHTML = `
            <div class="vehicle-image">
                <img data-src="${vehicle.image}" alt="${vehicle.title}">
                <div class="vehicle-badge ${badge.className}">${badge.text}</div>
                <div class="vehicle-overlay">
                    <button class="btn-overlay">Scopri di più</button>
                </div>
            </div>
            <div class="vehicle-info">
                <h3>${vehicle.title}</h3>
                <p class="vehicle-type">${vehicle.subtitle || ''}</p>
                <div class="vehicle-specs">
                    <span class="spec">⛽ ${vehicle.fuel || ''}</span>
                    <span class="spec">⚡ ${vehicle.power || ''}</span>
                    <span class="spec">🛣️ ${vehicle.km || ''}</span>
                </div>
                <div class="vehicle-price">
                    <span class="price">${formatPrice(vehicle.price)}</span>
                    <button class="btn-compare">Confronta</button>
                </div>
            </div>
        `;

        vehiclesGrid.appendChild(card);

        if (fadeObserver) {
            card.classList.add('fade-in');
            fadeObserver.observe(card);
        }

        const img = card.querySelector('img');
        if (imageObserver && img) imageObserver.observe(img);
    });

    attachVehicleInteractions();
};

const attachVehicleInteractions = () => {
    const compareButtons = vehiclesGrid.querySelectorAll('.btn-compare');
    compareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.textContent = 'Aggiunto ✓';
            btn.style.background = '#4ecdc4';
            setTimeout(() => {
                btn.textContent = 'Confronta';
                btn.style.background = '';
            }, 2000);
        });
    });

    const overlays = vehiclesGrid.querySelectorAll('.vehicle-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', () => {
            overlay.parentElement.parentElement.style.transform = 'scale(1.02)';
        });
        overlay.addEventListener('mouseleave', () => {
            overlay.parentElement.parentElement.style.transform = '';
        });
    });
};

const applyFilter = (filterValue) => {
    if (!allVehicles.length) return;
    const filtered = filterValue === 'all' ? allVehicles : allVehicles.filter(v => (v.tags || []).includes(filterValue));
    renderVehicles(filtered);
};

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        applyFilter(filterValue);
    });
});

const loadVehicles = async () => {
    if (!vehiclesGrid) return;
    const feedUrl = vehiclesGrid.dataset.feedUrl;
    const autoscoutUrl = vehiclesGrid.dataset.autoscoutUrl;
    if (autoscoutLinkEl && autoscoutUrl) {
        autoscoutLinkEl.href = autoscoutUrl;
    }

    const setStatus = (msg) => {
        if (vehiclesStatus) vehiclesStatus.textContent = msg;
    };

    try {
        setStatus('Caricamento veicoli da AutoScout24...');
        if (feedUrl) {
            const response = await fetch(feedUrl);
            if (!response.ok) throw new Error('Feed non disponibile');
            const data = await response.json();
            // Atteso formato array di veicoli; adattare se necessario.
            allVehicles = Array.isArray(data) ? data : (data.vehicles || []);
            if (!allVehicles.length) throw new Error('Nessun veicolo nel feed');
            setStatus(`${allVehicles.length} veicoli caricati dal feed.`);
        } else {
            allVehicles = sampleVehicles;
            setStatus('Feed non configurato: mostriamo esempi. Imposta data-feed-url sul contenitore.');
        }
    } catch (err) {
        console.error('AutoScout24 feed error:', err);
        allVehicles = sampleVehicles;
        setStatus('Feed non raggiungibile: mostriamo esempi.');
    }

    applyFilter('all');
};

// ===== SMOOTH SCROLL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .stat').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
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
    imageObserver = new IntersectionObserver((entries, observer) => {
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
    loadVehicles();
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

console.log('🚗 Codecar di Seregno - sito caricato.');
console.log('🚗 Veicoli: caricamento dinamico attivo.');
