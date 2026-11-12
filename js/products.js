/**
 * MINI SHOP - PRODUCTS PAGE LOGIC
 * Bộ lọc danh mục, ô tìm kiếm thời gian thực (live search), lọc giá và sắp xếp
 * Hoàn toàn không tải lại trang, chuyển động mượt mà.
 */
document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.category-filter-item');
  const priceRadios = document.querySelectorAll('input[name="price_range"]');
  const inStockCheckbox = document.getElementById('filterInStock');
  const searchInput = document.getElementById('catalogSearchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const sortSelect = document.getElementById('sortSelect');
  const catalogGrid = document.getElementById('catalogGrid');
  const productCards = Array.from(document.querySelectorAll('#catalogGrid .product-card'));
  const countText = document.getElementById('productsCountText');
  const emptyState = document.getElementById('emptyCatalogState');
  const btnLoadMore = document.getElementById('btnLoadMore');

  let currentCategory = 'all';
  let currentPriceRange = 'all';
  let onlyInStock = true;
  let searchQuery = '';
  let currentSort = 'newest';

  // Đọc tham số URL ban đầu nếu có (ví dụ: ?category=noi-that hoặc ?search=sofa)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const initialSearch = urlParams.get('search');

  if (initialCategory) {
    currentCategory = initialCategory;
    categoryItems.forEach(item => {
      const cat = item.getAttribute('data-cat');
      const isMatch = cat === initialCategory;
      item.classList.toggle('active', isMatch);
    });
  }

  if (initialSearch) {
    searchQuery = initialSearch.trim().toLowerCase();
    if (searchInput) {
      searchInput.value = initialSearch;
      if (btnClearSearch) btnClearSearch.style.display = 'flex';
    }
  }

  // 1. Lọc theo danh mục (Click danh mục thì chỉ hiện nhóm đó, click Tất cả thì hiện lại đủ)
  categoryItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      categoryItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      currentCategory = this.getAttribute('data-cat') || 'all';
      applyFilters();
    });
  });

  // 2. Ô tìm kiếm thời gian thực: gõ vào là lọc dần theo chữ
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.trim().toLowerCase();
      if (btnClearSearch) {
        btnClearSearch.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      applyFilters();
    });

    // Nhấn Enter không tải lại trang
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }

  // Nút xóa nhanh ô tìm kiếm (Clear button)
  if (btnClearSearch && searchInput) {
    btnClearSearch.addEventListener('click', function () {
      searchInput.value = '';
      searchQuery = '';
      btnClearSearch.style.display = 'none';
      searchInput.focus();
      applyFilters();
    });
  }

  // Đồng bộ sự kiện tìm kiếm từ thanh Search trên Header
  window.addEventListener('shop:search', function (e) {
    const q = (e.detail && e.detail.query) ? e.detail.query.trim().toLowerCase() : '';
    if (searchInput) {
      searchInput.value = q;
      if (btnClearSearch) btnClearSearch.style.display = q.length > 0 ? 'flex' : 'none';
    }
    searchQuery = q;
    applyFilters();
  });

  // 3. Lọc theo mức giá (Radio)
  priceRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      currentPriceRange = this.value;
      applyFilters();
    });
  });

  // 4. Lọc theo trạng thái còn hàng (Checkbox)
  if (inStockCheckbox) {
    inStockCheckbox.addEventListener('change', function () {
      onlyInStock = this.checked;
      applyFilters();
    });
  }

  // 5. Sắp xếp sản phẩm (Sort select)
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentSort = this.value;
      sortProducts();
    });
  }

  // 6. Nút yêu thích trái tim (Wishlist)
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.classList.toggle('active');
    });
  });

  // 7. Nút Load more
  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', function (e) {
      e.preventDefault();
      this.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Đang tải...</span>
      `;
      setTimeout(() => {
        this.innerHTML = `<span>Đã hiển thị tất cả 16 sản phẩm</span>`;
        this.disabled = true;
        this.style.opacity = '0.7';
        this.style.cursor = 'default';
      }, 400);
    });
  }

  /**
   * Hàm lọc sản phẩm mượt mà (Client-side, không tải lại trang)
   */
  function applyFilters() {
    let visibleCards = [];

    productCards.forEach(card => {
      const categories = (card.getAttribute('data-cat') || '').split(' ');
      const price = parseInt(card.getAttribute('data-price') || '0', 10);
      const isStock = card.getAttribute('data-stock') !== 'out-of-stock';
      const title = (card.querySelector('.product-name')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();

      // Kiểm tra danh mục
      const matchCategory = currentCategory === 'all' || categories.includes(currentCategory);

      // Kiểm tra tìm kiếm theo chữ (tìm theo tên sản phẩm hoặc mô tả)
      const matchSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      // Kiểm tra khoảng giá
      let matchPrice = true;
      if (currentPriceRange === 'under-300k') matchPrice = price < 300000;
      else if (currentPriceRange === '300k-1m') matchPrice = price >= 300000 && price <= 1000000;
      else if (currentPriceRange === '1m-3m') matchPrice = price >= 1000000 && price <= 3000000;
      else if (currentPriceRange === 'over-3m') matchPrice = price > 3000000;

      // Kiểm tra tồn kho
      const matchStock = !onlyInStock || isStock;

      const isVisible = matchCategory && matchSearch && matchPrice && matchStock;

      if (isVisible) {
        if (card.style.display === 'none') {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(6px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
        visibleCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    // Cập nhật dòng số lượng hiển thị
    if (countText) {
      if (searchQuery) {
        countText.textContent = `Tìm thấy ${visibleCards.length} sản phẩm phù hợp cho "${searchQuery}"`;
      } else if (currentCategory !== 'all') {
        countText.textContent = `Hiển thị ${visibleCards.length} sản phẩm`;
      } else {
        countText.textContent = `Showing 1–${visibleCards.length} of ${productCards.length} products`;
      }
    }

    // Cập nhật trạng thái rỗng khi không có kết quả
    if (emptyState) {
      if (visibleCards.length === 0) {
        emptyState.style.display = 'block';
        emptyState.innerHTML = `
          <p style="margin-bottom: 12px; font-weight: 500;">
            Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc hiện tại.
          </p>
          <button type="button" class="btn btn-outline-green" id="btnResetFilters" style="padding: 7px 18px; font-size: 13.5px;">
            Xem tất cả sản phẩm
          </button>
        `;
        const resetBtn = document.getElementById('btnResetFilters');
        if (resetBtn) {
          resetBtn.addEventListener('click', resetAllFilters);
        }
      } else {
        emptyState.style.display = 'none';
      }
    }

    // Sắp xếp lại danh sách đang hiển thị
    sortProducts();
  }

  /**
   * Sắp xếp danh sách sản phẩm theo lựa chọn
   */
  function sortProducts() {
    const visibleCards = productCards.filter(c => c.style.display !== 'none');

    visibleCards.sort((a, b) => {
      const priceA = parseInt(a.getAttribute('data-price') || '0', 10);
      const priceB = parseInt(b.getAttribute('data-price') || '0', 10);
      const idA = parseInt(a.getAttribute('data-id') || '0', 10);
      const idB = parseInt(b.getAttribute('data-id') || '0', 10);

      if (currentSort === 'price-asc') return priceA - priceB;
      if (currentSort === 'price-desc') return priceB - priceA;
      if (currentSort === 'popular') return priceB - priceA;
      return idA - idB; // Newest / Default
    });

    visibleCards.forEach(card => catalogGrid.appendChild(card));
  }

  /**
   * Reset toàn bộ bộ lọc về trạng thái ban đầu
   */
  function resetAllFilters() {
    currentCategory = 'all';
    currentPriceRange = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (btnClearSearch) btnClearSearch.style.display = 'none';

    categoryItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-cat') === 'all');
    });

    priceRadios.forEach(radio => {
      radio.checked = radio.value === 'all';
    });

    if (inStockCheckbox) inStockCheckbox.checked = true;

    applyFilters();
  }

  // Khởi chạy bộ lọc ban đầu
  applyFilters();
});
