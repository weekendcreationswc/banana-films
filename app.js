/* ==========================================================================
   WEEKEND CREATIONS - INTERACTIVE WEB LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Mobile Menu Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Floating Navbar Scroll Effect
  const header = document.querySelector('.floating-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 4. Custom Follow Cursor Aura (Desktop Only)
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // The dot follows coordinates exactly
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth LERP animation loop for the outer trailing cursor ring
    const animateCursor = () => {
      // Lerp coefficient for soft elastic drag
      const lerpFactor = 0.15;
      cursorX += (mouseX - cursorX) * lerpFactor;
      cursorY += (mouseY - cursorY) * lerpFactor;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover elements selectors
    const hoverLinks = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .project-card');
    
    hoverLinks.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
      });
    });

    // Philosophy Card custom colors hovers
    const createCard = document.querySelector('.card-create');
    const captivateCard = document.querySelector('.card-captivate');
    const convertCard = document.querySelector('.card-convert');

    if (createCard) {
      createCard.addEventListener('mouseenter', () => cursor.classList.add('hovering-create'));
      createCard.addEventListener('mouseleave', () => cursor.classList.remove('hovering-create'));
    }
    if (captivateCard) {
      captivateCard.addEventListener('mouseenter', () => cursor.classList.add('hovering-captivate'));
      captivateCard.addEventListener('mouseleave', () => cursor.classList.remove('hovering-captivate'));
    }
    if (convertCard) {
      convertCard.addEventListener('mouseenter', () => cursor.classList.add('hovering-convert'));
      convertCard.addEventListener('mouseleave', () => cursor.classList.remove('hovering-convert'));
    }
  }

  // 5. Hero Card Mouse Interactive 3D Tilt
  const tiltCard = document.querySelector('.premium-card-wrapper');
  if (tiltCard) {
    window.addEventListener('mousemove', (e) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      
      // Calculate rotation bounds based on mouse position
      const mouseX = e.clientX - halfWidth;
      const mouseY = e.clientY - halfHeight;
      
      const rotateX = (mouseY / halfHeight) * -12; // tilt max 12 degrees
      const rotateY = (mouseX / halfWidth) * 12;

      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      // Reset smoothly when cursor leaves screen
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // 6. IntersectionObserver Scroll Reveals
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Trigger reveal only once
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Active Nav Section Indicator on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.clientHeight;
      if (window.scrollY >= (secTop - 250)) {
        currentSection = sec.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-sec') === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // 8. Project Filters
  const filterButtons = document.querySelectorAll('.tab-btn');
  const showcaseItems = document.querySelectorAll('.showcase-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      showcaseItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        
        // Hide / Show transitions
        if (filterVal === 'all' || itemCat === filterVal) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  // 9. Contact Budget Range Tracker
  const budgetRange = document.getElementById('budget-range');
  const budgetVal = document.getElementById('budget-val');

  if (budgetRange && budgetVal) {
    budgetRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (val >= 50000) {
        budgetVal.textContent = `$50,000+`;
      } else {
        budgetVal.textContent = `$${val.toLocaleString()}`;
      }
    });
  }

  // 10. Contact Form Submit: Prefilled WhatsApp Generator & Dynamic Chat Bubble
  const contactForm = document.getElementById('growth-contact-form');
  const userChatBubble = document.getElementById('dynamic-user-bubble');
  const bubbleText = document.getElementById('dynamic-bubble-text');
  const bubbleTime = document.getElementById('dynamic-bubble-time');
  const directWaBtn = document.getElementById('direct-wa-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('client-name')?.value || '';
      const company = document.getElementById('company-name')?.value || '';
      const objective = document.getElementById('service-select')?.value || '';
      const rawBudget = budgetRange?.value || '2500';
      const budget = parseInt(rawBudget) >= 50000 ? '$50,000+' : `$${parseInt(rawBudget).toLocaleString()}`;
      const msg = document.getElementById('client-message')?.value || '';

      // Format custom WhatsApp text body
      const wpHeader = `*🚀 NEW BUSINESS BRIEF - WEEKEND CREATIONS* \n\n`;
      const wpBody = `Hi Weekend Creations! \n\n` + 
                     `I'm *${name}* representing *${company}*.\n` + 
                     `I want to partner with you for: \n` + 
                     `👉 *${objective}*\n\n` + 
                     `*📊 Monthly Budget Allocation:* ${budget}\n` + 
                     (msg ? `*📝 Our Ambition Brief:* \n"${msg}"\n\n` : `\n`) + 
                     `Let's CREATE, CAPTIVATE, and CONVERT our audience!`;

      const encodedText = encodeURIComponent(wpBody);
      const whatsAppLink = `https://wa.me/919446777095?text=${encodedText}`;

      // Trigger Interactive UI Mock Chat Update
      if (userChatBubble && bubbleText && bubbleTime) {
        // Build readable preview bubble on dashboard
        bubbleText.innerHTML = `<strong>Brief Sent!</strong><br>Objective: ${objective}<br>Budget: ${budget}<br>Opening WhatsApp...`;
        
        // Format Current Time
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        bubbleTime.textContent = `${hours}:${minutes} ${ampm}`;
        userChatBubble.classList.remove('hidden');

        // Scroll chat window down smoothly
        const chatBody = document.querySelector('.wa-chat-body');
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }

      // Update the main CTA button in the chat box to match new configuration
      if (directWaBtn) {
        directWaBtn.href = whatsAppLink;
      }

      // Proactively open the WhatsApp redirect tab inside user's window after a brief UX animation delay
      setTimeout(() => {
        window.open(whatsAppLink, '_blank');
      }, 900);
    });
  }
});
