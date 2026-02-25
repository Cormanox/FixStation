/* 
========================================
FIXSTATION NARANJO - JS
========================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Elements on Scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    // Run on load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 2. Dynamic Header Background
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.padding = '5px 0';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
            header.style.padding = '10px 0';
        }
    });

    // 3. CTA Click Event (Example analytics or log)
    const ctas = document.querySelectorAll('a[href^="https://wa.me"]');
    ctas.forEach(cta => {
        cta.addEventListener('click', () => {
            console.log('User clicked WhatsApp CTA');
            // Here you could add event tracking
        });
    });

    // 4. Smooth Anchor Scrolling (Extra check)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Console Selection Logic (for service pages)
    const consoleBtns = document.querySelectorAll('.console-btn');
    const whatsappBtn = document.querySelector('.btn-cta-dynamic');

    if (consoleBtns.length > 0 && whatsappBtn) {
        let selectedConsole = 'PlayStation'; // Default

        consoleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                consoleBtns.forEach(b => b.classList.remove('active'));
                // Add to current
                btn.classList.add('active');
                
                selectedConsole = btn.getAttribute('data-console');
                
                // Update WhatsApp link
                const baseText = whatsappBtn.getAttribute('data-base-text');
                const encodedText = encodeURIComponent(`${baseText} para mi ${selectedConsole}`);
                whatsappBtn.href = `https://wa.me/506XXXXXX?text=${encodedText}`;
            });
        });
    }

});
