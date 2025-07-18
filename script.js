document.addEventListener('DOMContentLoaded', function() {

    // --- Apple-like Scroll Fade Animation ---
    const animatedSections = document.querySelectorAll('.content-section, .hero-section');

    const handleScrollAnimation = () => {
        const viewportHeight = window.innerHeight;

        animatedSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // The vertical center of the section
            const sectionCenter = rect.top + rect.height / 2;
            
            // How far the section's center is from the viewport's center
            const distanceFromViewportCenter = viewportHeight / 2 - sectionCenter;
            
            // A scale from 0 to 1. 1 when the section is centered, 0 when its center is at the viewport's edge.
            // We use a power of 2 (or higher) to create a more dramatic fade-in/out effect
            const visibility = 1 - Math.pow(Math.abs(distanceFromViewportCenter) / (viewportHeight / 2), 2);
            
            // Clamp the value between 0 and 1 to avoid negative opacity
            section.style.opacity = Math.max(0, Math.min(1, visibility));
        });
    };
    
    // Add event listener for scroll, using requestAnimationFrame for performance
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(handleScrollAnimation);
    });
    
    // Run once on load to set initial state
    handleScrollAnimation();


    // --- Contact Modal Logic ---
    const modal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close-button');

    if (modal && contactBtn && closeBtn) {
        contactBtn.onclick = function() {
            modal.style.display = "block";
        }
    
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
    
            // --- Start sending animation ---
            submitBtn.disabled = true;
            submitBtn.classList.add('sending');
    
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(() => {
                    // --- Success animation ---
                    submitBtn.classList.remove('sending');
                    submitBtn.classList.add('success');
                    buttonText.textContent = 'Sent!';
                    
                    // After 2 seconds, close modal and reset button
                    setTimeout(() => {
                        if (modal) modal.style.display = "none";
                        contactForm.reset();
                        
                        // Reset button state
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                        buttonText.textContent = 'Send Message';
                    }, 2000);
    
                }, (err) => {
                    // --- Handle error ---
                    submitBtn.classList.remove('sending');
                    // You could add an error state/class here if you wish
                    alert('Failed to send message. Please try again.');
                    submitBtn.disabled = false;
                });
        });
    }

});
