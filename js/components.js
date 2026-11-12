/**
 * MINI SHOP - COMMON COMPONENTS ENGINE
 * Quản lý & tái sử dụng thanh Menu (Header) và Chân trang (Footer) cho toàn bộ website.
 */
(function (global) {
  'use strict';

  // SVG Icons dùng chung
  const ICONS = {
    bag: `<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
      <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h6v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
    </svg>`,
    bagSmall: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h6v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
    </svg>`,
    search: `<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>`,
    menu: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
    pin: `<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    phone: `<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    mail: `<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    clock: `<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
  };

  /**
   * Tạo chuỗi HTML cho Header
   * @param {Object} options - Tùy chọn { active: 'home' | 'products' | 'about' | 'contact', basePath: '' }
   */
  function createHeaderHTML(options = {}) {
    const active = options.active || 'home';
    const base = options.basePath || '';

    const navItems = [
      { id: 'home', label: 'Home', href: `${base}index.html` },
      { id: 'products', label: 'Products', href: `${base}products.html` },
      { id: 'about', label: 'About', href: `${base}about.html` },
      { id: 'contact', label: 'Contact', href: `${base}contact.html` }
    ];

    const desktopNavHtml = navItems.map(item => `
      <a href="${item.href}" class="nav-link ${item.id === active ? 'active' : ''}" data-nav="${item.id}">
        ${item.label}
      </a>
    `).join('');

    const mobileNavHtml = navItems.map(item => `
      <a href="${item.href}" class="mobile-nav-link ${item.id === active ? 'active' : ''}" data-nav="${item.id}">
        ${item.label}
      </a>
    `).join('');

    return `
      <div class="container header-container">
        <!-- Logo thương hiệu -->
        <a href="${base}index.html" class="header-brand" aria-label="Trang chủ Mini Shop">
          <span class="brand-icon">${ICONS.bag}</span>
          <span class="brand-name">Mini Shop</span>
        </a>

        <!-- Menu chính trên Desktop -->
        <nav class="header-nav" aria-label="Menu chính">
          ${desktopNavHtml}
        </nav>

        <!-- Nhóm chức năng: Tìm kiếm & Đăng nhập / Đăng ký / Admin -->
        <div class="header-actions">
          <form class="header-search" role="search" onsubmit="event.preventDefault(); MiniShopSearch(this);">
            <input type="search" class="search-input" placeholder="Search products..." aria-label="Tìm kiếm sản phẩm">
            ${ICONS.search}
          </form>

          <div class="auth-group">
            <a href="${base}login.html" class="btn btn-outline-blue">Login</a>
            <a href="${base}register.html" class="btn btn-blue">Register</a>
            <a href="${base}admin.html" class="btn btn-outline-green">Admin</a>
          </div>
        </div>

        <!-- Nút toggle Menu trên thiết bị di động -->
        <button type="button" class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Mở menu điều hướng" aria-expanded="false">
          ${ICONS.menu}
        </button>
      </div>

      <!-- Khung điều hướng di động (Drawer) -->
      <div class="mobile-drawer" id="mobileDrawer">
        <div class="mobile-drawer-content">
          <form class="mobile-search" role="search" onsubmit="event.preventDefault(); MiniShopSearch(this);">
            <input type="search" class="search-input" placeholder="Search products..." aria-label="Tìm kiếm sản phẩm">
          </form>

          <nav class="mobile-nav-links">
            ${mobileNavHtml}
          </nav>

          <div class="mobile-actions">
            <a href="${base}login.html" class="btn btn-outline-blue">Login</a>
            <a href="${base}register.html" class="btn btn-blue">Register</a>
            <a href="${base}admin.html" class="btn btn-outline-green">Admin</a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Tạo chuỗi HTML cho Footer
   * @param {Object} options - Tùy chọn { basePath: '' }
   */
  function createFooterHTML(options = {}) {
    const base = options.basePath || '';
    return `
      <div class="container">
        <div class="footer-top">
          <!-- Cột 1: Giới thiệu & mạng xã hội -->
          <div class="footer-brand">
            <a href="${base}index.html" class="brand-logo" aria-label="Mini Shop">
              <span class="brand-icon">${ICONS.bagSmall}</span>
              <span class="brand-name">Mini Shop</span>
            </a>
            <p class="footer-desc">Đồ dùng & trang trí cho cuộc sống tiện nghi và phong cách.</p>
            <div class="footer-socials">
              <a href="#" class="social-link" aria-label="Facebook">${ICONS.facebook}</a>
              <a href="#" class="social-link" aria-label="Instagram">${ICONS.instagram}</a>
              <a href="#" class="social-link" aria-label="YouTube">${ICONS.youtube}</a>
              <a href="#" class="social-link" aria-label="TikTok">${ICONS.tiktok}</a>
            </div>
          </div>

          <!-- Cột 2: Thông tin -->
          <div class="footer-column">
            <h3 class="footer-column-title">Thông tin</h3>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Về chúng tôi</a></li>
              <li><a href="#" class="footer-link">Chính sách bảo mật</a></li>
              <li><a href="#" class="footer-link">Điều khoản sử dụng</a></li>
              <li><a href="#" class="footer-link">Chính sách đổi trả</a></li>
            </ul>
          </div>

          <!-- Cột 3: Hỗ trợ khách hàng -->
          <div class="footer-column">
            <h3 class="footer-column-title">Hỗ trợ khách hàng</h3>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Hướng dẫn mua hàng</a></li>
              <li><a href="#" class="footer-link">Thanh toán &amp; giao hàng</a></li>
              <li><a href="#" class="footer-link">Bảo hành &amp; đổi trả</a></li>
              <li><a href="#" class="footer-link">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          <!-- Cột 4: Liên hệ -->
          <div class="footer-column">
            <h3 class="footer-column-title">Liên hệ</h3>
            <ul class="footer-contact-list">
              <li class="contact-item">
                ${ICONS.pin}
                <span>Hà Nội, Việt Nam</span>
              </li>
              <li class="contact-item">
                ${ICONS.phone}
                <span>0123 456 789</span>
              </li>
              <li class="contact-item">
                ${ICONS.mail}
                <span>support@minishop.vn</span>
              </li>
              <li class="contact-item">
                ${ICONS.clock}
                <span>08:00 - 21:00 (T2 - CN)</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Chân trang bản quyền -->
        <div class="footer-bottom">
          <p class="copyright-text">&copy; 2025 Mini Shop. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  /**
   * Khởi tạo sự kiện cho Header (toggle menu di động, đóng khi click ra ngoài)
   * @param {HTMLElement} headerElement
   */
  function bindHeaderEvents(headerElement) {
    if (!headerElement) return;

    const menuBtn = headerElement.querySelector('#mobileMenuBtn');
    const drawer = headerElement.querySelector('#mobileDrawer');
    if (!menuBtn || !drawer) return;

    // Toggle menu
    function toggleDrawer(open) {
      const willOpen = open !== undefined ? open : !drawer.classList.contains('open');
      drawer.classList.toggle('open', willOpen);
      menuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      document.body.style.overflow = willOpen ? 'hidden' : '';
    }

    menuBtn.onclick = function (e) {
      e.stopPropagation();
      toggleDrawer();
    };

    // Đóng drawer khi click vào vùng phủ mờ bên ngoài
    drawer.onclick = function (e) {
      if (e.target === drawer) {
        toggleDrawer(false);
      }
    };

    // Đóng drawer khi nhấn ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        toggleDrawer(false);
      }
    });

    // Cập nhật trạng thái active theo thuộc tính
    const activeNav = headerElement.getAttribute('data-active');
    if (activeNav) {
      headerElement.querySelectorAll('[data-nav]').forEach(el => {
        const isMatch = el.getAttribute('data-nav') === activeNav;
        el.classList.toggle('active', isMatch);
      });
    }
  }

  // Đối tượng công khai MiniShop
  const ShopComponents = {
    /**
     * Render Header vào selector mục tiêu
     */
    renderHeader: function (target, options = {}) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;
      el.classList.add('site-header');
      el.innerHTML = createHeaderHTML(options);
      bindHeaderEvents(el);
    },

    /**
     * Render Footer vào selector mục tiêu
     */
    renderFooter: function (target, options = {}) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (!el) return;
      el.classList.add('site-footer');
      el.innerHTML = createFooterHTML(options);
    },

    /**
     * Tự động khởi tạo header có sẵn trong HTML
     */
    initHeader: function (target = '#site-header') {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) bindHeaderEvents(el);
    }
  };

  // Đăng ký Web Components tiêu chuẩn để các trang sau có thể dùng dạng thẻ:
  // <shop-header active="products"></shop-header>
  // <shop-footer></shop-footer>
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('shop-header')) {
      customElements.define('shop-header', class extends HTMLElement {
        connectedCallback() {
          const active = this.getAttribute('active') || 'home';
          const base = this.getAttribute('base') || '';
          this.className = 'site-header';
          this.innerHTML = createHeaderHTML({ active, basePath: base });
          bindHeaderEvents(this);
        }
      });
    }

    if (!customElements.get('shop-footer')) {
      customElements.define('shop-footer', class extends HTMLElement {
        connectedCallback() {
          const base = this.getAttribute('base') || '';
          this.className = 'site-footer';
          this.innerHTML = createFooterHTML({ basePath: base });
        }
      });
    }
  }

  // Hàm xử lý tìm kiếm nhẹ nhàng
  global.MiniShopSearch = function (form) {
    const input = form.querySelector('input');
    const query = input ? input.value.trim() : '';
    if (query) {
      // Có thể lọc nhanh trên trang hiện tại hoặc chuyển hướng trang products
      const event = new CustomEvent('shop:search', { detail: { query } });
      window.dispatchEvent(event);
    }
  };

  // Xuất ra phạm vi toàn cục
  global.ShopComponents = ShopComponents;

  // Tự động khởi chạy khi DOM sẵn sàng
  document.addEventListener('DOMContentLoaded', function () {
    const headerEl = document.getElementById('site-header');
    if (headerEl && !headerEl.dataset.initialized) {
      bindHeaderEvents(headerEl);
      headerEl.dataset.initialized = 'true';
    }
  });

})(window);

