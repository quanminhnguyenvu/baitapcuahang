/**
 * MINI SHOP - WISHLIST ENGINE (QUẢN LÝ DANH SÁCH YÊU THÍCH)
 * - Lưu trữ dữ liệu yêu thích qua trình duyệt (localStorage)
 * - Trái tim tô đậm khi yêu thích, bấm lại để bỏ
 * - Trang wishlist.html liệt kê các món đã lưu
 */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'mini_shop_wishlist';

  // ---- Helpers ----
  function getRaw() {
    try {
      const d = localStorage.getItem(STORAGE_KEY);
      if (!d) return [];
      const p = JSON.parse(d);
      return Array.isArray(p) ? p : [];
    } catch (e) { return []; }
  }

  function saveRaw(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { list } }));
    syncHeartButtons();
    syncWishlistBadges();
  }

  // Đồng bộ trạng thái trái tim trên toàn trang
  function syncHeartButtons() {
    const list = getRaw();
    const ids = list.map(function(i){ return i.id; });
    document.querySelectorAll('[data-wishlist-btn]').forEach(function(btn) {
      const id = btn.getAttribute('data-id');
      if (ids.indexOf(id) > -1) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('title', 'Bỏ yêu thích');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('title', 'Thêm vào yêu thích');
      }
    });
  }

  // Đồng bộ badge số lượng yêu thích (nếu có)
  function syncWishlistBadges() {
    const count = getRaw().length;
    document.querySelectorAll('.wishlist-badge').forEach(function(el) {
      el.textContent = count;
      if (count > 0) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // Toast thông báo nhẹ
  function showToast(message, type) {
    type = type || 'success';
    // Dùng lại CartManager showToast nếu có, hoặc tự tạo
    if (typeof CartManager !== 'undefined' && CartManager._showToast) {
      CartManager._showToast(message, type);
      return;
    }
    let container = document.getElementById('cartToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cartToastContainer';
      container.className = 'cart-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'cart-toast-item ' + type;
    const heartSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
    const checkSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    toast.innerHTML = '<div class="toast-icon">' + (type === 'heart' ? heartSvg : checkSvg) + '</div><div class="toast-message">' + message + '</div>';
    container.appendChild(toast);
    requestAnimationFrame(function() { toast.classList.add('show'); });
    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3000);
  }

  // ---- WishlistManager ----
  const WishlistManager = {
    getList: function() { return getRaw(); },

    isInWishlist: function(id) {
      return getRaw().some(function(i){ return i.id === id; });
    },

    addItem: function(item) {
      const list = getRaw();
      if (list.some(function(i){ return i.id === item.id; })) return false;
      list.push({
        id: item.id,
        name: item.name || item.title || 'Sản phẩm',
        price: item.price || 0,
        formattedPrice: item.formattedPrice || (item.price ? item.price.toLocaleString('vi-VN') + 'đ' : ''),
        image: item.image || '',
        category: item.category || '',
        detailUrl: item.detailUrl || ('product-detail.html?id=' + item.id)
      });
      saveRaw(list);
      showToast('Đã thêm "' + (item.name || item.title) + '" vào yêu thích!', 'heart');
      return true;
    },

    removeItem: function(id) {
      const list = getRaw();
      const target = list.find(function(i){ return i.id === id; });
      const name = target ? target.name : 'sản phẩm';
      const newList = list.filter(function(i){ return i.id !== id; });
      saveRaw(newList);
      showToast('Đã bỏ yêu thích "' + name + '"', 'info');
      return true;
    },

    toggleItem: function(item) {
      if (this.isInWishlist(item.id)) {
        this.removeItem(item.id);
        return false; // removed
      } else {
        this.addItem(item);
        return true; // added
      }
    },

    getTotalCount: function() { return getRaw().length; },

    syncBadges: syncWishlistBadges,
    syncHearts: syncHeartButtons
  };

  // ---- Khởi tạo sự kiện toàn trang ----
  function initWishlistListeners() {
    syncHeartButtons();
    syncWishlistBadges();

    // Click vào nút trái tim [data-wishlist-btn]
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('[data-wishlist-btn]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();

      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name') || '';
      const price = parseInt(btn.getAttribute('data-price') || '0', 10);
      const image = btn.getAttribute('data-image') || '';
      const category = btn.getAttribute('data-category') || '';

      WishlistManager.toggleItem({ id, name, price, image, category });
    });

    // Đồng bộ khi tab khác thay đổi
    window.addEventListener('storage', function(e) {
      if (e.key === STORAGE_KEY) {
        syncHeartButtons();
        syncWishlistBadges();
        window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { list: getRaw() } }));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWishlistListeners);
  } else {
    initWishlistListeners();
  }

  // ---- Render trang Wishlist ----
  function initWishlistPage() {
    const container = document.getElementById('wishlistItems');
    const emptyState = document.getElementById('wishlistEmpty');
    const countBadge = document.getElementById('wishlistCountBadge');

    function renderPage() {
      const list = WishlistManager.getList();

      if (countBadge) {
        countBadge.textContent = list.length + ' sản phẩm';
      }

      if (!list.length) {
        if (container) container.innerHTML = '';
        if (emptyState) emptyState.style.display = '';
        const filled = document.getElementById('wishlistFilled');
        if (filled) filled.style.display = 'none';
        return;
      }

      const filled = document.getElementById('wishlistFilled');
      if (filled) filled.style.display = '';
      if (emptyState) emptyState.style.display = 'none';

      if (!container) return;

      container.innerHTML = list.map(function(item) {
        return `
          <article class="wishlist-item">
            <a href="${item.detailUrl || 'product-detail.html?id=' + item.id}" class="wishlist-item-img-link">
              <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
              </div>
            </a>
            <div class="wishlist-item-info">
              <a href="${item.detailUrl || 'product-detail.html?id=' + item.id}" class="wishlist-item-name">${item.name}</a>
              <span class="wishlist-item-category">${item.category}</span>
              <div class="wishlist-item-price">${item.formattedPrice}</div>
            </div>
            <div class="wishlist-item-actions">
              <button class="btn-add-to-cart-wish" data-id="${item.id}"
                aria-label="Thêm vào giỏ hàng">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Thêm vào giỏ</span>
              </button>
              <button class="btn-remove-wish" data-id="${item.id}"
                aria-label="Xóa khỏi yêu thích" title="Xóa khỏi yêu thích">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"></path>
                </svg>
                <span>Bỏ yêu thích</span>
              </button>
            </div>
          </article>
        `;
      }).join('');
    }

    // Sự kiện trong trang wishlist
    document.addEventListener('click', function(e) {
      // Bỏ yêu thích
      const removeBtn = e.target.closest('.btn-remove-wish');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        WishlistManager.removeItem(id);
        renderPage();
        return;
      }
      // Thêm vào giỏ từ trang wishlist
      const addBtn = e.target.closest('.btn-add-to-cart-wish');
      if (addBtn) {
        const id = addBtn.getAttribute('data-id');
        if (typeof CartManager !== 'undefined') {
          CartManager.addItem(id, 1);
        }
        return;
      }
    });

    window.addEventListener('wishlist:updated', renderPage);

    renderPage();
  }

  global.WishlistManager = WishlistManager;
  global.initWishlistPage = initWishlistPage;

})(window);

