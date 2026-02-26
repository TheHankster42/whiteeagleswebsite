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

// Sponsor images and links – SSPK and Polish Canadian only
const sponsors = [
    { file: 'sspk.png', url: 'https://spkcanada.ca/', name: 'Polish Combatants\' Association in Canada (SPK)' },
    { file: 'polish-canadian.png', url: 'https://polishcanadianassociation.com/en/#Welcome', name: 'Polish Canadian Association' }
];

// Load sponsor images
function loadSponsors() {
    const sponsorsGrid = document.getElementById('sponsorsGrid');
    if (!sponsorsGrid) {
        console.error('Sponsors grid element not found');
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
