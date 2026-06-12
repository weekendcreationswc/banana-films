/* ==========================================================================
   BANANA FILMS - INTERACTIVE LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. STICKY HEADER & SCROLL DETECTION
     -------------------------------------------------------------------------- */
  const header = document.getElementById('mainHeader');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run on init to capture reload position


  /* --------------------------------------------------------------------------
     2. MOBILE NAV OVERLAY & HAMBURGER TOGGLE
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerMenuBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  const toggleMobileNav = () => {
    const isActive = hamburgerBtn.classList.toggle('active');
    mobileNavMenu.classList.toggle('active');
    
    // Accessibility states
    hamburgerBtn.setAttribute('aria-expanded', isActive);
    mobileNavMenu.setAttribute('aria-hidden', !isActive);

    // Body scroll lock
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  hamburgerBtn.addEventListener('click', toggleMobileNav);

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburgerBtn.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  });


  /* --------------------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR ACTIVE NAV & FADE ANIMATIONS
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');
  const mobNavItems = document.querySelectorAll('.mobile-nav-item');
  const animElements = document.querySelectorAll('.fade-in-element');

  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies center of screen
    threshold: 0
  };

  // Section visibility observer
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Desktop Nav
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Update Mobile Nav
        mobNavItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Fade-in entry animation observer
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        fadeObserver.unobserve(entry.target); // Trigger once
      }
    });
  }, fadeObserverOptions);

  animElements.forEach(el => fadeObserver.observe(el));

  // Observe highlighting columns & portfolio grid elements too
  const cards = document.querySelectorAll('.highlight-card, .portfolio-item, .contact-container-box');
  cards.forEach(card => {
    card.classList.add('fade-in-element');
    fadeObserver.observe(card);
  });


  /* --------------------------------------------------------------------------
     4. PORTFOLIO FILTER MECHANISM
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update filter tabs UI state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter gallery elements
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    });
  });


  /* --------------------------------------------------------------------------
     5. VANILLA LIGHTBOX MODAL WITH NAVIGATION
     -------------------------------------------------------------------------- */
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxActiveImg');
  const lightboxCat = document.getElementById('lightboxActiveCat');
  const lightboxTitle = document.getElementById('lightboxActiveTitle');
  const lightboxDesc = document.getElementById('lightboxActiveDesc');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  let activeList = []; // Keeps track of currently filtered/visible items
  let currentIndex = 0;

  // Open Lightbox
  const openLightbox = (index) => {
    currentIndex = index;
    const project = activeList[currentIndex];
    
    lightboxImg.src = project.imgSrc;
    lightboxImg.alt = project.imgAlt;
    lightboxCat.textContent = project.category;
    lightboxTitle.textContent = project.title;
    lightboxDesc.textContent = project.desc;
    
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
    closeBtn.focus();
  };

  // Close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Release background scroll
  };

  // Navigate Lightbox
  const slideNext = () => {
    currentIndex = (currentIndex + 1) % activeList.length;
    openLightbox(currentIndex);
  };

  const slidePrev = () => {
    currentIndex = (currentIndex - 1 + activeList.length) % activeList.length;
    openLightbox(currentIndex);
  };

  // Map clicks on portfolio items
  portfolioItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Rebuild visible list
      activeList = [];
      let clickedIdx = 0;

      // Extract all currently visible portfolio details
      const visibleItems = document.querySelectorAll('.portfolio-item.show');
      visibleItems.forEach((el, idx) => {
        const img = el.querySelector('.portfolio-thumb');
        const cat = el.querySelector('.portfolio-category').textContent;
        const title = el.querySelector('.portfolio-item-title').textContent;
        const desc = el.querySelector('.portfolio-item-desc').textContent;

        activeList.push({
          element: el,
          imgSrc: img.getAttribute('src'),
          imgAlt: img.getAttribute('alt'),
          category: cat,
          title: title,
          desc: desc
        });

        if (el === item) {
          clickedIdx = idx;
        }
      });

      openLightbox(clickedIdx);
    });

    // Support trigger lightbox via Enter key on focused keyboard navigation
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        item.click();
      }
    });
  });

  // Lightbox Click Listeners
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);

  // Close lightbox clicking on backdrop background overlay
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      slideNext();
    } else if (e.key === 'ArrowLeft') {
      slidePrev();
    }
  });

  // Touch Swipe Support for Mobile Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const threshold = 50; // swipe length minimum
    if (touchEndX < touchStartX - threshold) {
      slideNext(); // Swiped Left -> Show Next
    } else if (touchEndX > touchStartX + threshold) {
      slidePrev(); // Swiped Right -> Show Prev
    }
  };


  /* --------------------------------------------------------------------------
     6. CONTACT FORM VALIDATION & WHATSAPP REDIRECTION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');

  // Input listener resets invalid state
  const clearError = (inputEl) => {
    const group = inputEl.closest('.input-group');
    group.classList.remove('invalid');
  };

  [nameInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.input-group').classList.add('invalid');
      isFormValid = false;
    } else {
      nameInput.closest('.input-group').classList.remove('invalid');
    }

    // Validate Phone (At least 5 digits check for simple validation)
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 5 || !phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.closest('.input-group').classList.add('invalid');
      isFormValid = false;
    } else {
      phoneInput.closest('.input-group').classList.remove('invalid');
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageInput.closest('.input-group').classList.add('invalid');
      isFormValid = false;
    } else {
      messageInput.closest('.input-group').classList.remove('invalid');
    }

    // If form is valid, redirect to WhatsApp with pre-filled message content
    if (isFormValid) {
      const name = encodeURIComponent(nameInput.value.trim());
      const phone = encodeURIComponent(phoneInput.value.trim());
      const message = encodeURIComponent(messageInput.value.trim());

      // Format custom message string
      const textMessage = `Hello Banana Films,%0A%0AMy name is: *${name}*%0APhone: *${phone}*%0A%0AI would like to discuss a project:%0A${message}`;
      
      const whatsappBaseUrl = 'https://wa.me/919446777095';
      const finalWhatsAppUrl = `${whatsappBaseUrl}?text=${textMessage}`;

      // Open WhatsApp directly in new tab
      window.open(finalWhatsAppUrl, '_blank', 'noopener,noreferrer');

      // Clear Form Fields
      contactForm.reset();
      
      // Force input fields placeholder transitions reset
      [nameInput, phoneInput, messageInput].forEach(input => {
        input.dispatchEvent(new Event('input')); // Reset label float positions
      });
    }
  });

});
