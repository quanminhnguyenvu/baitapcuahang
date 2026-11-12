# Hướng dẫn tái sử dụng Header và Footer (Mini Shop Components)

Hệ thống giao diện của Mini Shop đã được tách rời hoàn toàn thành các module độc lập để dễ dàng tái sử dụng cho các trang tiếp theo (ví dụ: `products.html`, `product-detail.html`, `cart.html`,...).

## 1. Cấu trúc các file liên quan
- `css/variables.css`: Khai báo biến màu sắc (xanh lá chủ đạo `#16a34a`, xanh dương `#2563eb`), khoảng cách, bo góc và bóng đổ.
- `css/base.css`: Reset, cấu trúc lưới (`.container`), các nút (`.btn-primary`, `.btn-outline`,...).
- `css/header.css`: Toàn bộ style cho thanh menu trên cùng, thanh tìm kiếm và menu di động (drawer).
- `css/footer.css`: Style cho chân trang 4 cột, mạng xã hội và thông tin liên hệ.
- `js/components.js`: Script render tự động và xử lý logic menu responsive, mobile drawer.
- `components/header.html`: File HTML mẫu tĩnh của Header.
- `components/footer.html`: File HTML mẫu tĩnh của Footer.

---

## 2. Các cách tái sử dụng trên các trang tiếp theo

### Cách 1: Sử dụng thẻ Web Component (Tiện lợi nhất, 1 dòng mã)
Trong trang HTML mới (ví dụ `products.html`), nhúng các file CSS và `js/components.js`, sau đó chỉ cần gọi thẻ tùy biến:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Danh sách sản phẩm - Mini Shop</title>
  
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/header.css">
  <link rel="stylesheet" href="css/footer.css">
</head>
<body>

  <!-- Tự động sinh Header và đánh dấu mục active="products" -->
  <shop-header active="products"></shop-header>

  <main>
    <!-- Nội dung trang mới tại đây -->
  </main>

  <!-- Tự động sinh Footer -->
  <shop-footer></shop-footer>

  <script src="js/components.js"></script>
</body>
</html>
```

---

### Cách 2: Render bằng JavaScript (Linh hoạt cho Single Page hoặc Dynamic)
```html
<header id="site-header"></header>
<main>...</main>
<footer id="site-footer"></footer>

<script src="js/components.js"></script>
<script>
  ShopComponents.renderHeader('#site-header', { active: 'products' });
  ShopComponents.renderFooter('#site-footer');
</script>
```

---

### Cách 3: Nhúng trực tiếp HTML tĩnh (Tối ưu SEO & hoạt động offline thuần túy)
Copy nội dung từ `components/header.html` và `components/footer.html` đặt vào tài liệu HTML mới của bạn. Sau đó chỉ cần nhúng `js/components.js`, hệ thống sẽ tự động bắt sự kiện đóng/mở menu di động mà không cần viết thêm code.

