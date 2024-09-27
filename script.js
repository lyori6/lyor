document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav'); 
    const accordions = document.querySelectorAll(".accordion"); // Ensure accordions are selected correctly
    console.log('Accordions:', accordions); // Debugging line to verify selection

    if (menuIcon && navLinks) {
        const toggleMenu = () => {
            const isActive = navLinks.classList.toggle('active');
            menuIcon.classList.toggle('open');
            menuIcon.setAttribute('aria-expanded', isActive);
            nav.classList.toggle('menu-open', isActive); // Optional: Toggle class on nav for additional styles
            document.body.classList.toggle('no-scroll', isActive); // Prevent body scroll when menu is open
        };

        menuIcon.addEventListener('click', toggleMenu);

        menuIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close the menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    } else {
        console.warn("Menu icon or navigation links not found.");
    }

    // Carousel Functionality
    let slideIndex = 0;
    let autoScrollInterval;
    const slides = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (slides.length === 0) {
        console.warn("No slides found for the carousel.");
    }

    // Function to show slides
    function showSlides(n) {
        slideIndex = (n + slides.length) % slides.length; // Wrap around
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === slideIndex);
        });
    }

    // Next/previous controls
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener("click", () => {
            slideIndex++;
            showSlides(slideIndex);
            resetAutoScroll();
        });

        prevBtn.addEventListener("click", () => {
            slideIndex--;
            showSlides(slideIndex);
            resetAutoScroll();
        });
    } else {
        console.warn("Previous or Next buttons not found for the carousel.");
    }

    // Auto-scroll every 5 seconds
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoScroll();

        // Pause auto-scroll on hover and resume on mouse leave
        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoScrollInterval);
            });

            carousel.addEventListener('mouseleave', () => {
                startAutoScroll();
            });
        }
    }

    // Read More Functionality for Testimonials
    const testimonials = document.querySelectorAll(".testimonial");

    testimonials.forEach((testimonial) => {
        const textElement = testimonial.querySelector(".testimonial-text");
        const readMoreLink = testimonial.querySelector(".read-more-link");

        if (textElement && readMoreLink) {
            const fullText = textElement.textContent.trim();
            const words = fullText.split(/\s+/);
            const wordLimit = 50; // Adjust as needed

            if (words.length > wordLimit) {
                const truncatedText = words.slice(0, wordLimit).join(' ') + '... ';
                textElement.textContent = truncatedText;
                readMoreLink.style.display = 'inline'; // Ensure the link is visible

                readMoreLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isExpanded = testimonial.classList.toggle('expanded');
                    textElement.textContent = isExpanded ? fullText + ' ' : truncatedText;
                    readMoreLink.textContent = isExpanded ? 'Read less' : 'Read more';
                });
            } else {
                readMoreLink.style.display = 'none'; // Hide the link if text is short
            }
        } else {
            console.warn("Missing .testimonial-text or .read-more-link in a testimonial.");
        }
    });

    // Accordion Functionality
    if (accordions.length > 0) {
        accordions.forEach((accordion) => {
            const header = accordion.querySelector(".accordion-header");

            if (header) {
                header.addEventListener("click", () => {
                    const isOpen = accordion.classList.toggle("open");

                    // Disable hover when open
                    if (isOpen) {
                        header.classList.add('no-hover');
                    } else {
                        header.classList.remove('no-hover');
                    }

                    // Close other accordions
                    accordions.forEach((acc) => {
                        if (acc !== accordion && acc.classList.contains('open')) {
                            acc.classList.remove("open");
                            const otherHeader = acc.querySelector(".accordion-header");
                            if (otherHeader) {
                                otherHeader.classList.remove('no-hover');
                            }
                        }
                    });
                });

                // Optional: Add keyboard accessibility for accordion headers
                header.setAttribute('tabindex', '0'); // Make header focusable

                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            } else {
                console.warn("Accordion header not found within an accordion.");
            }
        });
    } else {
        console.warn("No accordions found.");
    }

    // **Updated Smooth Scrolling for Navigation Links**
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.classList.contains('disabled-btn')) {
                e.preventDefault(); // Prevent any action for disabled buttons
                return; // Exit the handler
            }

            // For non-disabled buttons, perform smooth scrolling
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight Active Navigation Link on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 70) { // Adjusted offset for better accuracy
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email-address');
    const emailError = document.getElementById('email-error');
    const formFeedback = document.getElementById('form-feedback');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const spinner = document.getElementById('spinner');

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



// Handle success feedback and animation
function showSuccessMessage() {
    formFeedback.textContent = 'Thank you! I received your message and will get back to you soon.';
    formFeedback.classList.add('thank-you-message', 'show');
}

// Call this function on success in your existing submission logic

    // Function to Validate Email
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    // Show Error Message
    function showError(message) {
        emailError.textContent = message;
        emailError.style.display = 'block';
    }

    // Hide Error Message
    function hideError() {
        emailError.style.display = 'none';
    }

    
    const GOOGLE_APPS_SCRIPT_URL = 'https://lyori-contact.lyori6ux.workers.dev/'

    // Handle Form Submission
    // Handle Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear previous feedback
    formFeedback.textContent = '';
    formFeedback.classList.remove('thank-you-message');

    const fullName = document.getElementById('full-name').value.trim();
    const email = emailInput.value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate Email
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    } else {
        hideError();
    }

    // Add loading state
    contactForm.classList.add('loading');

    // Prepare Form Data
    const formData = {
        fullName,
        email,
        message
    };

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === 'success') {
                // Success Feedback
                formFeedback.textContent = 'Thank you! I received your message and will get back to you soon.';
                formFeedback.classList.add('thank-you-message');
                contactForm.reset(); // Clear the form
                
                // Optionally, hide the form or redirect
                // contactForm.style.display = 'none';
            } else {
                // Server Error Feedback
                formFeedback.textContent = result.message || 'Something went wrong. Please try again later.';
                formFeedback.style.color = 'var(--accent-color)';
            }
        } else {
            // HTTP Error Feedback
            formFeedback.textContent = 'Something went wrong. Please try again later.';
            formFeedback.style.color = 'var(--accent-color)';
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        formFeedback.textContent = 'An error occurred. Please try again later.';
        formFeedback.style.color = 'var(--accent-color)';
    } finally {
        // Remove loading state
        contactForm.classList.remove('loading');
    }
});
});