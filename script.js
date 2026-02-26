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
                whatsappBtn.href = `https://wa.me/50660331197?text=${encodedText}`;
            });
        });
    }

    // 6. Services Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const grids = {
        consolas: document.getElementById('grid-consolas'),
        pcs: document.getElementById('grid-pcs')
    };

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');

                // Update active state of buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Switch grids
                Object.keys(grids).forEach(key => {
                    if (key === category) {
                        grids[key].classList.remove('hidden');
                        // Trigger reveal for new items
                        revealOnScroll();
                    } else {
                        grids[key].classList.add('hidden');
                    }
                });
            });
        });
    }

    // 7. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 8. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.getElementById("scroll-progress");
        if(progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

});

// 9. Preloader Logic (Fires on window load, not just DOMContent)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if(loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 800); // 800ms delay to show the "pulse" animation nicely
    }
});
