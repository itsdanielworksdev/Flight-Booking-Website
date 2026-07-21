/* ============================================================
   SKYWINGS - Premium Flight Booking | Main JavaScript v2.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initThemeToggle();
  initScrollToTop();
  initSmoothScroll();
  initFlightSearch();
  initDestinationCards();
  initOfferCards();
  initCounters();
  initNewsletter();
  initFlightStatus();
  initWeatherWidget();
  initFAQ();
  initLanguageCurrency();
  initContactForm();
  initDashboard();
  initBookingFlow();
  initSeatSelection();
  initPaymentMethods();
  initPromoCode();
  initFlightResults();
  initAutoComplete();
  initScrollReveal();
  initPageTransition();
});

/* ===== PAGE TRANSITION ===== */
function initPageTransition() {
  document.body.classList.add('page-transition');
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ===== PRELOADER ===== */
function initPreloader() {
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 300);
    }
  });
  
  // Fallback: hide preloader after 3s even if load event is slow
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 3000);
}

/* ===== NAVIGATION ===== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggler = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('.navbar-nav');
  const overlay = document.querySelector('.nav-overlay');

  // Scroll effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        navbar?.classList.toggle('scrolled', scrolled);
        
        const scrollBtn = document.querySelector('.scroll-top');
        if (scrollBtn) {
          scrollBtn.classList.toggle('visible', window.scrollY > 300);
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile menu
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu?.classList.contains('active');
    toggler?.classList.toggle('active', isOpen);
    navMenu?.classList.toggle('active', isOpen);
    overlay?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    if (toggler) {
      toggler.setAttribute('aria-expanded', isOpen);
    }
  };

  toggler?.addEventListener('click', () => toggleMenu());
  overlay?.addEventListener('click', () => toggleMenu(false));

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Active link based on current page
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Escape key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
}

/* ===== THEME TOGGLE ===== */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('skywings-theme') || 'light';
  applyTheme(saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('skywings-theme', next);
    showToast(`Switched to ${next} mode`);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* ===== SCROLL TO TOP ===== */
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (btn) {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ===== FLIGHT SEARCH ===== */
function initFlightSearch() {
  const tabs = document.querySelectorAll('.search-tab');
  const returnGroup = document.getElementById('return-date-group');
  const searchForm = document.querySelector('.search-form');
  
  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      if (returnGroup) {
        returnGroup.style.display = tab.dataset.trip === 'roundtrip' ? '' : 'none';
      }
    });
  });

  // Set default dates
  const today = new Date();
  const departInput = document.getElementById('depart');
  const returnInput = document.getElementById('return');
  if (departInput && !departInput.value) {
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    departInput.value = nextWeek.toISOString().split('T')[0];
  }
  if (returnInput && !returnInput.value) {
    const twoWeeks = new Date(today);
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    returnInput.value = twoWeeks.toISOString().split('T')[0];
  }

  // Search submission  
  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('from')?.value.trim();
    const to = document.getElementById('to')?.value.trim();
    const depart = document.getElementById('depart')?.value;

    if (!from) { showToast('Please enter departure airport', 'error'); return; }
    if (!to) { showToast('Please enter destination airport', 'error'); return; }
    if (!depart) { showToast('Please select departure date', 'error'); return; }
    if (from === to) { showToast('Departure and destination must be different', 'error'); return; }

    showToast('Searching for flights...', 'success');
    setTimeout(() => {
      window.location.href = `flights.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${depart}`;
    }, 800);
  });
}

/* ===== AUTOCOMPLETE ===== */
function initAutoComplete() {
  if (typeof airports === 'undefined') return;
  
  document.querySelectorAll('.airport-input').forEach(input => {
    const wrapper = input.closest('.autocomplete-wrapper');
    const list = wrapper?.querySelector('.autocomplete-list');
    if (!wrapper || !list) return;

    input.addEventListener('input', () => {
      const val = input.value.toLowerCase().trim();
      if (val.length < 1) { list.classList.remove('active'); return; }

      const matches = airports
        .filter(a => a.city.toLowerCase().includes(val) || a.code.toLowerCase().includes(val))
        .slice(0, 5);

      if (matches.length === 0) { list.classList.remove('active'); return; }

      list.innerHTML = matches.map(a => `
        <button type="button" class="autocomplete-item" data-code="${a.code}" data-city="${a.city}">
          <span class="airport-code">${a.code}</span>
          <span class="airport-name">${a.city}, ${a.country}</span>
        </button>
      `).join('');
      list.classList.add('active');
    });

    // Delegate clicks
    list.addEventListener('click', (e) => {
      const item = e.target.closest('.autocomplete-item');
      if (item) {
        input.value = item.dataset.code;
        list.classList.remove('active');
        input.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) list.classList.remove('active');
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
      const items = list.querySelectorAll('.autocomplete-item');
      const active = list.querySelector('.autocomplete-item:hover, .autocomplete-item:focus');
      let idx = Array.from(items).indexOf(active);
      
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, items.length - 1); items[idx]?.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); items[idx]?.focus(); }
      if (e.key === 'Enter' && active) { active.click(); }
    });
  });
}

/* ===== DESTINATION / OFFER CARDS ===== */
function initDestinationCards() {
  document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name || card.querySelector('h3')?.textContent || 'destination';
      const dest = destinations?.find(d => d.name === name);
      if (dest) {
        showToast(`✈ ${name} from ${dest.price}! Check flights for details.`);
      } else {
        showToast(`Exploring ${name}!`);
      }
    });
  });
}

function initOfferCards() {
  document.querySelectorAll('.offer-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Offer applied! Check flights for details.', 'success');
    });
  });
}

/* ===== COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target) || 0;
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString() + '+';
      clearInterval(timer);
    } else {
      el.textContent = current.toLocaleString();
    }
  }, 25);
}

/* ===== NEWSLETTER ===== */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = input?.value.trim();
    
    if (!email) { showToast('Please enter your email address', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email address', 'error'); return; }
    
    showToast('Successfully subscribed to our newsletter!', 'success');
    input.value = '';
  });
}

/* ===== FLIGHT STATUS ===== */
function initFlightStatus() {
  const container = document.querySelector('.flight-status-list');
  if (!container) return;
  
  if (typeof flightStatuses === 'undefined') {
    container.innerHTML = '<p style="color:var(--gray-400);text-align:center;padding:20px">Flight status data unavailable</p>';
    return;
  }

  container.innerHTML = flightStatuses.map(fs => `
    <div class="status-item">
      <div>
        <div class="status-flight">${escapeHtml(fs.flight)}</div>
        <div class="status-route">${escapeHtml(fs.route)}</div>
      </div>
      <span class="status-badge ${fs.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(fs.status)}</span>
    </div>
  `).join('');
}

/* ===== WEATHER WIDGET ===== */
function initWeatherWidget() {
  const container = document.querySelector('.weather-data');
  if (!container) return;

  const city = container.dataset.city || 'Lagos';
  
  if (typeof weatherData === 'undefined' || !weatherData[city]) {
    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div class="weather-city">${city}</div>
          <div class="weather-temp">--°C</div>
          <div class="weather-desc">Weather data unavailable</div>
        </div>
        <i class="fas fa-cloud-sun weather-icon"></i>
      </div>
    `;
    return;
  }

  const w = weatherData[city];
  container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div>
        <div class="weather-city">${city}</div>
        <div class="weather-temp">${w.temp}</div>
        <div class="weather-desc">${w.desc}</div>
      </div>
      <i class="fas ${w.icon || 'fa-cloud-sun'} weather-icon"></i>
    </div>
  `;
}

/* ===== FAQ ===== */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });

    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}

/* ===== LANGUAGE / CURRENCY ===== */
function initLanguageCurrency() {
  document.querySelectorAll('.selector-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      // Close other menus
      document.querySelectorAll('.selector-menu.active').forEach(m => {
        if (m !== menu) m.classList.remove('active');
      });
      menu?.classList.toggle('active');
      
      // Update aria-expanded
      const isExpanded = menu?.classList.contains('active');
      trigger.setAttribute('aria-expanded', isExpanded);
    });
  });

  document.querySelectorAll('.selector-item').forEach(item => {
    item.addEventListener('click', () => {
      const menu = item.closest('.selector-menu');
      menu?.querySelectorAll('.selector-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      menu?.classList.remove('active');
      
      const trigger = menu?.previousElementSibling;
      if (trigger) {
        trigger.innerHTML = `${item.textContent.trim()} <i class="fas fa-chevron-down"></i>`;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.selector-menu.active').forEach(m => {
      m.classList.remove('active');
      const trigger = m.previousElementSibling;
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${escapeHtml(message)}</span>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  // Limit to 3 toasts
  while (container.children.length > 3) {
    container.firstChild.remove();
  }

  // Auto-remove
  const remove = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', remove);
  setTimeout(remove, 4000);
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"], input[type="text"]')?.value.trim();
    const email = form.querySelector('[type="email"]')?.value.trim();
    const message = form.querySelector('textarea')?.value.trim();

    if (!name) { showToast('Please enter your name', 'error'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email', 'error'); return; }
    if (!message) { showToast('Please enter your message', 'error'); return; }

    showToast('Message sent successfully! We will get back to you soon.', 'success');
    form.reset();
  });
}

/* ===== DASHBOARD ===== */
function initDashboard() {
  const menuLinks = document.querySelectorAll('.dashboard-menu a');
  if (menuLinks.length === 0) return;

  // Tab switching
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const tab = link.dataset.tab;
      document.querySelectorAll('.dashboard-tab-content').forEach(c => c.style.display = 'none');
      const target = document.getElementById(`tab-${tab}`);
      if (target) target.style.display = 'block';
    });
  });

  // Load stats
  if (typeof currentUser !== 'undefined') {
    const stats = {
      'stat-trips': currentUser.upcomingTrips,
      'stat-bookings': currentUser.totalBookings,
      'stat-passengers': currentUser.savedPassengers,
      'stat-favs': currentUser.favoriteDestinations
    };
    Object.entries(stats).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
    
    // Set user name
    const userName = document.getElementById('dashboard-user-name');
    if (userName) userName.textContent = currentUser.name;
  }

  // Booking history (both containers)
  ['booking-history-list', 'booking-history-list-full'].forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container && typeof bookingHistory !== 'undefined') {
      container.innerHTML = bookingHistory.map(b => `
        <div class="booking-history-item">
          <div class="history-icon"><i class="fas fa-plane"></i></div>
          <div class="history-info">
            <h4>${escapeHtml(b.route)}</h4>
            <p>${escapeHtml(b.date)} - ${escapeHtml(b.airline)}</p>
          </div>
          <div class="hist-status">
            <span class="s ${b.status}">${escapeHtml(b.status)}</span>
            <span class="stat-number" style="font-size:1rem;margin-top:4px">${escapeHtml(b.price)}</span>
          </div>
        </div>
      `).join('');
    }
  });

  // Notifications
  const notifContainer = document.getElementById('notifications-list');
  if (notifContainer && typeof notifications !== 'undefined') {
    notifContainer.innerHTML = notifications.map(n => `
      <div class="notification-item${n.read ? '' : ' unread'}">
        <div class="notif-icon"><i class="fas fa-bell"></i></div>
        <div class="notif-content">
          <p>${escapeHtml(n.message)}</p>
          <span class="time">${escapeHtml(n.time)}</span>
        </div>
      </div>
    `).join('');
  }

  // Saved passengers
  const passengerContainer = document.getElementById('passengers-list');
  if (passengerContainer && typeof savedPassengers !== 'undefined') {
    passengerContainer.innerHTML = savedPassengers.map(p => `
      <div class="passenger-card">
        <div class="passenger-avatar"><i class="fas fa-user"></i></div>
        <div class="passenger-info">
          <h4>${escapeHtml(p.name)}</h4>
          <p>${escapeHtml(p.type)} - ${escapeHtml(p.document)}</p>
        </div>
      </div>
    `).join('');
  }
}

/* ===== BOOKING FLOW ===== */
function initBookingFlow() {
  // Step navigation
  document.querySelectorAll('.booking-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = btn.closest('.booking-section');
      const next = current?.nextElementSibling;
      if (next && next.classList.contains('booking-section')) {
        current.style.display = 'none';
        next.style.display = 'block';
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Confirm booking
  const confirmBtn = document.getElementById('confirm-booking');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      showToast('Booking confirmed! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'pages/confirmation.html';
      }, 1200);
    });
  }
}

/* ===== SEAT SELECTION ===== */
function initSeatSelection() {
  document.querySelectorAll('.seat:not(.occupied)').forEach(seat => {
    seat.addEventListener('click', () => {
      // Limit selection to 1 seat (single passenger)
      document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
      seat.classList.add('selected');
      
      const seatDisplay = document.getElementById('selected-seats');
      if (seatDisplay) {
        seatDisplay.textContent = `Seat ${seat.dataset.seat || seat.textContent} selected`;
      }
    });
  });
}

/* ===== PAYMENT METHODS ===== */
function initPaymentMethods() {
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
    });
  });
}

/* ===== PROMO CODE ===== */
function initPromoCode() {
  document.querySelectorAll('.promo-apply').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('promo-input') || btn.previousElementSibling;
      if (!input?.value?.trim()) { showToast('Please enter a promo code', 'warning'); return; }

      const code = input.value.trim().toUpperCase();
      const validCodes = { 'FLY30': 0.7, 'WELCOME20': 0.8, 'SKYWINGS': 0.85 };

      if (validCodes[code]) {
        const discount = Math.round((1 - validCodes[code]) * 100);
        showToast(`Promo code applied! ${discount}% discount!`, 'success');
        
        const fareTotal = document.querySelector('.fare-total .value');
        if (fareTotal) {
          const current = parseFloat(fareTotal.textContent.replace(/[^0-9.]/g, ''));
          if (current) {
            fareTotal.textContent = `$${(current * validCodes[code]).toFixed(0)}`;
          }
        }
      } else {
        showToast('Invalid promo code. Try FLY30 or WELCOME20', 'error');
      }
    });
  });
}

/* ===== FLIGHT RESULTS ===== */
function initFlightResults() {
  const container = document.getElementById('flight-results-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');
  const to = params.get('to');

  // Show loading skeleton
  container.innerHTML = Array(3).fill('').map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-line w-75 h4"></div>
      <div class="skeleton skeleton-line w-50"></div>
      <div class="skeleton skeleton-line w-100"></div>
      <div class="skeleton skeleton-line w-25"></div>
    </div>
  `).join('');

  // Simulate loading delay
  setTimeout(() => {
    // Update header with search params
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount && typeof flights !== 'undefined') {
      let text = `<strong>${flights.length}</strong> flights found`;
      if (from && to && typeof airports !== 'undefined') {
        const fromAirport = airports.find(a => a.code === from);
        const toAirport = airports.find(a => a.code === to);
        text += ` from <strong>${fromAirport?.city || from}</strong> to <strong>${toAirport?.city || to}</strong>`;
      }
      resultsCount.innerHTML = text;
    }

    renderFlights(typeof flights !== 'undefined' ? flights : []);

    // Sort
    const sortSelect = document.getElementById('sort-flights');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        if (typeof flights === 'undefined') return;
        const sorted = [...flights];
        const by = sortSelect.value;
        if (by === 'price') sorted.sort((a, b) => a.price - b.price);
        else if (by === 'duration') sorted.sort((a, b) => a.duration.localeCompare(b.duration));
        else if (by === 'departure') sorted.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        else if (by === 'airline') sorted.sort((a, b) => a.airline.localeCompare(b.airline));
        renderFlights(sorted);
      });
    }

    // Filter checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.addEventListener('change', applyFilters));

    // Price range
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    if (priceRange && priceDisplay) {
      priceRange.addEventListener('input', () => {
        priceDisplay.textContent = `$${Number(priceRange.value).toLocaleString()}`;
        applyFilters();
      });
    }
  }, 500);
}

function renderFlights(flightList) {
  const container = document.getElementById('flight-results-container');
  if (!container) return;

  if (!flightList || flightList.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px 20px">
        <i class="fas fa-plane-slash" style="font-size:3rem;color:var(--gray-400)"></i>
        <h3 style="margin-top:15px;color:var(--gray-600)">No flights found</h3>
        <p style="color:var(--gray-500)">Try adjusting your filters or search criteria</p>
        <button class="btn btn-sm" style="background:var(--secondary);color:var(--primary);margin-top:10px" onclick="clearAllFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = flightList.map(flight => {
    const airline = typeof airlines !== 'undefined' ? airlines.find(a => a.code === flight.airline) : null;
    const stopsText = flight.stops === 0 ? 'Direct' : flight.stops === 1 ? '1 Stop' : `${flight.stops} Stops`;
    const stopsClass = flight.stops === 0 ? 'on-time' : 'delayed';

    return `
      <div class="flight-card reveal" role="button" tabindex="0" data-flight-id="${flight.id}" aria-label="${airline?.name || flight.airline} flight ${flight.flightNumber} from ${flight.from} to ${flight.to}, $${flight.price}">
        <div class="flight-card-main">
          <div class="flight-airline">
            <div class="logo" aria-hidden="true">✈</div>
            <div class="name">${airline?.name || flight.airline}</div>
            <div class="fnum">${flight.flightNumber}</div>
          </div>
          <div class="flight-route">
            <div class="flight-time">
              <div class="time">${flight.departureTime}</div>
              <div class="airport">${flight.from}</div>
            </div>
            <div class="flight-duration">
              <div class="duration">${flight.duration}</div>
              <div class="line" aria-hidden="true"></div>
              <div class="stops"><span class="status-badge ${stopsClass}">${stopsText}</span></div>
            </div>
            <div class="flight-time">
              <div class="time">${flight.arrivalTime}</div>
              <div class="airport">${flight.to}</div>
            </div>
          </div>
          <div class="flight-price-section">
            <div class="price">$${flight.price}</div>
            <div class="label">${flight.cabinClass}</div>
            ${flight.seatsAvailable <= 5 ? `<div class="label" style="color:var(--error)">Only ${flight.seatsAvailable} left!</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers
  container.querySelectorAll('.flight-card').forEach(card => {
    const handler = () => {
      const id = card.dataset.flightId;
      window.location.href = `booking.html?flight=${id}`;
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') handler(); });
  });
  
  // Trigger scroll reveal for new cards
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

function applyFilters() {
  if (typeof flights === 'undefined') return;
  
  const selectedAirlines = [...document.querySelectorAll('.filter-airline:checked')].map(cb => cb.value);
  const selectedStops = [...document.querySelectorAll('.filter-stops:checked')].map(cb => parseInt(cb.value));
  const selectedClasses = [...document.querySelectorAll('.filter-class:checked')].map(cb => cb.value);
  const maxPrice = parseInt(document.getElementById('price-range')?.value) || 9999;

  let filtered = flights.filter(f => {
    if (selectedAirlines.length && !selectedAirlines.includes(f.airline)) return false;
    if (selectedStops.length && !selectedStops.includes(f.stops)) return false;
    if (selectedClasses.length && !selectedClasses.includes(f.cabinClass)) return false;
    return f.price <= maxPrice;
  });

  renderFlights(filtered);

  const count = document.querySelector('.results-count strong');
  if (count) count.textContent = filtered.length;
}

/* ===== CLEAR FILTERS ===== */
function clearAllFilters() {
  document.querySelectorAll('.filter-checkbox').forEach(c => c.checked = false);
  const range = document.getElementById('price-range');
  const display = document.getElementById('price-display');
  if (range) { range.value = range.max; }
  if (display) { display.textContent = `$${Number(range?.max || 2000).toLocaleString()}`; }
  applyFilters();
}

/* ===== UTILITY: ESCAPE HTML ===== */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}