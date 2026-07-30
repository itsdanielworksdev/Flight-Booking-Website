/* ============================================================
   SKYWINGS - Premium Flight Booking | Main JavaScript v2.1
   Professional Features: Auth, Comparison, Chat, etc.
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
  initAuthModal();
  initPriceCalendar();
  initFlightComparison();
  initWishlist();
  initCheckin();
  initLiveChat();
  initCookieConsent();
  initPriceAlerts();
  initMultiCity();
  initLoyaltyProgram();
  initReferralProgram();
  initBlogSection();
  initVisaChecker();
  initInvoice();
  initBookingTimeline();
  initBookingProgress();
  initSocialShare();
  showRecentFlights();
  initCancellation();
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
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

/* ===== PRELOADER ===== */
function initPreloader() {
  window.addEventListener('load', () => {
    const p = document.getElementById('preloader');
    if (p) setTimeout(() => p.classList.add('hidden'), 300);
  });
  setTimeout(() => {
    const p = document.getElementById('preloader');
    if (p && !p.classList.contains('hidden')) p.classList.add('hidden');
  }, 3000);
}

/* ===== NAVIGATION ===== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggler = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('.navbar-nav');
  const overlay = document.querySelector('.nav-overlay');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        navbar?.classList.toggle('scrolled', scrolled);
        const sBtn = document.querySelector('.scroll-top');
        if (sBtn) sBtn.classList.toggle('visible', window.scrollY > 300);
        ticking = false;
      });
      ticking = true;
    }
  });

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu?.classList.contains('active');
    toggler?.classList.toggle('active', isOpen);
    navMenu?.classList.toggle('active', isOpen);
    overlay?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (toggler) toggler.setAttribute('aria-expanded', isOpen);
  };

  toggler?.addEventListener('click', () => toggleMenu());
  overlay?.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });
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
    toggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* ===== SCROLL TO TOP ===== */
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
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

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      if (returnGroup) returnGroup.style.display = tab.dataset.trip === 'roundtrip' ? '' : 'none';
      // Show multi-city routes if needed
      const mcContainer = document.querySelector('.multi-city-container');
      if (mcContainer) mcContainer.style.display = tab.dataset.trip === 'multicity' ? 'block' : 'none';
    });
  });

  const today = new Date();
  const departInput = document.getElementById('depart');
  const returnInput = document.getElementById('return');
  if (departInput && !departInput.value) {
    const nw = new Date(today); nw.setDate(nw.getDate() + 7);
    departInput.value = nw.toISOString().split('T')[0];
  }
  if (returnInput && !returnInput.value) {
    const tw = new Date(today); tw.setDate(tw.getDate() + 14);
    returnInput.value = tw.toISOString().split('T')[0];
  }

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
      const matches = airports.filter(a => a.city.toLowerCase().includes(val) || a.code.toLowerCase().includes(val)).slice(0, 5);
      if (matches.length === 0) { list.classList.remove('active'); return; }
      list.innerHTML = matches.map(a => `
        <button type="button" class="autocomplete-item" data-code="${a.code}" data-city="${a.city}">
          <span class="airport-code">${a.code}</span>
          <span class="airport-name">${a.city}, ${a.country}</span>
        </button>
      `).join('');
      list.classList.add('active');
    });

    list.addEventListener('click', (e) => {
      const item = e.target.closest('.autocomplete-item');
      if (item) { input.value = item.dataset.code; list.classList.remove('active'); input.focus(); }
    });

    document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) list.classList.remove('active'); });

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
      if (dest) showToast(`✈ ${name} from ${dest.price}! Check flights for details.`);
      else showToast(`Exploring ${name}!`);
    });
  });
}

function initOfferCards() {
  document.querySelectorAll('.offer-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); showToast('Offer applied! Check flights for details.', 'success'); });
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
    if (current >= target) { el.textContent = target.toLocaleString() + '+'; clearInterval(timer); }
    else el.textContent = current.toLocaleString();
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
    container.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between"><div><div class="weather-city">${city}</div><div class="weather-temp">--°C</div><div class="weather-desc">Weather data unavailable</div></div><i class="fas fa-cloud-sun weather-icon"></i></div>`;
    return;
  }
  const w = weatherData[city];
  container.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between"><div><div class="weather-city">${city}</div><div class="weather-temp">${w.temp}</div><div class="weather-desc">${w.desc}</div></div><i class="fas ${w.icon || 'fa-cloud-sun'} weather-icon"></i></div>`;
}

/* ===== FAQ ===== */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
    question.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); question.click(); } });
  });
}

/* ===== LANGUAGE / CURRENCY ===== */
function initLanguageCurrency() {
  document.querySelectorAll('.selector-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      document.querySelectorAll('.selector-menu.active').forEach(m => { if (m !== menu) m.classList.remove('active'); });
      menu?.classList.toggle('active');
      trigger.setAttribute('aria-expanded', menu?.classList.contains('active'));
    });
  });
  document.querySelectorAll('.selector-item').forEach(item => {
    item.addEventListener('click', () => {
      const menu = item.closest('.selector-menu');
      menu?.querySelectorAll('.selector-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      menu?.classList.remove('active');
      const trigger = menu?.previousElementSibling;
      if (trigger) { trigger.innerHTML = `${item.textContent.trim()} <i class="fas fa-chevron-down"></i>`; trigger.setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.selector-menu.active').forEach(m => {
      m.classList.remove('active');
      const t = m.previousElementSibling; if (t) t.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${escapeHtml(message)}</span><button class="toast-close" aria-label="Close notification">&times;</button>`;
  container.appendChild(toast);
  while (container.children.length > 3) container.firstChild.remove();
  const remove = () => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); };
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

  if (typeof currentUser !== 'undefined') {
    const stats = { 'stat-trips': currentUser.upcomingTrips, 'stat-bookings': currentUser.totalBookings, 'stat-passengers': currentUser.savedPassengers, 'stat-favs': currentUser.favoriteDestinations };
    Object.entries(stats).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.textContent = val; });
    const userName = document.getElementById('dashboard-user-name');
    if (userName) userName.textContent = currentUser.name;
  }

  ['booking-history-list', 'booking-history-list-full'].forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container && typeof bookingHistory !== 'undefined') {
      container.innerHTML = bookingHistory.map(b => `
        <div class="booking-history-item">
          <div class="history-icon"><i class="fas fa-plane"></i></div>
          <div class="history-info"><h4>${escapeHtml(b.route)}</h4><p>${escapeHtml(b.date)} - ${escapeHtml(b.airline)}</p></div>
          <div class="hist-status"><span class="s ${b.status}">${escapeHtml(b.status)}</span><span class="stat-number" style="font-size:1rem;margin-top:4px">${escapeHtml(b.price)}</span></div>
        </div>
      `).join('');
    }
  });

  const notifContainer = document.getElementById('notifications-list');
  if (notifContainer && typeof notifications !== 'undefined') {
    notifContainer.innerHTML = notifications.map(n => `
      <div class="notification-item${n.read ? '' : ' unread'}">
        <div class="notif-icon"><i class="fas fa-bell"></i></div>
        <div class="notif-content"><p>${escapeHtml(n.message)}</p><span class="time">${escapeHtml(n.time)}</span></div>
      </div>
    `).join('');
  }

  const passengerContainer = document.getElementById('passengers-list');
  if (passengerContainer && typeof savedPassengers !== 'undefined') {
    passengerContainer.innerHTML = savedPassengers.map(p => `
      <div class="passenger-card">
        <div class="passenger-avatar"><i class="fas fa-user"></i></div>
        <div class="passenger-info"><h4>${escapeHtml(p.name)}</h4><p>${escapeHtml(p.type)} - ${escapeHtml(p.document)}</p></div>
      </div>
    `).join('');
  }
}

/* ===== BOOKING FLOW ===== */
function initBookingFlow() {
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

  const confirmBtn = document.getElementById('confirm-booking');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      showToast('Booking confirmed! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'pages/confirmation.html'; }, 1200);
    });
  }
}

/* ===== SEAT SELECTION ===== */
function initSeatSelection() {
  document.querySelectorAll('.seat:not(.occupied)').forEach(seat => {
    seat.addEventListener('click', () => {
      document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
      seat.classList.add('selected');
      const seatDisplay = document.getElementById('selected-seats');
      if (seatDisplay) seatDisplay.textContent = `Seat ${seat.dataset.seat || seat.textContent} selected`;
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
          if (current) fareTotal.textContent = `$${(current * validCodes[code]).toFixed(0)}`;
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

  container.innerHTML = Array(3).fill('').map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-line w-75 h4"></div>
      <div class="skeleton skeleton-line w-50"></div>
      <div class="skeleton skeleton-line w-100"></div>
      <div class="skeleton skeleton-line w-25"></div>
    </div>
  `).join('');

  setTimeout(() => {
    const resultsCount = document.querySelector('.results-count');
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const to = params.get('to');

    if (resultsCount && typeof flights !== 'undefined') {
      let text = `<strong>${flights.length}</strong> flights found`;
      if (from && to && typeof airports !== 'undefined') {
        const f = airports.find(a => a.code === from);
        const t = airports.find(a => a.code === to);
        text += ` from <strong>${f?.city || from}</strong> to <strong>${t?.city || to}</strong>`;
      }
      resultsCount.innerHTML = text;
    }

    renderFlights(typeof flights !== 'undefined' ? flights : []);

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

    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.addEventListener('change', applyFilters));
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
        <button class="wishlist-btn" data-flight-id="${flight.id}" aria-label="Save to wishlist" onclick="event.stopPropagation();toggleWishlist(${flight.id})"><i class="far fa-heart"></i></button>
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
            <div style="display:flex;gap:6px;margin-top:6px;justify-content:flex-end">
              <button class="btn btn-sm btn-outline" style="border-color:var(--gray-300);color:var(--gray-500);padding:6px 12px;font-size:0.75rem" onclick="event.stopPropagation();addToCompare(${flight.id})"><i class="fas fa-plus"></i> Compare</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.flight-card').forEach(card => {
    const handler = () => { const id = card.dataset.flightId; window.location.href = `booking.html?flight=${id}`; };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') handler(); });
  });

  if (typeof initScrollReveal === 'function') initScrollReveal();
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
  if (range) range.value = range.max;
  if (display) display.textContent = `$${Number(range?.max || 2000).toLocaleString()}`;
  applyFilters();
}

/* ===== UTILITY: ESCAPE HTML ===== */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ============================================================
   NEW PROFESSIONAL FEATURES v2.1
   ============================================================ */

/* ===== AUTH MODAL ===== */
function initAuthModal() {
  // Create auth modal HTML and inject into body
  const authHTML = `
  <div class="auth-overlay" id="auth-overlay">
    <div class="auth-modal">
      <button class="auth-close" id="auth-close" aria-label="Close">&times;</button>
      <h2 id="auth-title">Welcome Back</h2>
      <p class="subtitle" id="auth-subtitle">Sign in to access your account and manage bookings</p>
      <div class="auth-tabs">
        <div class="auth-tab active" data-auth="login">Sign In</div>
        <div class="auth-tab" data-auth="register">Create Account</div>
      </div>
      <form class="auth-form" id="auth-form">
        <div id="auth-fields">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="auth-email" placeholder="Enter your email" required>
          </div>
          <div class="form-group password-toggle">
            <label>Password</label>
            <input type="password" id="auth-password" placeholder="Enter your password" required>
            <button type="button" class="toggle-btn" onclick="togglePassword()"><i class="fas fa-eye"></i></button>
          </div>
          <div class="forgot-password"><a href="#">Forgot password?</a></div>
        </div>
        <button type="submit" class="btn btn-secondary btn-lg" id="auth-submit">Sign In</button>
      </form>
      <div class="auth-divider">Or continue with</div>
      <div class="social-login">
        <button class="social-login-btn" id="google-login-btn"><i class="fab fa-google"></i> Google</button>
        <button class="social-login-btn" onclick="showToast('Facebook login coming soon','info')"><i class="fab fa-facebook-f"></i> Facebook</button>
        <button class="social-login-btn" onclick="showToast('Apple login coming soon','info')"><i class="fab fa-apple"></i> Apple</button>
      </div>
      <div id="g_id_onload" data-client_id="YOUR_GOOGLE_CLIENT_ID" data-context="signin" data-ux_mode="popup" data-callback="handleGoogleCredentialResponse" data-auto_prompt="false" style="display:none"></div>
      <div class="auth-switch" id="auth-switch">
        Don't have an account? <a id="auth-toggle-link">Create one</a>
      </div>
    </div>
  </div>`;

  // Inject if not exists
  if (!document.getElementById('auth-overlay')) {
    document.body.insertAdjacentHTML('beforeend', authHTML);
  }

  // Add sign in button to nav
  const navActions = document.querySelector('.nav-actions');
  if (navActions && !document.getElementById('auth-trigger')) {
    const signInBtn = document.createElement('button');
    signInBtn.id = 'auth-trigger';
    signInBtn.className = 'btn btn-sm';
    signInBtn.style.cssText = 'background:var(--secondary);color:var(--primary);padding:8px 16px;border-radius:var(--radius-full);font-weight:600;font-size:0.8rem';
    signInBtn.innerHTML = '<i class="fas fa-user"></i> Sign In';
    signInBtn.addEventListener('click', openAuthModal);
    navActions.appendChild(signInBtn);
  }

  // Google Sign-In handler
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      // Check if Google Identity Services is loaded
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.prompt(); // Trigger One Tap
      } else {
        // Fallback: load the GIS script dynamically and then prompt
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: handleGoogleCredentialResponse
          });
          google.accounts.id.prompt();
        };
        document.head.appendChild(script);
      }
    });
  }

  // Modal controls
  const overlay = document.getElementById('auth-overlay');
  const closeBtn = document.getElementById('auth-close');
  const tabs = document.querySelectorAll('.auth-tab');
  const form = document.getElementById('auth-form');
  const toggleLink = document.getElementById('auth-toggle-link');
  let isLogin = true;

  function resetAuthForm() {
    document.getElementById('auth-title').textContent = isLogin ? 'Welcome Back' : 'Create Account';
    document.getElementById('auth-subtitle').textContent = isLogin ? 'Sign in to access your account and manage bookings' : 'Join SkyWings and start booking flights worldwide';
    document.getElementById('auth-submit').innerHTML = isLogin ? '<i class="fas fa-sign-in-alt"></i> Sign In' : '<i class="fas fa-user-plus"></i> Create Account';
    document.getElementById('auth-fields').innerHTML = isLogin ? `
      <div class="form-group"><label>Email Address</label><input type="email" id="auth-email" placeholder="Enter your email" required></div>
      <div class="form-group password-toggle"><label>Password</label><input type="password" id="auth-password" placeholder="Enter your password" required><button type="button" class="toggle-btn" onclick="togglePassword()"><i class="fas fa-eye"></i></button></div>
      <div class="forgot-password"><a href="#">Forgot password?</a></div>
    ` : `
      <div class="form-group"><label>Full Name</label><input type="text" id="auth-name" placeholder="Enter your full name" required></div>
      <div class="form-group"><label>Email Address</label><input type="email" id="auth-email" placeholder="Enter your email" required></div>
      <div class="form-group password-toggle"><label>Password</label><input type="password" id="auth-password" placeholder="Create a password" required><button type="button" class="toggle-btn" onclick="togglePassword()"><i class="fas fa-eye"></i></button></div>
      <div class="form-group"><label>Phone Number</label><input type="tel" id="auth-phone" placeholder="+234 XXX XXX XXXX"></div>
    `;
    document.getElementById('auth-switch').innerHTML = isLogin ? `Don't have an account? <a id="auth-toggle-link">Create one</a>` : `Already have an account? <a id="auth-toggle-link">Sign in</a>`;
    document.getElementById('auth-toggle-link').addEventListener('click', () => { isLogin = !isLogin; resetAuthForm(); });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      isLogin = tab.dataset.auth === 'login';
      resetAuthForm();
    });
  });

  toggleLink?.addEventListener('click', () => { isLogin = !isLogin; resetAuthForm(); });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value.trim();
    if (!email || !password) { showToast('Please fill in all fields', 'error'); return; }
    if (!isLogin) {
      const name = document.getElementById('auth-name')?.value.trim();
      if (!name) { showToast('Please enter your name', 'error'); return; }
    }
    showToast(isLogin ? 'Signed in successfully!' : 'Account created successfully!', 'success');
    document.getElementById('auth-trigger').innerHTML = '<i class="fas fa-user"></i> My Account';
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  closeBtn?.addEventListener('click', closeAuthModal);
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeAuthModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuthModal(); });
}

function openAuthModal() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthModal() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function togglePassword() {
  const input = document.getElementById('auth-password');
  if (input) {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    const btn = input.nextElementSibling;
    if (btn) btn.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  }
}

/* ===== PRICE CALENDAR ===== */
function initPriceCalendar() {
  const container = document.getElementById('price-calendar');
  if (!container) return;

  const now = new Date();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();

  function generateCalendar() {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();

    // Generate mock prices for each day
    const prices = {};
    for (let d = 1; d <= daysInMonth; d++) {
      prices[d] = Math.floor(Math.random() * 400) + 350;
    }

    let html = `
      <div class="calendar-header">
        <h3>${months[currentMonth]} ${currentYear}</h3>
        <div class="calendar-nav">
          <button onclick="changeMonth(-1)" aria-label="Previous month"><i class="fas fa-chevron-left"></i></button>
          <button onclick="changeMonth(1)" aria-label="Next month"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="calendar-grid">
        ${days.map(d => `<div class="calendar-day-header">${d}</div>`).join('')}
    `;

    for (let i = 0; i < firstDay; i++) html += '<div></div>';

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday = dateObj.toDateString() === today.toDateString();
      const bestPrice = prices[d] < 400;
      const cls = `${isPast ? 'disabled' : ''} ${isToday ? 'today' : ''} ${bestPrice ? 'best-price' : ''}`;
      html += `<div class="calendar-day ${cls}" onclick="${isPast ? '' : `selectCalendarDay(this, '${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}')`}">
        ${d}<span class="price-tag">$${prices[d]}</span>
      </div>`;
    }

    html += '</div><div class="calendar-legend"><div class="legend-item"><div class="legend-dot best"></div> Best Price</div><div class="legend-item"><div class="legend-dot normal"></div> Available</div></div>';
    container.innerHTML = html;
  }

  window.changeMonth = (delta) => {
    currentMonth += delta;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    generateCalendar();
  };

  window.selectCalendarDay = (el, date) => {
    const prev = container.querySelector('.calendar-day.selected');
    if (prev) prev.classList.remove('selected');
    el.classList.add('selected');
    showToast(`Selected ${date} - check flights for pricing`, 'info');
  };

  generateCalendar();
}

/* ===== FLIGHT COMPARISON ===== */
let compareList = [];
function initFlightComparison() {
  // Create compare bar if not exists
  if (!document.querySelector('.compare-bar') && !document.getElementById('flight-results-container')) return;

  // Add to flights page after results
  const container = document.getElementById('flight-results-container');
  if (container && !document.querySelector('.compare-bar')) {
    const bar = document.createElement('div');
    bar.className = 'compare-bar';
    bar.id = 'compare-bar';
    bar.innerHTML = `<div class="container">
      <div style="font-weight:600;font-size:0.85rem;white-space:nowrap;color:var(--gray-600)"><i class="fas fa-balance-scale"></i> Compare Flights</div>
      <div class="compare-flights" id="compare-flights-list"></div>
      <div class="compare-actions">
        <button class="btn btn-sm btn-secondary" onclick="openCompareModal()" style="display:none" id="compare-btn"><i class="fas fa-chart-bar"></i> View Comparison</button>
        <button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-500)" onclick="clearCompare()">Clear All</button>
      </div>
    </div>`;
    document.body.appendChild(bar);
  }
}

function addToCompare(flightId) {
  if (typeof flights === 'undefined') return;
  const flight = flights.find(f => f.id === flightId);
  if (!flight) return;
  if (compareList.find(f => f.id === flightId)) { showToast('Flight already in comparison', 'warning'); return; }
  if (compareList.length >= 3) { showToast('Maximum 3 flights can be compared', 'error'); return; }
  compareList.push(flight);
  updateCompareBar();
  document.querySelector('.compare-bar')?.classList.add('active');
}

function removeFromCompare(flightId) {
  compareList = compareList.filter(f => f.id !== flightId);
  updateCompareBar();
  if (compareList.length === 0) document.querySelector('.compare-bar')?.classList.remove('active');
}

function clearCompare() {
  compareList = [];
  updateCompareBar();
  document.querySelector('.compare-bar')?.classList.remove('active');
}

function updateCompareBar() {
  const list = document.getElementById('compare-flights-list');
  const btn = document.getElementById('compare-btn');
  if (!list) return;

  if (compareList.length === 0) {
    list.innerHTML = '<span style="color:var(--gray-400);font-size:0.85rem">Click "Compare" on flight cards to add</span>';
    if (btn) btn.style.display = 'none';
    return;
  }

  list.innerHTML = compareList.map(f => {
    const airline = typeof airlines !== 'undefined' ? airlines.find(a => a.code === f.airline) : null;
    return `<div class="compare-flight-item">
      <span>${airline?.name || f.airline} - $${f.price}</span>
      <span class="remove" onclick="removeFromCompare(${f.id})">&times;</span>
    </div>`;
  }).join('');
  if (btn) btn.style.display = 'inline-flex';
}

function openCompareModal() {
  if (compareList.length < 2) { showToast('Add at least 2 flights to compare', 'warning'); return; }

  let modal = document.getElementById('compare-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'compare-modal';
    modal.id = 'compare-modal';
    document.body.appendChild(modal);
  }

  const rows = [
    { label: 'Airline', key: 'airline', fn: (f) => { const a = typeof airlines !== 'undefined' ? airlines.find(air => air.code === f.airline) : null; return a?.name || f.airline; } },
    { label: 'Flight', key: 'flightNumber' },
    { label: 'Route', fn: (f) => `${f.from} → ${f.to}` },
    { label: 'Departure', key: 'departureTime' },
    { label: 'Arrival', key: 'arrivalTime' },
    { label: 'Duration', key: 'duration' },
    { label: 'Stops', fn: (f) => f.stops === 0 ? 'Direct' : `${f.stops} Stop(s)` },
    { label: 'Price', fn: (f) => `<span class="highlight">$${f.price}</span>` },
    { label: 'Cabin', key: 'cabinClass' },
    { label: 'Baggage', key: 'baggage' },
    { label: 'Seats Left', fn: (f) => f.seatsAvailable <= 5 ? `<span style="color:var(--error)">${f.seatsAvailable}</span>` : f.seatsAvailable },
    { label: 'Book', fn: (f) => `<button class="btn btn-sm btn-secondary" onclick="window.location.href='booking.html?flight=${f.id}'">Book Now</button>` }
  ];

  modal.innerHTML = `
    <div class="compare-table">
      <div class="compare-table-header">
        <h3><i class="fas fa-chart-bar"></i> Flight Comparison</h3>
        <button onclick="this.closest('.compare-modal').classList.remove('active')" style="font-size:1.5rem;color:var(--gray-400)">&times;</button>
      </div>
      <div class="compare-table-body">
        <table>
          ${rows.map(row => `
            <tr>
              <th>${row.label}</th>
              ${compareList.map(f => `<td>${row.fn ? row.fn(f) : f[row.key] || '-'}</td>`).join('')}
            </tr>
          `).join('')}
        </table>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

/* ===== WISHLIST ===== */
function initWishlist() {
  // Check for wishlist page
  if (document.querySelector('.wishlist-page')) {
    renderWishlistPage();
  }
}

let wishlist = JSON.parse(localStorage.getItem('skywings-wishlist')) || [];

function toggleWishlist(flightId) {
  const idx = wishlist.indexOf(flightId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    wishlist.push(flightId);
    showToast('Added to wishlist!', 'success');
  }
  localStorage.setItem('skywings-wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

function updateWishlistUI() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = parseInt(btn.dataset.flightId);
    btn.innerHTML = wishlist.includes(id) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    btn.classList.toggle('active', wishlist.includes(id));
  });
}

function renderWishlistPage() {
  const container = document.getElementById('wishlist-container');
  if (!container) return;

  if (wishlist.length === 0 || typeof flights === 'undefined') {
    container.innerHTML = `<div class="wishlist-empty"><i class="far fa-heart"></i><h3>Your wishlist is empty</h3><p>Save flights by clicking the heart icon on search results</p><a href="flights.html" class="btn btn-primary">Browse Flights</a></div>`;
    return;
  }

  const savedFlights = flights.filter(f => wishlist.includes(f.id));
  if (savedFlights.length === 0) {
    container.innerHTML = `<div class="wishlist-empty"><i class="far fa-heart"></i><h3>No saved flights found</h3><p>Some flights may no longer be available</p></div>`;
    return;
  }

  const containerDiv = document.createElement('div');
  containerDiv.className = 'destinations-grid';
  containerDiv.innerHTML = savedFlights.map(f => {
    const airline = typeof airlines !== 'undefined' ? airlines.find(a => a.code === f.airline) : null;
    return `
      <div class="flight-card" role="button" tabindex="0" onclick="window.location.href='booking.html?flight=${f.id}'" style="margin-bottom:0">
        <button class="wishlist-btn active" onclick="event.stopPropagation();toggleWishlist(${f.id})"><i class="fas fa-heart"></i></button>
        <div style="padding:10px 0;text-align:center">
          <div style="font-weight:700;font-size:1rem;color:var(--primary)">${f.from} → ${f.to}</div>
          <div style="font-size:0.85rem;color:var(--gray-500)">${airline?.name || f.airline} • ${f.duration}</div>
          <div style="font-size:1.4rem;font-weight:800;color:var(--secondary);margin-top:8px">$${f.price}</div>
        </div>
      </div>
    `;
  }).join('');
  container.appendChild(containerDiv);
}

/* ===== CHECK-IN ===== */
function initCheckin() {
  const form = document.getElementById('checkin-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookingRef = document.getElementById('checkin-ref')?.value.trim();
    const lastName = document.getElementById('checkin-lastname')?.value.trim();

    if (!bookingRef) { showToast('Please enter your booking reference', 'error'); return; }
    if (!lastName) { showToast('Please enter your last name', 'error'); return; }

    // Simulate check-in
    const result = document.getElementById('checkin-result');
    if (result) {
      result.classList.add('active');
      result.innerHTML = `
        <h4><i class="fas fa-check-circle"></i> Check-in Successful!</h4>
        <p><strong>Flight:</strong> EK 783 • Lagos → Dubai</p>
        <p><strong>Date:</strong> Jul 15, 2026</p>
        <p><strong>Seat:</strong> 3A</p>
        <p><strong>Boarding:</strong> 23:15 (Gate 12)</p>
        <p style="margin-top:8px;color:var(--success)">Your boarding pass has been generated. Show at the gate.</p>
      `;
      showToast('Check-in completed! Boarding pass ready.', 'success');
    }
  });
}

/* ===== LIVE CHAT ===== */
function initLiveChat() {
  const bubble = document.getElementById('chat-bubble');
  const window = document.getElementById('chat-window');
  if (!bubble || !window) return;

  const toggle = document.getElementById('chat-toggle');
  const close = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  bubble.addEventListener('click', () => window.classList.toggle('active'));
  close?.addEventListener('click', () => window.classList.remove('active'));

  function addMessage(text, isUser = false) {
    if (!messages) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = document.createElement('div');
    msg.className = `chat-msg ${isUser ? 'user' : 'support'}`;
    msg.innerHTML = `${text}<span class="time">${time}</span>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    const text = input?.value.trim();
    if (!text) return;
    addMessage(text, true);
    if (input) input.value = '';
    // Auto reply
    setTimeout(() => {
      const replies = [
        'Thank you for your message! How can I help you with your flight booking today?',
        'Great question! Let me check that for you. One moment please.',
        'I\'d be happy to assist you with that. Can you provide your booking reference?',
        'Sure! We have some great deals available. Would you like me to show you the best options?',
        'I understand your concern. Let me connect you with a specialist who can help further.'
      ];
      addMessage(replies[Math.floor(Math.random() * replies.length)]);
    }, 1000 + Math.random() * 1500);
  }

  send?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
}

/* ===== COOKIE CONSENT ===== */
function initCookieConsent() {
  const banner = document.getElementById('cookie-consent');
  if (!banner) return;

  const accepted = localStorage.getItem('skywings-cookies');
  if (accepted) return;

  setTimeout(() => {
    banner.classList.add('active');
  }, 1000);

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('skywings-cookies', 'accepted');
    banner.classList.remove('active');
    showToast('Cookies preferences saved', 'success');
  });

  document.getElementById('cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('skywings-cookies', 'declined');
    banner.classList.remove('active');
  });
}

/* ===== PRICE ALERTS ===== */
function initPriceAlerts() {
  const form = document.getElementById('price-alert-form');
  if (!form) return;

  const alerts = JSON.parse(localStorage.getItem('skywings-alerts')) || [];
  renderAlerts(alerts);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('alert-from')?.value.trim();
    const to = document.getElementById('alert-to')?.value.trim();
    const price = document.getElementById('alert-price')?.value.trim();

    if (!from || !to) { showToast('Please enter both airports', 'error'); return; }
    if (!price || isNaN(price)) { showToast('Please enter a valid target price', 'error'); return; }

    const alert = { id: Date.now(), from, to, price: parseInt(price), created: new Date().toLocaleDateString() };
    alerts.push(alert);
    localStorage.setItem('skywings-alerts', JSON.stringify(alerts));
    renderAlerts(alerts);
    showToast(`Price alert set! We'll notify you when ${from} → ${to} drops below $${price}`, 'success');
    form.reset();
  });
}

function renderAlerts(alerts) {
  const container = document.getElementById('active-alerts');
  if (!container) return;

  if (alerts.length === 0) {
    container.innerHTML = '<p style="color:var(--gray-400);font-size:0.85rem">No active price alerts</p>';
    return;
  }

  container.innerHTML = alerts.map(a => `
    <div class="alert-item">
      <span class="route">${escapeHtml(a.from)} → ${escapeHtml(a.to)}</span>
      <span class="target">Target: $${a.price}</span>
      <span class="remove-alert" onclick="removeAlert(${a.id})">&times;</span>
    </div>
  `).join('');
}

function removeAlert(id) {
  let alerts = JSON.parse(localStorage.getItem('skywings-alerts')) || [];
  alerts = alerts.filter(a => a.id !== id);
  localStorage.setItem('skywings-alerts', JSON.stringify(alerts));
  renderAlerts(alerts);
  showToast('Price alert removed', 'info');
}

/* ===== MULTI-CITY ===== */
function initMultiCity() {
  const container = document.getElementById('multi-city-container');
  if (!container) return;
  let routeCount = 1;

  // Add initial route if empty
  if (container.children.length === 0) {
    addRoute(1);
  }

  document.getElementById('add-route')?.addEventListener('click', () => {
    routeCount++;
    addRoute(routeCount);
  });
}

function addRoute(num) {
  const container = document.getElementById('multi-city-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'multi-city-route';
  div.dataset.route = num;
  div.innerHTML = `
    <span class="route-number">Flight ${num}</span>
    ${num > 1 ? '<span class="remove-route" onclick="this.closest(\'.multi-city-route\').remove()">&times;</span>' : ''}
    <div class="form-row">
      <div class="form-group"><label>From</label><input type="text" class="airport-input" placeholder="Departure city"></div>
      <div class="form-group"><label>To</label><input type="text" class="airport-input" placeholder="Destination city"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Departure Date</label><input type="date"></div>
      <div class="form-group"><label>Departure Time</label><input type="time"></div>
    </div>
  `;
  container.appendChild(div);
}

/* ===== LOYALTY PROGRAM ===== */
function initLoyaltyProgram() {
  const container = document.getElementById('loyalty-card');
  if (!container) return;

  // Simulate loyalty data
  const points = Math.floor(Math.random() * 5000) + 500;
  const tier = points > 3000 ? 'Gold' : points > 1500 ? 'Silver' : 'Bronze';
  const nextTier = tier === 'Bronze' ? 'Silver' : tier === 'Silver' ? 'Gold' : 'Platinum';
  const progress = tier === 'Bronze' ? (points / 1500) * 100 : tier === 'Silver' ? ((points - 1500) / 1500) * 100 : 75;

  container.innerHTML = `
    <h3><i class="fas fa-crown"></i> SkyWings Rewards</h3>
    <div class="loyalty-points">${points.toLocaleString()}</div>
    <div class="loyalty-tier">${tier} Member</div>
    <div class="loyalty-progress"><div class="loyalty-progress-bar" style="width:${Math.min(progress, 100)}%"></div></div>
    <div class="loyalty-next">${Math.round((1500 - points % 1500))} points until ${nextTier}</div>
  `;
}

/* ===== REFERRAL PROGRAM ===== */
function initReferralProgram() {
  const container = document.getElementById('referral-card');
  if (!container) return;

  const referralCode = 'SKY-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  container.innerHTML = `
    <h3><i class="fas fa-gift"></i> Refer a Friend</h3>
    <p>Share your referral code and earn <strong>500 bonus points</strong> for each friend who books a flight!</p>
    <div class="referral-code">
      <input type="text" value="${referralCode}" id="referral-code" readonly>
      <button onclick="copyReferralCode()"><i class="fas fa-copy"></i> Copy</button>
    </div>
    <div class="referral-stats">
      <div class="referral-stat"><div class="num">${Math.floor(Math.random() * 10)}</div><div class="lbl">Invites Sent</div></div>
      <div class="referral-stat"><div class="num">${Math.floor(Math.random() * 5)}</div><div class="lbl">Friends Booked</div></div>
      <div class="referral-stat"><div class="num">${(Math.floor(Math.random() * 5000) + 500).toLocaleString()}</div><div class="lbl">Points Earned</div></div>
    </div>
  `;
}

function copyReferralCode() {
  const input = document.getElementById('referral-code');
  if (input) {
    input.select();
    document.execCommand('copy');
    showToast('Referral code copied!', 'success');
  }
}

/* ===== BLOG SECTION ===== */
function initBlogSection() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  const blogPosts = [
    { tag: 'Travel Tips', title: '10 Essential Tips for Stress-Free Air Travel', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop', desc: 'Expert advice to make your journey smoother from check-in to arrival.', date: 'Jul 18, 2026', read: '5 min read' },
    { tag: 'Destinations', title: 'Top 5 Must-Visit African Destinations This Year', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&h=250&fit=crop', desc: 'Discover breathtaking African destinations you need to add to your travel list.', date: 'Jul 14, 2026', read: '7 min read' },
    { tag: 'Deals', title: 'How to Find the Cheapest Flights Every Time', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop', desc: 'Pro strategies for scoring the best flight deals and saving money.', date: 'Jul 10, 2026', read: '6 min read' }
  ];

  container.innerHTML = `
    <div class="section-title reveal">
      <h2>Travel Blog & Tips</h2>
      <p>Insights, guides, and inspiration for your next journey</p>
    </div>
    <div class="blog-grid">
      ${blogPosts.map(post => `
        <div class="blog-card reveal">
          <div class="blog-image"><img src="${post.image}" alt="${post.title}" loading="lazy"></div>
          <div class="blog-content">
            <span class="blog-tag">${post.tag}</span>
            <h3>${post.title}</h3>
            <p>${post.desc}</p>
            <div class="blog-meta"><span>${post.date}</span><span>${post.read}</span></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Trigger scroll reveal for new elements
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

/* ===== VISA CHECKER ===== */
function initVisaChecker() {
  const form = document.getElementById('visa-checker-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nationality = document.getElementById('visa-nationality')?.value;
    const destination = document.getElementById('visa-destination')?.value;

    if (!nationality || !destination) { showToast('Please select both countries', 'error'); return; }

    const result = document.getElementById('visa-result');
    if (!result) return;

    // Mock visa data
    const visaData = {
      'Nigeria-UAE': { status: 'visa-required', title: 'Visa Required', msg: 'You need to apply for a UAE visa before travel. Processing takes 3-5 business days.' },
      'Nigeria-UK': { status: 'visa-required', title: 'Visa Required', msg: 'Standard Visitor visa required. Apply at least 3 weeks before travel.' },
      'Nigeria-Ghana': { status: 'visa-free', title: 'Visa Free', msg: 'No visa required for Ghanaian citizens. Valid passport needed. Stay up to 90 days.' },
      'US-UK': { status: 'visa-free', title: 'Visa Free', msg: 'No visa required for stays up to 6 months. ESTA authorization recommended.' },
      'Nigeria-France': { status: 'visa-required', title: 'Schengen Visa Required', msg: 'Schengen visa required. Apply at French embassy at least 15 days before travel.' },
      'Nigeria-Singapore': { status: 'visa-required', title: 'Visa Required', msg: 'Visa required. Apply through authorized visa agents.' }
    };

    const key = `${nationality}-${destination}`;
    const data = visaData[key] || { status: 'visa-on-arrival', title: 'Visa on Arrival', msg: 'Visa available on arrival. Check specific requirements with the airline.' };

    result.className = `visa-result active ${data.status}`;
    result.innerHTML = `<h4>${data.title}</h4><p>${data.msg}</p>`;
  });
}

/* ===== INVOICE ===== */
function initInvoice() {
  const btn = document.getElementById('download-invoice');
  if (btn) {
    btn.addEventListener('click', () => {
      showToast('Invoice downloaded as PDF', 'success');
    });
  }
  const btnPrint = document.getElementById('print-invoice');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }
}

/* ===== BOOKING TIMELINE ===== */
function initBookingTimeline() {
  const container = document.getElementById('booking-timeline');
  if (!container) return;

  const steps = [
    { title: 'Booking Confirmed', desc: 'Your flight has been booked', time: 'Today, 10:30 AM', status: 'completed' },
    { title: 'Payment Processed', desc: 'Payment of $945 confirmed', time: 'Today, 10:32 AM', status: 'completed' },
    { title: 'E-Ticket Issued', desc: 'Ticket sent to your email', time: 'Today, 10:35 AM', status: 'completed' },
    { title: 'Check-in Available', desc: 'Check-in opens 48hrs before', time: 'Jul 13, 2026', status: 'active' },
    { title: 'Departure Day', desc: 'Lagos → Dubai, EK 783', time: 'Jul 15, 2026 at 23:45', status: '' }
  ];

  container.innerHTML = `
    <h4 style="font-size:0.95rem;font-weight:600;color:var(--primary);margin-bottom:16px"><i class="fas fa-clock"></i> Your Booking Timeline</h4>
    <div class="booking-timeline">
      ${steps.map(s => `
        <div class="timeline-item ${s.status}">
          <div class="timeline-dot"></div>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
          <span class="time">${s.time}</span>
        </div>
      `).join('')}
    </div>
  `;
}

/* ===== FLIGHT DETAILS MODAL ===== */
function showFlightDetails(flightId) {
  if (typeof flights === 'undefined') return;
  const flight = flights.find(f => f.id === flightId);
  if (!flight) return;

  const airline = typeof airlines !== 'undefined' ? airlines.find(a => a.code === flight.airline) : null;

  let modal = document.getElementById('flight-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'compare-modal';
    modal.id = 'flight-detail-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="compare-table" style="max-width:560px">
      <div class="compare-table-header">
        <h3><i class="fas fa-plane"></i> ${airline?.name || flight.airline} • ${flight.flightNumber}</h3>
        <button onclick="this.closest('.compare-modal').classList.remove('active')" style="font-size:1.5rem;color:var(--gray-400)">&times;</button>
      </div>
      <div class="compare-table-body">
        <table>
          <tr><th>Route</th><td>${flight.from} → ${flight.to}</td></tr>
          <tr><th>Departure</th><td>${flight.departureTime} (${flight.departureDate})</td></tr>
          <tr><th>Arrival</th><td>${flight.arrivalTime} (${flight.arrivalDate})</td></tr>
          <tr><th>Duration</th><td>${flight.duration}</td></tr>
          <tr><th>Stops</th><td>${flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop(s)`}</td></tr>
          <tr><th>Aircraft</th><td>${airline?.name || flight.airline} ${flight.flightNumber.includes('7') ? 'Boeing 777-300ER' : flight.flightNumber.includes('6') ? 'Airbus A350-900' : 'Boeing 787-9 Dreamliner'}</td></tr>
          <tr><th>Cabin</th><td>${flight.cabinClass}</td></tr>
          <tr><th>Baggage</th><td>${flight.baggage}</td></tr>
          <tr><th>Meal Service</th><td>${flight.meal ? 'Complimentary meal & beverages' : 'Not included'}</td></tr>
          <tr><th>Wi-Fi</th><td>${flight.wifi ? 'Available for purchase' : 'Not available'}</td></tr>
          <tr><th>Entertainment</th><td>${flight.entertainment ? 'Personal seat-back screen' : 'Not available'}</td></tr>
          <tr><th>Seats Left</th><td>${flight.seatsAvailable} ${flight.seatsAvailable <= 5 ? '⚠️ Only few left!' : ''}</td></tr>
          <tr><th>Price</th><td><span class="highlight">$${flight.price}</span></td></tr>
          <tr><th></th><td><button class="btn btn-secondary" onclick="window.location.href='booking.html?flight=${flight.id}'"><i class="fas fa-shopping-cart"></i> Book This Flight</button></td></tr>
        </table>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

/* ===== BOOKING PROGRESS STEPPER ===== */
function initBookingProgress() {
  const stepper = document.getElementById('booking-stepper');
  if (!stepper) return;

  const steps = stepper.querySelectorAll('.step');
  const sections = document.querySelectorAll('.booking-section');

  function updateStepper() {
    let currentStep = 0;
    sections.forEach((section, i) => {
      if (section.style.display !== 'none') currentStep = i + 1;
    });

    steps.forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i + 1 < currentStep) step.classList.add('completed');
      else if (i + 1 === currentStep) step.classList.add('active');
    });
  }

  // Watch for next button clicks
  document.querySelectorAll('.booking-next').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(updateStepper, 50));
  });

  updateStepper();
}

/* ===== RECENTLY VIEWED FLIGHTS ===== */
function trackRecentFlight(flightId) {
  let recent = JSON.parse(localStorage.getItem('skywings-recent')) || [];
  recent = recent.filter(id => id !== flightId);
  recent.unshift(flightId);
  if (recent.length > 5) recent.pop();
  localStorage.setItem('skywings-recent', JSON.stringify(recent));
}

function showRecentFlights() {
  const container = document.getElementById('recent-flights');
  if (!container) return;

  const recent = JSON.parse(localStorage.getItem('skywings-recent')) || [];
  if (recent.length === 0 || typeof flights === 'undefined') {
    container.style.display = 'none';
    return;
  }

  const recentFlights = recent.map(id => flights.find(f => f.id === id)).filter(Boolean);
  if (recentFlights.length === 0) { container.style.display = 'none'; return; }

  container.style.display = 'block';
  container.innerHTML = `
    <h4 style="font-size:0.95rem;font-weight:600;color:var(--gray-600);margin-bottom:12px;display:flex;align-items:center;gap:8px"><i class="fas fa-history"></i> Recently Viewed</h4>
    <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:4px">
      ${recentFlights.map(f => {
        const a = typeof airlines !== 'undefined' ? airlines.find(air => air.code === f.airline) : null;
        return `<div class="flight-card" style="min-width:200px;margin-bottom:0;padding:14px;flex-shrink:0;cursor:pointer" onclick="window.location.href='booking.html?flight=${f.id}'">
          <div style="font-weight:600;font-size:0.85rem;color:var(--primary)">${f.from} → ${f.to}</div>
          <div style="font-size:0.75rem;color:var(--gray-400)">${a?.name || f.airline} • $${f.price}</div>
        </div>`;
      }).join('')}
    </div>
  `;
}

/* ===== SOCIAL SHARING ===== */
function initSocialShare() {
  const container = document.getElementById('social-share');
  if (!container) return;

  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('I just booked my flight with SkyWings! ✈️');

  container.innerHTML = `
    <h4 style="font-size:0.9rem;font-weight:600;color:var(--gray-600);margin-bottom:12px"><i class="fas fa-share-alt"></i> Share your trip</h4>
    <div style="display:flex;gap:10px;justify-content:center">
      <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="social-login-btn" style="flex:0 0 auto;padding:10px 16px" aria-label="Share on Facebook"><i class="fab fa-facebook-f" style="color:#1877f2"></i></a>
      <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" class="social-login-btn" style="flex:0 0 auto;padding:10px 16px" aria-label="Share on Twitter"><i class="fab fa-twitter" style="color:#1da1f2"></i></a>
      <a href="https://wa.me/?text=${text}%20${url}" target="_blank" class="social-login-btn" style="flex:0 0 auto;padding:10px 16px" aria-label="Share on WhatsApp"><i class="fab fa-whatsapp" style="color:#25d366"></i></a>
      <button class="social-login-btn" style="flex:0 0 auto;padding:10px 16px;cursor:pointer" onclick="copyShareLink()" aria-label="Copy link"><i class="fas fa-link" style="color:var(--gray-500)"></i></button>
    </div>
  `;
}

function copyShareLink() {
  const input = document.createElement('input');
  input.value = window.location.href;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showToast('Link copied to clipboard!', 'success');
}

/* ===== FLIGHT CANCELLATION ===== */
function initCancellation() {
  const form = document.getElementById('cancel-booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ref = document.getElementById('cancel-ref')?.value.trim();
    const email = document.getElementById('cancel-email')?.value.trim();

    if (!ref) { showToast('Please enter your booking reference', 'error'); return; }
    if (!email) { showToast('Please enter your email', 'error'); return; }

    const result = document.getElementById('cancel-result');
    if (result) {
      result.style.display = 'block';
      result.innerHTML = `
        <div style="padding:20px;background:#fffbeb;border-radius:var(--radius-md);color:var(--warning)">
          <h4 style="margin-bottom:6px"><i class="fas fa-exclamation-triangle"></i> Cancellation Request Submitted</h4>
          <p style="font-size:0.85rem">Your cancellation request for <strong>${ref}</strong> has been received.</p>
          <p style="font-size:0.85rem;margin-top:6px">Refund of <strong>$850</strong> will be processed within 5-7 business days.</p>
          <p style="font-size:0.8rem;margin-top:4px;opacity:0.7">A confirmation will be sent to ${email}</p>
        </div>
      `;
      showToast('Cancellation request submitted', 'success');
    }
  });
}

/* ===== CURRENCY CONVERTER ===== */
let currentCurrency = 'USD';
const exchangeRates = { USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1550, AED: 3.67 };

function convertPrice(usdPrice) {
  return (usdPrice * exchangeRates[currentCurrency]).toFixed(currentCurrency === 'NGN' ? 0 : 2);
}

function formatPrice(usdPrice) {
  const symbols = { USD: '$', EUR: '€', GBP: '£', NGN: '₦', AED: 'د.إ' };
  const converted = convertPrice(usdPrice);
  const sym = symbols[currentCurrency] || '$';
  return `${sym}${Number(converted).toLocaleString()}`;
}

function setCurrency(currency) {
  currentCurrency = currency;
  localStorage.setItem('skywings-currency', currency);
  // Update all prices on page
  document.querySelectorAll('[data-price-usd]').forEach(el => {
    el.textContent = formatPrice(parseFloat(el.dataset.priceUsd));
  });
  showToast(`Currency changed to ${currency}`, 'success');
}

/* ===== UTILITY: random ID generator ===== */
function generateId(prefix = 'SKW') {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}
