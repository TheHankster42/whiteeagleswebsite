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

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Sponsor images list - update this array when you add new sponsor images
const sponsorFiles = [
    'al-azhar.png',
    'Angiel-Interiors.png',
    'construction.png',
    'polish-canadian.png',
    'sspk.png',
    'tax.png'
];

// Load sponsor images
function loadSponsors() {
    const sponsorsGrid = document.getElementById('sponsorsGrid');
    if (!sponsorsGrid) {
        console.error('Sponsors grid element not found');
        return;
    }

    sponsorFiles.forEach(filename => {
        const sponsorItem = document.createElement('div');
        sponsorItem.className = 'sponsor-item';
        
        const img = document.createElement('img');
        img.src = `sponsors/${filename}`;
        img.alt = filename.replace(/\.[^/.]+$/, ''); // Remove file extension for alt text
        img.loading = 'lazy';
        
        // Handle image load errors
        img.onerror = function() {
            console.error(`Failed to load sponsor image: sponsors/${filename}`);
            sponsorItem.remove();
        };
        
        sponsorItem.appendChild(img);
        sponsorsGrid.appendChild(sponsorItem);
    });
}

// Update program season years and birth years (U5–U10: ages 5–10)
function updateProgramYears() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const indoorSeasonLabel = `${currentYear}/${String(nextYear).slice(-2)}`;

    // U10 = 10 years old, U6 = 6 years old (birth year = current year - age)
    const birthYearU10 = currentYear - 10;
    const birthYearU6 = currentYear - 6;
    const birthYearsLabel = `BORN ${birthYearU10} - ${birthYearU6}`;

    const indoorYearEl = document.getElementById('indoor-season-year');
    const indoorBirthEl = document.getElementById('indoor-birth-years');
    const outdoorYearEl = document.getElementById('outdoor-season-year');
    const outdoorBirthEl = document.getElementById('outdoor-birth-years');

    if (indoorYearEl) indoorYearEl.textContent = indoorSeasonLabel;
    if (indoorBirthEl) indoorBirthEl.textContent = birthYearsLabel;
    if (outdoorYearEl) outdoorYearEl.textContent = String(currentYear);
    if (outdoorBirthEl) outdoorBirthEl.textContent = birthYearsLabel;

    // Home page: Our Programs info block – same U6–U10 birth year range
    const infoProgramsBirth = document.getElementById('info-programs-birth-years');
    if (infoProgramsBirth) infoProgramsBirth.textContent = `${birthYearU10} – ${birthYearU6}`;

    // Programs page: fill season and birth year in each of the 6 matrix cards
    document.querySelectorAll('.programs-matrix .program-card').forEach(card => {
        const seasonType = card.getAttribute('data-season');
        const age = parseInt(card.getAttribute('data-age'), 10);
        const seasonSpan = card.querySelector('.program-season');
        const birthSpan = card.querySelector('.program-birth');
        if (seasonSpan) seasonSpan.textContent = seasonType === 'indoor' ? indoorSeasonLabel : String(currentYear);
        if (birthSpan) birthSpan.textContent = String(currentYear - age);
    });
}

// Load sponsors and update program years when page loads
function init() {
    loadSponsors();
    updateProgramYears();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
