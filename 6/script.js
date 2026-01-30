// ========================================
// Giropay Casino - Native JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileMenu();
  initSmoothScroll();
  initScrollIndicator();
  initAnimations();
});

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Toggle icon
      const icon = menuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        icon.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
      } else {
        icon.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      }
    });
    
    // Close menu on link click
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        const icon = menuBtn.querySelector('svg');
        icon.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      });
    });
  }
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ========================================
// Scroll Progress Indicator
// ========================================
function initScrollIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  document.body.appendChild(indicator);
  
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    indicator.style.width = scrolled + '%';
  });
}

// ========================================
// Scroll Animations
// ========================================
function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections and cards
  const animatedElements = document.querySelectorAll('.section, .card-embossed, .casino-card, .criteria-item, .alt-card');
  animatedElements.forEach(function(el) {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ========================================
// Casino Data
// ========================================
const topCasinos = [
  {
    rank: 1,
    name: "VulkanVegas",
    rating: 4.9,
    minDeposit: "10€",
    withdrawalTime: "6-12h",
    bonus: "1.000€ + 125 FS",
    features: ["Trustly Auszahlung", "Alle Banken", "Kein Bonus-Ausschluss"],
    highlighted: true
  },
  {
    rank: 2,
    name: "JoyCasino",
    rating: 4.8,
    minDeposit: "10€",
    withdrawalTime: "12-24h",
    bonus: "500€ + 200 FS",
    features: ["Skrill/Neteller", "Sparkasse OK", "Schnelle KYC"],
    highlighted: false
  },
  {
    rank: 3,
    name: "WildFortune",
    rating: 4.7,
    minDeposit: "20€",
    withdrawalTime: "24h",
    bonus: "300€ + 100 FS",
    features: ["Banküberweisung", "ING kompatibel", "24/7 Support"],
    highlighted: false
  },
  {
    rank: 4,
    name: "GoldStar",
    rating: 4.6,
    minDeposit: "15€",
    withdrawalTime: "12-48h",
    bonus: "400€ + 150 FS",
    features: ["E-Wallet Option", "DKB Support", "Live Casino"],
    highlighted: false
  }
];

// Generate star rating HTML
function generateStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += '<svg class="filled" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>';
    } else {
      html += '<svg class="empty" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2"/></svg>';
    }
  }
  return html;
}

// Render casino cards (can be called if needed for dynamic content)
function renderCasinoCards() {
  const container = document.querySelector('.casino-list');
  if (!container) return;
  
  container.innerHTML = topCasinos.map(function(casino) {
    return `
      <div class="casino-card card-embossed ${casino.highlighted ? 'highlighted' : ''}">
        ${casino.highlighted ? '<div class="casino-top-badge">TOP WAHL</div>' : ''}
        <div class="casino-content">
          <div class="casino-main">
            <div class="casino-rank ${casino.rank === 1 ? 'gold-bg' : 'outline'}">${casino.rank}</div>
            <div class="casino-name">
              <h3>${casino.name}</h3>
              <div class="casino-stars">
                ${generateStars(casino.rating)}
                <span class="casino-rating">${casino.rating}</span>
              </div>
            </div>
          </div>
          <div class="casino-stats">
            <div class="casino-stat">
              <div class="casino-stat-label">Min. Einzahlung</div>
              <div class="casino-stat-value">${casino.minDeposit}</div>
            </div>
            <div class="casino-stat">
              <div class="casino-stat-label">Auszahlung</div>
              <div class="casino-stat-value emerald">${casino.withdrawalTime}</div>
            </div>
            <div class="casino-stat">
              <div class="casino-stat-label">Bonus</div>
              <div class="casino-stat-value gold">${casino.bonus}</div>
            </div>
          </div>
          <div class="casino-features">
            ${casino.features.map(function(f) { return '<span class="feature-tag">' + f + '</span>'; }).join('')}
          </div>
          <div class="casino-cta">
            <button class="btn-gold">Zum Casino</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
