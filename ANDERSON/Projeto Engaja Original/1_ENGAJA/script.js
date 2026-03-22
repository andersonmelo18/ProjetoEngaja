/* =============================================================
   0. HELPERS
   ============================================================= */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =============================================================
   1. MENU GLOBAL (HAMBURGUER EM TUDO)
   ============================================================= */
const Menu = (() => {
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    // AJUSTE: O seu CSS usava a classe .menu-overlay, alteramos aqui para bater
    const overlay = $('.menu-overlay');
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

    // Listeners
    hamburger.addEventListener('click', toggle);
    overlay.addEventListener('click', close);

    // Fecha o menu ao clicar em qualquer link (importante para One Page)
    $$('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            Menu.close();
        });
    });

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
        if (!header) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const icon = header.querySelector('i');

            closeAll();

            if (!isActive) {
                item.classList.add('active');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });
})();

/* =============================================================
   3. HEADER SCROLL (PERFORMANCE)
   ============================================================= */
const HeaderScroll = (() => {
    const header = $('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

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
   4. SCROLL REVEAL (INTERSECTION OBSERVER)
   ============================================================= */
const ScrollReveal = (() => {
    const elements = $$('.price-card, .service-item, .section-title, .hero-img, .stat-card');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.classList.add('pre-reveal');
        observer.observe(el);
    });
})();

/* =============================================================
   5. CONFIGURAÇÃO WHATSAPP (SINCRONIZADO)
   ============================================================= */
const WhatsApp = (() => {
    const btn = $('.btn-nav');
    if (!btn) return;

    // Ajustei o número para o que estava no seu HTML anterior
    const phone = '5583986057772';
    const message = encodeURIComponent('Olá, gostaria de um orçamento!');

    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que o link do HTML execute antes do JS
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
})();