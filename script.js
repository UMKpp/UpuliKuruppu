document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');

    // Check if user has visited before in this session
    // For testing/dev purposes, we might want to comment this out to see it every time
    // or use !sessionStorage.getItem('visited')

    if (!sessionStorage.getItem('visited')) {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.visibility = 'hidden';
            }, 500);
            sessionStorage.setItem('visited', 'true');
        }, 2200); // Slightly shorter than animation to fade out smoothly
    } else {
        splashScreen.style.display = 'none';
    }

    // Optional: Reset session storage for testing - remove in production
    // sessionStorage.removeItem('visited'); 

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            links.forEach(link => link.style.animation = '');
        }
    });
});
