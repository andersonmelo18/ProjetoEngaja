/* ==========================================================================
   CONFIGURAÇÕES GERAIS E SELETORES
   ========================================================================== */
const header = document.querySelector('header');
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const revealElements = document.querySelectorAll('.reveal');

/* ==========================================================================
   1. EFEITO DO HEADER AO ROLAR
   ========================================================================== */
const handleHeader = () => {
    if (header) { // Verifica se o header existe
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
};

window.addEventListener('scroll', handleHeader);
handleHeader(); 

/* ==========================================================================
   2. MENU MOBILE (TOGGLE)
   ========================================================================== */
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('is-open'); 
        
        // Bloqueia o scroll do corpo quando o menu está aberto
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Fecha o menu ao clicar em qualquer link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; // Libera o scroll
        });
    });

    // Fecha o menu se o usuário clicar fora dele
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; // Libera o scroll
        }
    });
}

/* ==========================================================================
   3. FAQ ACCORDION (MELHORADO)
   ========================================================================== */
if (faqItems.length > 0) { // Só executa se houver FAQs na página
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros (Comportamento Sanfona)
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   4. ANIMAÇÕES DE REVEAL
   ========================================================================== */
if (revealElements.length > 0) {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}