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
const vehicleModal = document.getElementById('vehicleModal');
const vehicleModalClose = document.getElementById('vehicleModalClose');
const vehicleModalImage = document.getElementById('vehicleModalImage');
const vehicleModalTitle = document.getElementById('vehicleModalTitle');
const vehicleModalSubtitle = document.getElementById('vehicleModalSubtitle');
const vehicleModalSpecs = document.getElementById('vehicleModalSpecs');
const vehicleModalPrice = document.getElementById('vehicleModalPrice');
const vehicleModalCta = document.getElementById('vehicleModalCta');

const formatPrice = (value) => {
    if (!value && value !== 0) return 'Prezzo su richiesta';
    return `€${Number(value).toLocaleString('it-IT')}`;
};

function openModal() {
    testDriveModal.classList.add('active');
}

function closeModal() {
    testDriveModal.classList.remove('active');
}

const closeVehicleModal = () => {
    if (vehicleModal) vehicleModal.classList.remove('active');
};

const openVehicleModal = (vehicle = {}) => {
    if (!vehicleModal) return;
    const gallery = Array.isArray(vehicle.gallery) ? vehicle.gallery : (vehicle.image ? [vehicle.image] : []);
    const cover = gallery.find(Boolean) || '';

    if (vehicleModalImage) vehicleModalImage.src = cover;
    if (vehicleModalTitle) vehicleModalTitle.textContent = vehicle.title || 'Veicolo Codecar';
    if (vehicleModalSubtitle) vehicleModalSubtitle.textContent = vehicle.subtitle || '';

    if (vehicleModalSpecs) {
        const specs = [];
        if (vehicle.fuel) specs.push(`Carburante: ${vehicle.fuel}`);
        if (vehicle.power) specs.push(`Potenza: ${vehicle.power}`);
        if (vehicle.km) specs.push(`Chilometraggio: ${vehicle.km}`);
        if (vehicle.year) specs.push(`Anno: ${vehicle.year}`);
        vehicleModalSpecs.innerHTML = specs.map(s => `<span class="spec-chip">${s}</span>`).join('');
    }

    if (vehicleModalPrice) vehicleModalPrice.textContent = formatPrice(vehicle.price);

    if (vehicleModalCta) {
        if (vehicle.link) {
            vehicleModalCta.href = vehicle.link;
            vehicleModalCta.style.display = 'inline-flex';
        } else {
            vehicleModalCta.style.display = 'none';
        }
    }

    vehicleModal.classList.add('active');
};

if (ctaBtn) ctaBtn.addEventListener('click', openModal);
if (exploreCars) exploreCars.addEventListener('click', () => {
    document.getElementById('vehicles').scrollIntoView({ behavior: 'smooth' });
});
const exploreCarsAbout = document.getElementById('exploreCarsAbout');
if (exploreCarsAbout) exploreCarsAbout.addEventListener('click', () => {
    document.getElementById('vehicles').scrollIntoView({ behavior: 'smooth' });
});
if (contactUs) contactUs.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// smooth scroll for internal nav links
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// make any element with data-href scroll to its target (cards, buttons)
document.querySelectorAll('[data-href]').forEach(el => {
    const href = el.getAttribute('data-href');
    if (!href) return;
    const go = () => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
    el.addEventListener('click', go);
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            go();
        }
    });
});
if (modalClose) modalClose.addEventListener('click', closeModal);
if (vehicleModalClose) vehicleModalClose.addEventListener('click', closeVehicleModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === testDriveModal) {
        closeModal();
    }
    if (e.target === vehicleModal) {
        closeVehicleModal();
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

const badgeForTags = (tags = []) => {
    if (tags.includes('new')) return { text: 'Nuovo', className: '' };
    if (tags.includes('km0')) return { text: 'KM0', className: '' };
    return { text: 'Usato', className: 'used-badge' };
};

const mapAutoscoutListing = (listing = {}) => {
    const vehicle = listing.vehicle || {};
    const gallery = Array.isArray(listing.images) ? listing.images : [];
    const primaryImage = gallery.find(Boolean) || '';
    const price = listing.prices?.public?.priceRaw ?? listing.prices?.dealer?.priceRaw ?? listing.prices?.priceRaw ?? null;
    const body = vehicle.bodyType?.formatted || vehicle.category?.formatted || '';
    const year = vehicle.firstRegistrationDate?.formatted || vehicle.firstRegistrationDate || '';
    const mileage = vehicle.mileageInKm?.formatted || vehicle.mileage?.formatted || '';
    const power = vehicle.powerInHp?.formatted || vehicle.power?.formatted || '';
    const fuel = vehicle.fuelCategory?.formatted || vehicle.fuelType?.formatted || '';

    const tags = [];
    const condition = (vehicle.offerType?.formatted || vehicle.condition?.formatted || listing.offerType || '').toLowerCase();
    const bodyKey = body.toLowerCase();

    if (condition.includes('km')) {
        tags.push('km0', 'new');
    } else if (condition.includes('nuovo') || condition.includes('new')) {
        tags.push('new');
    } else {
        tags.push('used');
    }

    if (bodyKey.includes('suv')) tags.push('suv');
    if (bodyKey.includes('cabrio')) tags.push('cabrio');
    if (bodyKey.includes('city') || bodyKey.includes('utilitaria')) tags.push('citycar');
    if (bodyKey.includes('berlina')) tags.push('sedan');

    const subtitleParts = [body || null, year || null, mileage || null].filter(Boolean);
    const subtitle = subtitleParts.join(' • ');
    const link = listing.url ? `https://www.autoscout24.it${listing.url}` : '';
    const title = `${vehicle.make || ''} ${vehicle.model || ''} ${vehicle.modelVersionInput || vehicle.modelVersion || ''}`.replace(/\s+/g, ' ').trim();

    return {
        id: listing.id?.toString() || listing.listingId?.toString() || title,
        title: title || 'Veicolo Codecar',
        subtitle,
        price,
        fuel,
        power,
        km: mileage,
        year: year || '',
        image: primaryImage,
        gallery,
        tags,
        link
    };
};

const normalizeAutoscoutUrl = (url = '') => {
    if (!url) return '';
    const [base, hash] = url.split('#');
    if (hash && !hash.startsWith('http')) {
        return `${base}?${hash}`;
    }
    return base;
};

const fetchAutoscoutListings = async (autoscoutUrl) => {
    if (!autoscoutUrl) throw new Error('URL AutoScout24 non fornita');
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(autoscoutUrl)}`;

    const fetchPage = async () => {
        const response = await fetch(proxyUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
            }
        });
        if (!response.ok) throw new Error('Richiesta AutoScout24 fallita');
        return response.text();
    };

    const html = await fetchPage();
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) throw new Error('Dati AutoScout24 non trovati');

    const parsed = JSON.parse(match[1]);
    const listings = parsed?.props?.pageProps?.listings || parsed?.props?.pageProps?.searchResults?.listings || [];
    if (!Array.isArray(listings) || !listings.length) throw new Error('Nessun veicolo trovato su AutoScout24');

    return listings.map(mapAutoscoutListing).filter(Boolean);
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

        const overlayBtn = card.querySelector('.btn-overlay');
        if (overlayBtn) {
            overlayBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openVehicleModal(vehicle);
            });
        }

        const imageWrapper = card.querySelector('.vehicle-image');
        if (imageWrapper) {
            imageWrapper.addEventListener('click', () => openVehicleModal(vehicle));
        }

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
    const autoscoutUrl = normalizeAutoscoutUrl(vehiclesGrid.dataset.autoscoutUrl || '');
    if (autoscoutLinkEl && autoscoutUrl) {
        autoscoutLinkEl.href = autoscoutUrl;
    }

    const setStatus = (msg) => {
        if (vehiclesStatus) vehiclesStatus.textContent = msg;
    };

    try {
        setStatus('Caricamento veicoli dal feed locale...');
        if (!feedUrl) throw new Error('Feed non configurato');

        const response = await fetch(feedUrl);
        if (!response.ok) throw new Error('Feed non disponibile');
        const data = await response.json();
        allVehicles = Array.isArray(data) ? data : (data.vehicles || []);
        if (!allVehicles.length) throw new Error('Nessun veicolo nel feed');
        setStatus(`${allVehicles.length} veicoli caricati dal feed.`);
    } catch (err) {
        console.error('AutoScout24 feed error:', err);

        if (autoscoutUrl) {
            try {
                setStatus('Feed non disponibile: recupero dati live da AutoScout24...');
                allVehicles = await fetchAutoscoutListings(autoscoutUrl);
                setStatus(`${allVehicles.length} veicoli caricati da AutoScout24.`);
            } catch (autoErr) {
                console.error('AutoScout24 live error:', autoErr);
                allVehicles = sampleVehicles;
                setStatus('AutoScout24 non raggiungibile: mostriamo esempi.');
            }
        } else {
            allVehicles = sampleVehicles;
            setStatus('URL AutoScout24 mancante: mostriamo esempi.');
        }
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

// ===== MOTORSPORT COUNTERS =====
const msCounters = document.querySelectorAll('.ms-counter');
if (msCounters.length) {
    const animateMsCounter = (el) => {
        const target = parseInt(el.dataset.target || '0', 10);
        const valueEl = el.querySelector('.ms-counter-value');
        if (!valueEl) return;
        let current = 0;
        const duration = 1600;
        const increment = Math.max(1, Math.ceil(target / (duration / 16)));
        const tick = () => {
            current += increment;
            if (current >= target) {
                valueEl.textContent = target;
            } else {
                valueEl.textContent = current;
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    };

    const msObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMsCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    msCounters.forEach(counter => msObserver.observe(counter));
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeVehicleModal();
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
