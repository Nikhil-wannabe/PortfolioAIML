document.addEventListener('DOMContentLoaded', () => {

    // --- On-Scroll Fade-In Animation for Sections ---
    const sections = document.querySelectorAll('.resume-section');

    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) { // Trigger when 85% of the section is visible
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check for animations
    animateOnScroll();

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);


    // --- Parallax Scrolling for Flagship Projects ---
    const flagshipProjectsSection = document.getElementById('flagship-projects');

    // Note: For a true parallax effect, you often need specific HTML structure
    // (e.g., background layers) and CSS (e.g., background-attachment: fixed, or
    // perspective and transform-style for 3D parallax).
    // This script will demonstrate a simple effect by moving project items at a
    // different speed or transforming them on scroll.

    if (flagshipProjectsSection) {
        const projectItems = flagshipProjectsSection.querySelectorAll('ul > li');

        const parallaxEffect = () => {
            const scrollY = window.scrollY;
            const sectionTop = flagshipProjectsSection.offsetTop;
            const sectionHeight = flagshipProjectsSection.offsetHeight;

            // Only apply effect when section is somewhat in view
            if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
                projectItems.forEach((item, index) => {
                    const itemTop = item.offsetTop; // Relative to its parent ul
                    // Calculate a movement factor - adjust as needed
                    // Slower movement for items further down, or vary based on index
                    const movement = (scrollY - (sectionTop + itemTop)) * 0.1 * (index % 2 === 0 ? 1 : 1.2);

                    // Example: Move items slightly up or down
                    item.style.transform = `translateY(${movement}px)`;

                    // Example: Adjust opacity (can be combined with movement)
                    // const opacity = 1 - Math.abs(movement) / 100;
                    // item.style.opacity = Math.max(0.5, Math.min(1, opacity));
                });
            }
        };

        // Add scroll event listener for parallax
        window.addEventListener('scroll', parallaxEffect);
    }

    // --- Smooth Scrolling for Anchor Links (Optional, if nav links are added) ---
    // Example:
    // const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     });
    // });

    console.log("Resume script loaded. Animations and parallax initialized.");
});
