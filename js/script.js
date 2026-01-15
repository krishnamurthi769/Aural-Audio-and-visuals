
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const isMobile = window.matchMedia('(hover: none)').matches;

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }


    if (!isMobile) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with lag (GSAP for smoothness)
            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.15,
                ease: "power2.out",
                xPercent: -50,
                yPercent: -50
            });
        });

        // Hover effects for cursor
        const hoverables = document.querySelectorAll('a, .magnetic, .service-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // --- Hero Animation (Text Reveal) ---
    const tl = gsap.timeline();

    tl.to('.hero-title .word', {
        y: 0,
        opacity: 1, // Ensure visibility
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
    })
        .from('.hero-subtitle', {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8");

    // Check if music animation exists before adding to timeline
    if (document.querySelector('.music-animation')) {
        tl.from('.music-animation', {
            opacity: 0,
            duration: 1
        }, "-=0.5");
    }


    // --- Services Scroll Animation ---
    const serviceCards = gsap.utils.toArray('.service-card');
    serviceCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // --- Marquee Speed Control on Scroll ---
    // Optional: make marquee move faster when scrolling?

    // --- Events Fade In ---
    gsap.from('.event-card', {
        scrollTrigger: {
            trigger: '.events-grid',
            start: "top 85%"
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    });

    // --- Owner Section Reveal ---
    gsap.from('.owner-card', {
        scrollTrigger: {
            trigger: '#about',
            start: "top 70%"
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});
