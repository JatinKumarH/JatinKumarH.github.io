document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu (Hamburger) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
    
    // --- Typewriter Effect ---
    const typewriterText = document.getElementById('typewriter-text');
    const words = ["HTML", "CSS", "JavaScript", "Express.js", "Node.js", "Python"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        let typeSpeed = 150;

        if (isDeleting) {
            // Deleting characters
            typewriterText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 75;
        } else {
            // Typing characters
            typewriterText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing word, start deleting after a pause
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting word, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typewriterText) {
        type();
    }


    // --- Apple-like Scroll Fade Animation ---
    const animatedSections = document.querySelectorAll('.content-section, .hero-section');

    const handleScrollAnimation = () => {
        const viewportHeight = window.innerHeight;

        animatedSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distanceFromViewportCenter = viewportHeight / 2 - sectionCenter;
            const visibility = 1 - Math.pow(Math.abs(distanceFromViewportCenter) / (viewportHeight / 2), 2);
            section.style.opacity = Math.max(0, Math.min(1, visibility));
        });
    };
    
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(handleScrollAnimation);
    });
    
    handleScrollAnimation();


    // --- Contact Modal Logic ---
    const modal = document.getElementById('contactModal');
    const contactBtns = document.querySelectorAll('.contact-button'); // Select all contact buttons
    const closeBtn = document.querySelector('.close-button');

    if (modal && contactBtns.length > 0 && closeBtn) {
        contactBtns.forEach(btn => {
            btn.onclick = function() {
                modal.style.display = "block";
                // If mobile menu is open, close it
                if (navMenu.classList.contains("active")) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                }
            }
        });
    
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }


    // --- EmailJS Integration ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // IMPORTANT: Replace with your actual IDs from your EmailJS account
        const SERVICE_ID = 'service_wq66dan';
        const TEMPLATE_ID = 'template_3wl5gmp';
        const PUBLIC_KEY = '4gs1y7gdCD-G7NBsn';

    
        emailjs.init(PUBLIC_KEY);
    
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            const submitBtn = contactForm.querySelector('.submit-button');
            const buttonText = submitBtn.querySelector('.button-text');
    
            submitBtn.disabled = true;
            submitBtn.classList.add('sending');
    
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(() => {
                    submitBtn.classList.remove('sending');
                    submitBtn.classList.add('success');
                    buttonText.textContent = 'Sent!';
                    
                    setTimeout(() => {
                        if (modal) modal.style.display = "none";
                        contactForm.reset();
                        
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                        buttonText.textContent = 'Send Message';
                    }, 2000);
    
                }, (err) => {
                    submitBtn.classList.remove('sending');
                    alert('Failed to send message. Please try again.');
                    submitBtn.disabled = false;
                });
        });
    }

});
