document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav'); 
    const accordions = document.querySelectorAll(".accordion"); // Ensure accordions are selected correctly

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

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Check for exact path matches first (for blog and other pages)
        let exactMatch = false;
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath || 
                (currentPath.includes('/blog/') && linkPath === '/blog/')) {
                link.classList.add('active');
                exactMatch = true;
            }
        });
        
        // If we're on the homepage, highlight based on section
        if (currentPath === '/' && !exactMatch) {
            // Default to home if no hash
            if (!window.location.hash) {
                const homeLink = document.querySelector('.nav-links a[href="#home"]');
                if (homeLink) homeLink.classList.add('active');
            } else {
                // Set active based on hash
                const currentHash = window.location.hash;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentHash) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Also set up scroll spy for sections (only on homepage)
            setupScrollSpy();
        }
    }
    
    // Set up scroll spy to highlight nav items based on scroll position
    function setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

        if (sections.length === 0 || navLinksList.length === 0) return;

        const setActive = (id) => {
            navLinksList.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === `#${id}`);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.getAttribute('id'));
                }
            });
        }, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: 0
        });

        sections.forEach(section => observer.observe(section));
    }
    
    setActiveNavLink();

    // Carousel Functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (slides.length === 0) {
        console.warn("No slides found for the carousel.");
    }

    // Function to show slides
    function showSlides(n) {
        const newIndex = (n + slides.length) % slides.length; // Wrap around
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        
        // Show the current slide
        slides[newIndex].classList.add("active");
        
        // Update slide index
        slideIndex = newIndex;
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
    let autoScrollInterval;
    function startAutoScroll() {
        stopAutoScroll(); // Ensure no existing interval
        autoScrollInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    function resetAutoScroll() {
        startAutoScroll();
    }

    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoScroll();

        // Pause auto-scroll on hover and resume on mouse leave
        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                stopAutoScroll();
                console.log("Carousel paused on hover.");
            });

            carousel.addEventListener('mouseleave', () => {
                startAutoScroll();
                console.log("Carousel resumed on mouse leave.");
            });
        }

        // Pause carousel when contact section is in view
        const contactSection = document.querySelector('#contact');

        if (contactSection) {
            const observerOptions = {
                root: null,
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stopAutoScroll();
                        console.log("Contact section in view. Carousel paused.");
                    } else {
                        startAutoScroll();
                        console.log("Contact section out of view. Carousel resumed.");
                    }
                });
            }, observerOptions);

            observer.observe(contactSection);
        }
    }

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

                // Keyboard accessibility for accordion headers
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

    // Note: Scroll spy functionality is handled in setupScrollSpy() function above
    // This duplicate scroll spy code has been removed to prevent conflicts on article pages

    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email-address'); // Updated ID
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

    // Toast Elements
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastDismiss = document.getElementById('toast-dismiss');

    // Function to Show Toast
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        // Automatically hide after 5 seconds
        setTimeout(() => {
            hideToast();
        }, 5000);
    }

    // Function to Hide Toast
    function hideToast() {
        toast.classList.remove('show');
    }

    // Dismiss Button Event
    if (toastDismiss) {
        toastDismiss.addEventListener('click', hideToast);
    }

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
                    // Show Toast Notification
                    showToast('Thank you! Your message has been sent successfully.');
                    contactForm.reset(); // Clear the form
                } else {
                    // Server Error Feedback
                    showToast(result.message || 'Something went wrong. Please try again later.');
                }
            } else {
                // HTTP Error Feedback
                showToast('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('An error occurred. Please try again later.');
        } finally {
            // Remove loading state
            contactForm.classList.remove('loading');
        }
    });

    // Email Obfuscation 
    // Define parts of the email
    const user = 'lyori6ux';
    const domain = 'gmail';
    const tld = 'com';

    // Construct the email address
    const email = `${user}@${domain}.${tld}`;

    // Set the href attribute for the mailto link
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.setAttribute('href', `mailto:${email}`);
        
        // Add copy to clipboard functionality
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Copy email to clipboard
            const emailToCopy = 'hello@lyori.com';
            navigator.clipboard.writeText(emailToCopy).then(function() {
                // Show success toast
                showToast('Email copied to clipboard');
            }).catch(function(err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = emailToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Email copied to clipboard');
            });
        });
    } else {
        console.warn("Email link element not found.");
    }

    // Set the visible email address
    const mailAddress = document.getElementById('gmail-address'); // Updated ID
    if (mailAddress) { // Corrected variable name
        mailAddress.textContent = 'hello@lyori.com';
    } else {
        console.warn("Email address element not found.");
    }

    // 'Read More' functionality for testimonials
    const testimonials = document.querySelectorAll('.testimonial');

    testimonials.forEach(testimonial => {
        const textElement = testimonial.querySelector('.testimonial-text');
        const readMoreLink = testimonial.querySelector('.read-more-link');

        // Get the full text
        const fullText = textElement.innerText;

        // Split into sentences
        const sentences = fullText.match(/[^\.!\?]+[\.!\?]+/g);

        if (sentences && sentences.length > 3) {
            // Get the first 3 sentences
            const truncatedText = sentences.slice(0, 3).join(' ');

            // Store the full text in a data attribute
            textElement.dataset.fullText = fullText;

            // Set the text to the truncated version
            textElement.innerText = truncatedText;

            // Add event listener to the 'Read More' link
            readMoreLink.addEventListener('click', () => {
                const isExpanded = testimonial.classList.contains('expanded');

                if (isExpanded) {
                    // Collapse
                    textElement.innerText = truncatedText;
                    readMoreLink.innerText = 'Read More';
                    testimonial.classList.remove('expanded');
                } else {
                    // Expand
                    textElement.innerText = fullText;
                    readMoreLink.innerText = 'Read Less';
                    testimonial.classList.add('expanded');
                }
            });
        } else {
            // If 3 sentences or less, hide the 'Read More' link
            readMoreLink.style.display = 'none';
        }
    });
});