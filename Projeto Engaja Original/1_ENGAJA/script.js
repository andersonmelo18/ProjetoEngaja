/* =============================================================
   0. HELPERS
   ============================================================= */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =============================================================
   1. MENU MOBILE
   ============================================================= */
const Menu = (() => {
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    const overlay = $('#overlay');
    const body = document.body;

    if (!hamburger || !navMenu || !overlay) return;

    const open = () => {
        navMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    };

    const close = () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    };

    const toggle = () => {
        navMenu.classList.contains('active') ? close() : open();
    };

    hamburger.addEventListener('click', toggle);
    overlay.addEventListener('click', close);

    $$('.nav-links a').forEach(link =>
        link.addEventListener('click', close)
    );

    return { open, close };
})();

/* =============================================================
   2. ACCORDION (FAQ)
   ============================================================= */
const Accordion = (() => {
    const items = $$('.accordion-item');

    if (!items.length) return;

    const closeAll = () => {
        items.forEach(item => {
            item.classList.remove('active');
            const icon = item.querySelector('i');
            if (icon) icon.className = 'fas fa-plus';
        });
    };

    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const icon = header?.querySelector('i');

        if (!header) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            closeAll();

            if (!isActive) {
                item.classList.add('active');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });
})();

/* =============================================================
   3. HEADER SCROLL (OTIMIZADO)
   ============================================================= */
const HeaderScroll = (() => {
    const header = $('header');
    if (!header) return;

    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    // Throttle com requestAnimationFrame
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
})();

/* =============================================================
   4. SCROLL REVEAL (ANIMAÇÕES)
   ============================================================= */
const ScrollReveal = (() => {
    const elements = $$('.price-card, .service-item, .section-title, .hero-img, .stat-card');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('reveal');

            // Para de observar após animar (performance)
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        el.classList.add('pre-reveal');
        observer.observe(el);
    });
})();

/* =============================================================
   5. BOTÃO WHATSAPP
   ============================================================= */
const WhatsApp = (() => {
    const btn = $('.btn-nav');
    if (!btn) return;

    const phone = '5500000000000';
    const message = encodeURIComponent('Olá, gostaria de um orçamento!');

    btn.addEventListener('click', () => {
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
})();