/* 
Scripts for Qaisar Roonjha - Portfolio
Functionality: Scroll reveals, Navigation scroll effect, and Dynamic interactions.
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);

    // 2. Navigation Background Change on Scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(135, 206, 235, 0.98)';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.borderBottom = '1px solid transparent';
        }
    });

    // 3. Smooth Scrolling for Navigation Links (native CSS handles this but let's ensure)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Spy - Highlight active section in navigation
    const sections = document.querySelectorAll('section, header.hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollSpy = () => {
        const triggerPoint = window.innerHeight * 0.3; // Detect when section is 30% from the top
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id') || '';
                // Special case for hero which is a header
                if (section.classList.contains('hero')) {
                    currentSectionId = ''; // No highlight for hero or maybe home
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    // 5. Lucide Icons Initialization
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
