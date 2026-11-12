/**
 * MINI SHOP - HOMEPAGE LOGIC
 * Xử lý bộ lọc danh mục sản phẩm, tìm kiếm thời gian thực & hiệu ứng tương tác
 */
document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.category-tabs .tab-btn');
  const productCards = document.querySelectorAll('.products-grid .product-card');
  const emptyState = document.getElementById('emptyFilterState');

  // Xử lý chuyển tab danh mục
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const category = this.getAttribute('data-category');

      // Cập nhật trạng thái active của nút tab
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      filterProducts(category);
    });
  });

  /**
   * Lọc danh sách sản phẩm theo danh mục
   * @param {string} category 
   */
  function filterProducts(category) {
    let visibleCount = 0;

    productCards.forEach(card => {
      const cardCategories = (card.getAttribute('data-category') || '').split(' ');
      const isMatch = category === 'all' || cardCategories.includes(category);

      if (isMatch) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Lắng nghe sự kiện tìm kiếm từ thanh Search
  window.addEventListener('shop:search', function (e) {
    const query = (e.detail && e.detail.query) ? e.detail.query.toLowerCase() : '';
    if (!query) return;

    // Reset về tab "Tất cả"
    tabButtons.forEach(b => b.classList.remove('active'));
    const allTab = document.querySelector('.tab-btn[data-category="all"]');
    if (allTab) allTab.classList.add('active');

    let matchCount = 0;
    productCards.forEach(card => {
      const name = (card.querySelector('.product-name')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();
      const isMatch = name.includes(query) || desc.includes(query);

      if (isMatch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = matchCount === 0 ? 'block' : 'none';
    }

    // Cuộn mượt đến lưới sản phẩm
    const featuredSec = document.getElementById('featured-products');
    if (featuredSec) {
      featuredSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Xử lý nút "Xem tất cả"
  const viewAllLink = document.getElementById('viewAllProducts');
  if (viewAllLink) {
    viewAllLink.addEventListener('click', function (e) {
      e.preventDefault();
      // Chuyển sang hiển thị toàn bộ sản phẩm
      const allTab = document.querySelector('.tab-btn[data-category="all"]');
      if (allTab) allTab.click();
      productCards.forEach(card => {
        card.style.display = 'flex';
        card.style.opacity = '1';
      });
      if (emptyState) emptyState.style.display = 'none';
    });
  }
});

