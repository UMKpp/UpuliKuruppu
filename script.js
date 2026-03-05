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

    // Magic Touch: Particle Network Animation
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Mouse Interaction
    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Create Particle
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Check particle position, check mouse position, move the particle, draw the particle
        update() {
            // Check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Check collision detection - mouse position / particle position
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1; // -1 to 1 conversation
            let directionY = (Math.random() * 2) - 1;
            let color = '#000000'; // Primary color

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Check if particles are close enough to draw line
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 0, 0,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Resize event
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        init();
    });

    // Mouse out event
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    init();
    animate();

    // --- Skills Section Interactions ---
    const skillsData = {
        "Programming": ["Java", "Python", "JavaScript", "C#", "C++"],
        "Web Dev": ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Tailwind CSS"],
        "Backend": ["Node.js", "Express.js", "MySQL", "MongoDB", "REST APIs"],
        "Tools": ["Git", "GitHub", "VS Code", "Postman", "Figma"],
        "Core Skills": ["Data Structures", "OOP", "Algorithms", "Problem Solving", "Teamwork"]
    };

    const categoriesContainer = document.querySelector('.skills-categories');
    const displayContainer = document.querySelector('.skills-display');

    // Initialize Categories
    Object.keys(skillsData).forEach(category => {
        const btn = document.createElement('div');
        btn.classList.add('skill-category');
        btn.textContent = category;
        btn.setAttribute('data-category', category);
        categoriesContainer.appendChild(btn);

        // Interaction Events
        // Click interaction
        btn.addEventListener('click', () => {
            activateCategory(btn);
        });

        // Hover interaction for desktop
        btn.addEventListener('mouseenter', () => {
            activateCategory(btn);
        });
    });

    function activateCategory(activeBtn) {
        // Remove active class from all
        document.querySelectorAll('.skill-category').forEach(b => b.classList.remove('active'));
        // Add active class to current
        activeBtn.classList.add('active');

        // Get category data
        const categoryName = activeBtn.getAttribute('data-category');
        const skills = skillsData[categoryName];

        // Clear display
        displayContainer.innerHTML = '';

        // Add skill tags with staggered animation
        skills.forEach((skill, index) => {
            const tag = document.createElement('div');
            tag.classList.add('skill-tag');
            tag.textContent = skill;
            tag.style.animationDelay = `${index * 0.1}s`; // Stagger effect
            displayContainer.appendChild(tag);
        });
    }

    // Default: Trigger the first category on load (optional, or kept empty)
    // setTimeout(() => activateCategory(categoriesContainer.firstChild), 500);
});
