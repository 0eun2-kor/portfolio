// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', 
        body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Scroll animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Animate skill progress bars
document.querySelectorAll('.progress-bar').forEach(bar => {
    gsap.from(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        width: 0,
        duration: 2,
        ease: 'power2.out'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });
}

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.insertBefore(mobileMenuButton, navLinks);
    
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add responsive styles for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: var(--bg-color);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .mobile-menu-button {
            display: block;
            background: none;
            border: none;
            color: var(--text-color);
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-button {
            display: none;
        }
    }
`;
document.head.appendChild(style); 