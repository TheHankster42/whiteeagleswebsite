// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('open');
    });
});

// Rules dropdown (hover on desktop, click/tap on mobile)
const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

dropdownToggles.forEach(toggle => {
    const item = toggle.closest('.nav-item-has-dropdown');
    if (!item) return;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.nav-item-has-dropdown.open').forEach(openItem => {
            if (openItem !== item) openItem.classList.remove('open');
        });

        if (isOpen) {
            item.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.nav-item-has-dropdown.open').forEach(item => {
        const toggle = item.querySelector('.nav-dropdown-toggle');
        item.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Sponsors are loaded from site-config.js (edit that file to add/remove sponsors).
const sponsors = (window.SITE_CONFIG && window.SITE_CONFIG.sponsors) || [];

// Load sponsor images
function loadSponsors() {
    const sponsorsGrid = document.getElementById('sponsorsGrid');
    if (!sponsorsGrid) {
        return;
    }

    sponsors.forEach(function (sponsor) {
        const sponsorItem = document.createElement('div');
        sponsorItem.className = 'sponsor-item';

        const link = document.createElement('a');
        link.href = sponsor.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = sponsor.name;

        const img = document.createElement('img');
        img.src = 'sponsors/' + sponsor.file;
        img.alt = sponsor.name;
        img.loading = 'lazy';

        img.onerror = function () {
            console.error('Failed to load sponsor image: sponsors/' + sponsor.file);
            sponsorItem.remove();
        };

        link.appendChild(img);
        sponsorItem.appendChild(link);
        sponsorsGrid.appendChild(sponsorItem);
    });
}

// Update program birth years (U5–U10: born 2016–2021)
function updateProgramYears() {
    const birthYearsLabel = '2016 – 2021';
    const outdoorBirthEl = document.getElementById('outdoor-birth-years');
    const outdoorFallBirthEl = document.getElementById('outdoor-fall-birth-years');
    const infoProgramsBirth = document.getElementById('info-programs-birth-years');
    if (outdoorBirthEl) outdoorBirthEl.textContent = birthYearsLabel;
    if (outdoorFallBirthEl) outdoorFallBirthEl.textContent = birthYearsLabel;
    if (infoProgramsBirth) infoProgramsBirth.textContent = birthYearsLabel;
}

// Update footer copyright: "© 2025" or "© 2025 – 2026" (year made to current year)
function updateFooter() {
    var el = document.getElementById('footer-copy');
    if (!el) return;
    var yearMade = (window.SITE_CONFIG && window.SITE_CONFIG.yearMade !== undefined)
        ? window.SITE_CONFIG.yearMade
        : new Date().getFullYear();
    var current = new Date().getFullYear();
    var range = yearMade === current ? String(current) : yearMade + ' – ' + current;
    el.textContent = '© ' + range + ' White Eagles. All rights reserved.';
}

// Load sponsors and update program years when page loads
function init() {
    // Only attempt to load sponsors on pages that have the sponsors grid (home page)
    if (document.getElementById('sponsorsGrid')) {
        loadSponsors();
    }
    updateProgramYears();
    updateFooter();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
