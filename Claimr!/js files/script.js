document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active'); // Toggles 'active' class on navigation
            // Optional: Change hamburger icon to 'X'
            menuToggle.textContent = nav.classList.contains('active') ? '\u2715' : '\u2630';
        });

        // Close menu when a navigation link is clicked (for single-page sites or if desired)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '\u2630'; // Reset icon
            });
        });
    }

    // 2. Simple Testimonial Slider (very basic - for a real slider, use a library)
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        // This is a placeholder. For a real slider, you'd integrate a library like Swiper.js or build more complex JS.
        // The CSS handles horizontal scrolling for now.
        console.log("Testimonial slider area ready. Consider a library like Swiper.js for advanced functionality.");
    }
});