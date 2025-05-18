document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('show');
        }
    });

    // Close mobile menu when resizing to larger screen
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
}); 