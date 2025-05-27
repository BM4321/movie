document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"], #hero a[href^="#"], #main-footer a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // Ensure targetId is not just "#"
            if (targetId.length > 1 && document.querySelector(targetId)) {
                let targetElement = document.querySelector(targetId);
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Optional: Update active state in nav (basic example)
                document.querySelectorAll('#main-nav a').forEach(nav => nav.classList.remove('active'));
                if(this.closest('#main-nav')) { // only apply active to main nav links
                    this.classList.add('active');
                }
            } else if (targetId === "#") { // Handle href="#" case, scroll to top
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // --- Sticky Navigation ---
    const nav = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero');
    let navOffsetY;

    // Calculate nav offset only after hero image (if any) might have loaded
    // or simply use a fixed value or heroSection's height.
    // For simplicity, let's assume nav is right below hero or use hero's bottom.
    function setNavOffsetY() {
        if (heroSection && nav) {
            // If nav is directly after hero, its initial top is hero's height
            // If nav is position:sticky top:0, it's simpler.
            // The current CSS uses sticky, so offset for changing style isn't strictly needed
            // but this can be adapted if you change nav positioning.
        }
    }
    setNavOffsetY(); // Call it once

    // Function to handle sticky nav (if not using position:sticky CSS)
    // window.onscroll = function() {
    //     if (window.pageYOffset > (heroSection ? heroSection.offsetHeight : 200)) {
    //         nav.classList.add('sticky'); // Add 'sticky' class defined in CSS
    //     } else {
    //         nav.classList.remove('sticky');
    //     }
    // };
    // Note: The current CSS for #main-nav already uses `position: sticky;`,
    // so the JS part for adding/removing a class for stickiness is not strictly necessary
    // unless you want more complex behavior.

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted offset
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('#main-nav a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('#main-nav a[href*=' + sectionId + ']').classList.remove('active');
            }
        });

        // Special case for hero section if it's not a <section> tag or for top of page
        const heroLink = document.querySelector('#main-nav a[href="#hero"]');
        if (heroLink) {
            if (scrollY < (document.getElementById('about')?.offsetTop || sections[0]?.offsetTop || window.innerHeight) - 100) {
                heroLink.classList.add('active');
            } else {
                // If no other section is active and we're not at hero, remove active from hero
                if (!document.querySelector('#main-nav a.active')) {
                     heroLink.classList.remove('active');
                }
            }
        }
    }
    navHighlighter(); // Call on load

    // --- Optional: Portfolio Tabs Filter ---
    // This is a basic filter. You'll need to assign 'software' or 'design' classes
    // to your .project-card elements as shown in the HTML.
    const tabButtons = document.querySelectorAll('#portfolio .tab-button');
    const projectCards = document.querySelectorAll('#portfolio .project-card');

    if (tabButtons.length > 0 && projectCards.length > 0) {
        // Function to show category (global for onclick)
        window.showCategory = function(category) {
            tabButtons.forEach(button => button.classList.remove('active'));
            document.querySelector(`.tab-button[onclick="showCategory('${category}')"]`).classList.add('active');

            projectCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block'; // Or 'grid', 'flex' depending on your layout
                } else {
                    card.style.display = 'none';
                }
            });
        }
        // Initially show all or a default category if tabs exist
        // showCategory('all'); // Or your default category e.g. 'software'
        // If you want a default category selected:
        // document.querySelector('#portfolio .tab-button.active')?.click();
    }


    // --- Contact Form Handling (Basic - No actual sending) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents the default form submission
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // Here you would typically send data to a server or a service like Formspree/Netlify Forms
                alert('Thank you for your message, ' + name + '! (This is a demo - no email was sent)');
                contactForm.reset(); // Clears the form
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // --- Simple Testimonial Slider (Example - very basic cycle) ---
    const testimonials = document.querySelectorAll('#testimonials .testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = (i === index) ? 'block' : 'none';
        });
    }

    if (testimonials.length > 1) {
        showTestimonial(currentTestimonial); // Show first one
        // setInterval(() => {
        //     currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        //     showTestimonial(currentTestimonial);
        // }, 5000); // Change testimonial every 5 seconds
        // Note: For a real slider, you'd add controls (next/prev buttons, dots)
        // The setInterval is commented out to prevent automatic sliding without controls.
    } else if (testimonials.length === 1) {
        showTestimonial(0); // Show the single testimonial
    }


    console.log("Portfolio website scripts loaded.");
});
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

reveals.forEach(el => observer.observe(el));
