/**
 * MINI SHOP - CART ENGINE (QUẢN LÝ GIỎ HÀNG TOÀN DIỆN)
 * - Lưu trữ dữ liệu giỏ hàng an toàn qua trình duyệt (localStorage)
 * - Tự động đồng bộ số lượng sản phẩm trên biểu tượng giỏ hàng (header badge)
 * - Thêm sản phẩm từ trang chủ, danh sách sản phẩm và chi tiết sản phẩm
 * - Tăng, giảm số lượng, xóa từng món hoặc xóa toàn bộ giỏ
 * - Tính toán đơn giá, tạm tính, phí vận chuyển (Freeship từ 500k), mã giảm giá & tổng tiền
 */

(function (global) {
  'use strict';

  // Khóa lưu trữ localStorage
  const STORAGE_KEY = 'mini_shop_cart';
  const COUPON_KEY = 'mini_shop_coupon';

  // Catalog toàn bộ 16 sản phẩm chuẩn của Mini Shop (dùng ảnh thật 100% từ assets)
  const MINI_SHOP_CATALOG = {
    'sofa-nordic': {
      id: 'sofa-nordic',
      name: 'Sofa 2 chỗ Nordic',
      category: 'Nội thất',
      price: 2990000,
      formattedPrice: '2.990.000đ',
      image: 'assets/images/products/noi-that-gia-dung/sofa-phong-khach.webp'
    },
    'ban-an-go-soi': {
      id: 'ban-an-go-soi',
      name: 'Bàn ăn gỗ Sồi tự nhiên',
      category: 'Nội thất',
      price: 3490000,
      formattedPrice: '3.490.000đ',
      image: 'assets/images/products/noi-that-gia-dung/bo-ban-an-go.webp'
    },
    'den-tha-minimal': {
      id: 'den-tha-minimal',
      name: 'Đèn thả trần Minimal',
      category: 'Đèn chiếu sáng',
      price: 599000,
      formattedPrice: '599.000đ',
      image: 'assets/images/products/do-my-nghe/den-tre-thu-cong.webp'
    },
    'binh-gom-decor': {
      id: 'binh-gom-decor',
      name: 'Bình gốm Decor',
      category: 'Gốm sứ',
      price: 290000,
      formattedPrice: '290.000đ',
      image: 'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp'
    },
    'ke-go-da-nang': {
      id: 'ke-go-da-nang',
      name: 'Kệ gỗ đa năng',
      category: 'Nội thất',
      price: 1293000,
      formattedPrice: '1.293.000đ',
      image: 'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp'
    },
    'gio-may-luu-tru': {
      id: 'gio-may-luu-tru',
      name: 'Giỏ mây lưu trữ',
      category: 'Mây tre đan',
      price: 199000,
      formattedPrice: '199.000đ',
      image: 'assets/images/products/do-thu-cong/gio-may-dan.webp'
    },
    'tranh-macrame': {
      id: 'tranh-macrame',
      name: 'Tranh treo tường Macrame',
      category: 'Đồ thủ công',
      price: 350000,
      formattedPrice: '350.000đ',
      image: 'assets/images/products/do-thu-cong/tranh-treo-macrame.webp'
    },
    'khay-go-hoa-van': {
      id: 'khay-go-hoa-van',
      name: 'Khay gỗ chạm khắc hoa văn',
      category: 'Đồ thủ công',
      price: 220000,
      formattedPrice: '220.000đ',
      image: 'assets/images/products/do-thu-cong/khay-go-hoa-van.webp'
    },
    'khay-go-moc': {
      id: 'khay-go-moc',
      name: 'Khay gỗ mộc tự nhiên',
      category: 'Đồ thủ công',
      price: 180000,
      formattedPrice: '180.000đ',
      image: 'assets/images/products/do-thu-cong/khay-go-trang-tri.webp'
    },
    'den-long-tre': {
      id: 'den-long-tre',
      name: 'Đèn lồng tre thủ công',
      category: 'Mây tre đan',
      price: 280000,
      formattedPrice: '280.000đ',
      image: 'assets/images/products/do-my-nghe/den-long-tre.webp'
    },
    'chau-cay-de-ban': {
      id: 'chau-cay-de-ban',
      name: 'Chậu gốm cây để bàn',
      category: 'Gốm sứ',
      price: 150000,
      formattedPrice: '150.000đ',
      image: 'assets/images/products/noi-that-gia-dung/chau-cay-de-ban.webp'
    },
    'hop-son-mai': {
      id: 'hop-son-mai',
      name: 'Hộp sơn mài trang trí',
      category: 'Đồ mỹ nghệ',
      price: 450000,
      formattedPrice: '450.000đ',
      image: 'assets/images/products/do-my-nghe/hop-son-mai.webp'
    },
    'bo-binh-gom-minimal': {
      id: 'bo-binh-gom-minimal',
      name: 'Bộ bình gốm Minimal',
      category: 'Gốm sứ',
      price: 680000,
      formattedPrice: '680.000đ',
      image: 'assets/images/products/do-my-nghe/bo-binh-gom-minimal.webp'
    },
    'khay-kham-trai': {
      id: 'khay-kham-trai',
      name: 'Khay khảm trai truyền thống',
      category: 'Đồ mỹ nghệ',
      price: 550000,
      formattedPrice: '550.000đ',
      image: 'assets/images/products/do-my-nghe/khay-kham-trai.webp'
    },
    'gio-may-tron': {
      id: 'gio-may-tron',
      name: 'Giỏ cói đan tay dáng tròn',
      category: 'Mây tre đan',
      price: 240000,
      formattedPrice: '240.000đ',
      image: 'assets/images/products/do-my-nghe/gio-may-dan-thu-cong.webp'
    },
    'binh-gom-vuot-tay': {
      id: 'binh-gom-vuot-tay',
      name: 'Bình gốm vuốt tay mộc',
      category: 'Gốm sứ',
      price: 390000,
      formattedPrice: '390.000đ',
      image: 'assets/images/products/do-my-nghe/bo-binh-gom-thu-cong.webp'
    }
  };

  /**
   * Chuyển đổi số thành chuỗi định dạng tiền tệ VNĐ (ví dụ: 290000 -> "290.000đ")
   */
  function formatMoney(amount) {
    return (Number(amount) || 0).toLocaleString('vi-VN') + 'đ';
  }

  /**
   * Đọc danh sách giỏ hàng an toàn từ localStorage
   * @returns {Array} Danh sách món hàng
   */
  function getRawCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('Lỗi đọc giỏ hàng từ localStorage:', err);
      return [];
    }
  }

  /**
   * Lưu giỏ hàng vào localStorage và phát sự kiện đồng bộ
   * @param {Array} cart 
   */
  function saveRawCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Lỗi ghi giỏ hàng vào localStorage:', err);
    }
    syncHeaderBadges();
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
  }

  /**
   * Cập nhật số lượng trên các badge giỏ hàng khắp trang
   */
  function syncHeaderBadges() {
    const cart = getRawCart();
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

    const badges = document.querySelectorAll('.cart-badge, #cartBadge, .mobile-cart-badge, .drawer-cart-badge');
    badges.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('empty');
      } else {
        badge.classList.add('empty');
      }

      // Kích hoạt hiệu ứng nảy (bump animation)
      badge.classList.remove('bump');
      // Buộc trình duyệt reflow để kích hoạt lại animation
      void badge.offsetWidth;
      badge.classList.add('bump');
    });

    // Cập nhật thẻ tổng số món nếu có trên trang giỏ hàng
    const totalItemsBadge = document.getElementById('cartTotalItemsBadge');
    if (totalItemsBadge) {
      totalItemsBadge.textContent = `${totalCount} sản phẩm`;
    }
  }

  /**
   * Hiển thị thông báo Toast trang nhã ở góc màn hình
   */
  function showToast(message, type = 'success') {
    let container = document.getElementById('cartToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cartToastContainer';
      container.className = 'cart-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `cart-toast-item ${type}`;

    const iconSvg = type === 'success' 
      ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    // Kích hoạt animation xuất hiện
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Tự động biến mất sau 3 giây
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Đối tượng quản lý giỏ hàng công khai (CartManager)
   */
  const CartManager = {
    /**
     * Lấy danh sách sản phẩm trong giỏ
     */
    getCart: function () {
      return getRawCart();
    },

    /**
     * Thêm một món vào giỏ hàng
     * @param {string|Object} itemOrId - ID sản phẩm trong catalog hoặc Object thông tin món
     * @param {number} quantity - Số lượng cần thêm (mặc định 1)
     * @param {boolean} silent - Có ẩn thông báo toast không (mặc định false)
     */
    addItem: function (itemOrId, quantity = 1, silent = false) {
      const qty = Math.max(1, parseInt(quantity, 10) || 1);
      let product = null;

      if (typeof itemOrId === 'string') {
        product = MINI_SHOP_CATALOG[itemOrId];
        if (!product) {
          console.warn('Không tìm thấy sản phẩm trong catalog với ID:', itemOrId);
          return false;
        }
      } else if (typeof itemOrId === 'object' && itemOrId !== null) {
        // Nếu truyền object từ trang chi tiết hoặc nguồn khác
        const id = itemOrId.id || 'custom-item';
        const catalogMatch = MINI_SHOP_CATALOG[id] || {};
        product = {
          id: id,
          name: itemOrId.name || itemOrId.title || catalogMatch.name || 'Sản phẩm thủ công',
          category: itemOrId.category || catalogMatch.category || 'Thủ công mỹ nghệ',
          price: Number(itemOrId.price) || catalogMatch.price || 290000,
          formattedPrice: itemOrId.formattedPrice || formatMoney(itemOrId.price || catalogMatch.price || 290000),
          image: itemOrId.image || catalogMatch.image || 'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp'
        };
      }

      if (!product) return false;

      const cart = getRawCart();
      const existingIndex = cart.findIndex(it => it.id === product.id);

      if (existingIndex > -1) {
        cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 0) + qty;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          formattedPrice: product.formattedPrice || formatMoney(product.price),
          image: product.image,
          quantity: qty
        });
      }

      saveRawCart(cart);

      if (!silent) {
        showToast(`Đã thêm ${qty} "${product.name}" vào giỏ hàng thành công!`);
      }

      return true;
    },

    /**
     * Cập nhật số lượng của một món
     * @param {string} productId 
     * @param {number} newQuantity 
     */
    updateQuantity: function (productId, newQuantity) {
      const qty = parseInt(newQuantity, 10);
      let cart = getRawCart();

      if (qty <= 0) {
        return this.removeItem(productId);
      }

      const item = cart.find(it => it.id === productId);
      if (item) {
        item.quantity = qty;
        saveRawCart(cart);
        return true;
      }
      return false;
    },

    /**
     * Xóa một món khỏi giỏ hàng
     * @param {string} productId 
     */
    removeItem: function (productId) {
      let cart = getRawCart();
      const target = cart.find(it => it.id === productId);
      const name = target ? target.name : 'sản phẩm';

      cart = cart.filter(it => it.id !== productId);
      saveRawCart(cart);
      showToast(`Đã xóa "${name}" khỏi giỏ hàng.`, 'info');
      return true;
    },

    /**
     * Xóa sạch toàn bộ giỏ hàng
     */
    clearCart: function () {
      saveRawCart([]);
      showToast('Đã xóa toàn bộ sản phẩm trong giỏ hàng.', 'info');
    },

    /**
     * Tổng số lượng tất cả các món trong giỏ (ví dụ: 1 sofa + 2 bình gốm = 3)
     */
    getTotalCount: function () {
      const cart = getRawCart();
      return cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    },

    /**
     * Tổng tiền hàng trước thuế/giảm giá (Subtotal)
     */
    getSubtotal: function () {
      const cart = getRawCart();
      return cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);
    },

    /**
     * Phí vận chuyển: Miễn phí nếu đơn hàng >= 500.000đ, ngược lại 30.000đ (hoặc 0đ nếu giỏ trống)
     */
    getShippingFee: function () {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      return subtotal >= 500000 ? 0 : 30000;
    },

    /**
     * Quản lý mã giảm giá
     */
    getCoupon: function () {
      try {
        const val = localStorage.getItem(COUPON_KEY);
        return val ? JSON.parse(val) : null;
      } catch (e) {
        return null;
      }
    },

    applyCoupon: function (code) {
      const cleanCode = (code || '').trim().toUpperCase();
      const subtotal = this.getSubtotal();

      if (cleanCode === 'MINISHOP10') {
        const discountAmount = Math.round(subtotal * 0.1);
        const couponData = { code: cleanCode, rate: 0.1, discount: discountAmount };
        localStorage.setItem(COUPON_KEY, JSON.stringify(couponData));
        showToast('Áp dụng mã giảm giá 10% thành công!');
        saveRawCart(getRawCart()); // kích hoạt cập nhật lại
        return { success: true, message: 'Giảm 10% giá trị đơn hàng', discount: discountAmount };
      } else if (cleanCode === 'FREESHIP') {
        const couponData = { code: cleanCode, isFreeship: true, discount: 30000 };
        localStorage.setItem(COUPON_KEY, JSON.stringify(couponData));
        showToast('Áp dụng mã miễn phí vận chuyển thành công!');
        saveRawCart(getRawCart());
        return { success: true, message: 'Miễn phí giao hàng toàn quốc', discount: 30000 };
      } else {
        return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
      }
    },

    removeCoupon: function () {
      localStorage.removeItem(COUPON_KEY);
      showToast('Đã hủy mã giảm giá.', 'info');
      saveRawCart(getRawCart());
    },

    /**
     * Tổng số tiền thanh toán cuối cùng (Subtotal + Shipping - Discount)
     */
    getGrandTotal: function () {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;

      let shipping = this.getShippingFee();
      let discount = 0;

      const coupon = this.getCoupon();
      if (coupon) {
        if (coupon.isFreeship) {
          shipping = 0;
        } else if (coupon.rate) {
          discount = Math.round(subtotal * coupon.rate);
        }
      }

      return Math.max(0, subtotal + shipping - discount);
    },

    /**
     * Hàm tiện ích định dạng tiền
     */
    formatPrice: formatMoney,

    /**
     * Đồng bộ thủ công badge
     */
    syncBadges: syncHeaderBadges,

    /**
     * Catalog tham chiếu
     */
    catalog: MINI_SHOP_CATALOG
  };

  /**
   * Tự động khởi tạo và gán sự kiện cho trang:
   * 1. Khi bấm nút .btn-card-cart hoặc bất kỳ phần tử nào có [data-add-cart]
   * 2. Lắng nghe thay đổi storage từ tab/cửa sổ khác
   */
  function initCartListeners() {
    // Đồng bộ badge ngay khi load
    syncHeaderBadges();

    // Lắng nghe sự kiện click thêm vào giỏ hàng
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-card-cart, [data-add-cart]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const productId = btn.getAttribute('data-id') || btn.getAttribute('data-add-cart');
      if (productId) {
        const ok = CartManager.addItem(productId, 1);
        if (ok) {
          // Hiệu ứng phản hồi trên chính nút bấm
          const originalText = btn.innerHTML;
          btn.classList.add('added');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Đã thêm!</span>
          `;
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('added');
          }, 1200);
        }
      }
    });

    // Lắng nghe thay đổi từ tab khác
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY) {
        syncHeaderBadges();
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart: getRawCart() } }));
      }
    });
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartListeners);
  } else {
    initCartListeners();
  }

  /**
   * Khởi tạo và render toàn bộ trang giỏ hàng (cart.html)
   */
  function initCartPage() {
    const cartPageContent = document.getElementById('cartPageContent');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartItemsList = document.getElementById('cartItemsList');

    function render() {
      const cart = CartManager.getCart();

      if (!cart.length) {
        if (cartPageContent) cartPageContent.style.display = 'none';
        if (cartEmptyState) cartEmptyState.style.display = '';
        return;
      }

      if (cartPageContent) cartPageContent.style.display = '';
      if (cartEmptyState) cartEmptyState.style.display = 'none';

      // Render danh sách sản phẩm
      if (cartItemsList) {
        cartItemsList.innerHTML = cart.map(function (item) {
          const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
          return `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-image">
                <a href="product-detail.html?id=${item.id}"><img src="${item.image}" alt="${item.name}"></a>
              </div>
              <div class="cart-item-info">
                <a href="product-detail.html?id=${item.id}" class="cart-item-name">${item.name}</a>
                <span class="cart-item-category">${item.category}</span>
                <span class="cart-item-unit-price">${CartManager.formatPrice(item.price)}</span>
              </div>
              <div class="cart-qty-control">
                <button class="qty-btn qty-decrease" data-id="${item.id}" aria-label="Giảm">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <input type="number" class="qty-value" value="${item.quantity}" min="1" max="99" data-id="${item.id}" aria-label="Số lượng">
                <button class="qty-btn qty-increase" data-id="${item.id}" aria-label="Tăng">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div class="cart-item-total">${CartManager.formatPrice(lineTotal)}</div>
              <button class="cart-item-remove" data-id="${item.id}" aria-label="Xóa" title="Xóa sản phẩm">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          `;
        }).join('');
      }

      // Cập nhật bảng tổng kết
      var subtotal = CartManager.getSubtotal();
      var shippingFee = CartManager.getShippingFee();
      var coupon = CartManager.getCoupon();
      var discount = 0;

      if (coupon) {
        if (coupon.isFreeship) {
          shippingFee = 0;
        } else if (coupon.rate) {
          discount = Math.round(subtotal * coupon.rate);
        }
      }

      var grandTotal = CartManager.getGrandTotal();

      var elSubtotal = document.getElementById('cartSubtotal');
      var elShipping = document.getElementById('cartShipping');
      var elDiscount = document.getElementById('cartDiscount');
      var elGrandTotal = document.getElementById('cartGrandTotal');

      if (elSubtotal) elSubtotal.textContent = CartManager.formatPrice(subtotal);

      if (elShipping) {
        if (shippingFee === 0 && subtotal > 0) {
          elShipping.textContent = 'Miễn phí';
          elShipping.style.color = '#16a34a';
        } else {
          elShipping.textContent = CartManager.formatPrice(shippingFee);
          elShipping.style.color = '';
        }
      }

      if (elDiscount) elDiscount.textContent = discount > 0 ? '-' + CartManager.formatPrice(discount) : '0đ';
      if (elGrandTotal) elGrandTotal.textContent = CartManager.formatPrice(grandTotal);
    }

    // Gán sự kiện cho các nút trong trang giỏ hàng
    document.addEventListener('click', function (e) {
      var btn;

      // Nút tăng số lượng
      btn = e.target.closest('.qty-increase');
      if (btn) {
        var id = btn.getAttribute('data-id');
        var item = CartManager.getCart().find(function (it) { return it.id === id; });
        if (item) {
          CartManager.updateQuantity(id, item.quantity + 1);
          render();
        }
        return;
      }

      // Nút giảm số lượng
      btn = e.target.closest('.qty-decrease');
      if (btn) {
        var id = btn.getAttribute('data-id');
        var item = CartManager.getCart().find(function (it) { return it.id === id; });
        if (item && item.quantity > 1) {
          CartManager.updateQuantity(id, item.quantity - 1);
          render();
        }
        return;
      }

      // Nút xóa món
      btn = e.target.closest('.cart-item-remove');
      if (btn) {
        var id = btn.getAttribute('data-id');
        CartManager.removeItem(id);
        render();
        return;
      }
    });

    // Nút xóa toàn bộ giỏ
    var btnClear = document.getElementById('btnClearCart');
    if (btnClear) {
      btnClear.addEventListener('click', function () {
        CartManager.clearCart();
        render();
      });
    }

    // Form mã giảm giá
    var couponForm = document.getElementById('couponForm');
    if (couponForm) {
      couponForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = couponForm.querySelector('input');
        var code = input ? input.value : '';
        var result = CartManager.applyCoupon(code);
        if (!result.success) {
          showToast(result.message, 'info');
        }
        render();
      });
    }

    // Lắng nghe thay đổi ô nhập số lượng
    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('qty-value')) {
        var id = e.target.getAttribute('data-id');
        var newQty = parseInt(e.target.value, 10);
        if (newQty >= 1 && newQty <= 99) {
          CartManager.updateQuantity(id, newQty);
          render();
        }
      }
    });

    // Lắng nghe sự kiện cart:updated để tự đồng bộ
    window.addEventListener('cart:updated', function () {
      render();
    });

    // Render lần đầu
    render();
  }

  // Xuất ra phạm vi toàn cục
  global.CartManager = CartManager;
  global.initCartPage = initCartPage;

})(window);

