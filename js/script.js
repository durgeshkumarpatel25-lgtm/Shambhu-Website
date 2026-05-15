/* ================= MOBILE MENU ================= */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove Menu on Link Click */
const navLink = document.querySelectorAll('.nav-link');
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ================= CHANGE BACKGROUND HEADER ================= */
const scrollHeader = () => {
    const header = document.getElementById('header');
    if(window.scrollY >= 50) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

/* ================= ACTIVE LINK ON SCROLL ================= */
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const navItem = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        if(navItem) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                navItem.classList.add('active');
            } else {
                navItem.classList.remove('active');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/* ================= ANIMATE ON SCROLL (Intersection Observer) ================= */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

let countersStarted = false;

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
            
            // Start counters if the stats section is in view
            if (entry.target.classList.contains('stat-box') || entry.target.querySelector('.stat-number')) {
                startCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ================= ANIMATED COUNTERS ================= */
function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    });
}

/* ================= FORM SUBMISSION ================= */
const contactForm = document.getElementById('contactForm');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Connecting to WhatsApp...";
        btn.disabled = true;
        
        // Fetch values from form
        const name = document.getElementById('waName').value;
        const number = document.getElementById('waNumber').value;
        const service = document.getElementById('waService').value;
        const message = document.getElementById('waMessage').value;
        
        // Format WhatsApp message
        const waText = `Hello Shambhu Nath Patel,\n\nI have an enquiry from your website:\n*Name:* ${name}\n*Mobile:* ${number}\n*Service:* ${service}\n*Message:* ${message}`;
        const encodedText = encodeURIComponent(waText);
        const waNumber = "919644042398"; // Admin's WhatsApp number
        
        const waURL = `https://wa.me/${waNumber}?text=${encodedText}`;
        
        setTimeout(() => {
            // Open WhatsApp in new tab
            window.open(waURL, '_blank');
            
            btn.innerHTML = "<i class='bx bxl-whatsapp'></i> Sent to WhatsApp!";
            btn.style.background = "#25D366"; // WhatsApp Green
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ""; // Reset to CSS default
                btn.disabled = false;
            }, 3000);
            
        }, 800);
    });
}
