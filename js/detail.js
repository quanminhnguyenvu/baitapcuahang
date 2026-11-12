/**
 * MINI SHOP - PRODUCT DETAIL LOGIC
 * Hiển thị chi tiết theo sản phẩm được chọn từ trang danh sách (?id=...)
 * Chuyển đổi gallery ảnh, tăng giảm số lượng, thêm giỏ hàng & sản phẩm liên quan
 */

// Cơ sở dữ liệu chi tiết của toàn bộ sản phẩm trong shop (dùng ảnh thật từ assets)
const PRODUCTS_DB = {
  'sofa-nordic': {
    title: 'Sofa 2 chỗ Nordic',
    category: 'Nội thất',
    categoryEn: 'Living Room',
    categorySlug: 'noi-that',
    price: '2.990.000đ',
    oldPrice: '3.500.000đ',
    discount: '-15%',
    reviews: 38,
    image: 'assets/images/products/noi-that-gia-dung/sofa-phong-khach.webp',
    gallery: [
      'assets/images/products/noi-that-gia-dung/sofa-phong-khach.webp',
      'assets/images/products/San_pham/sofa-phong-khach-original.webp',
      'assets/images/products/noi-that-gia-dung/bo-ban-an-go.webp',
      'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Sofa bọc vải nỉ cao cấp phong cách Bắc Âu Nordic tối giản, êm ái. Đệm mút D40 chống xẹp lún, khung gỗ sồi tự nhiên vững chắc đem lại cảm giác thư thái cho không gian phòng khách gia đình.',
    specs: {
      material: 'Vải nỉ cao cấp, Khung gỗ Sồi',
      color: 'Xám ghi Nordic (Gray)',
      dimensions: 'Dài 160cm x Sâu 82cm x Cao 78cm',
      weight: '28 kg',
      origin: 'Việt Nam'
    }
  },

  'ban-an-go-soi': {
    title: 'Bàn ăn gỗ Sồi tự nhiên',
    category: 'Nội thất',
    categoryEn: 'Dining & Kitchen',
    categorySlug: 'nha-bep',
    price: '3.490.000đ',
    oldPrice: '4.200.000đ',
    discount: '-17%',
    reviews: 42,
    image: 'assets/images/products/noi-that-gia-dung/bo-ban-an-go.webp',
    gallery: [
      'assets/images/products/noi-that-gia-dung/bo-ban-an-go.webp',
      'assets/images/products/San_pham/bo-ban-an-go-original.webp',
      'assets/images/products/do-thu-cong/khay-go-hoa-van.webp',
      'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Bàn ăn gia đình chế tác từ 100% gỗ sồi tự nhiên qua xử lý tẩm sấy công nghệ cao chống cong vênh, mối mọt. Phủ sơn mờ PU bảo vệ tối đa và lưu giữ vẹn nguyên từng thớ vân gỗ ấm áp.',
    specs: {
      material: '100% Gỗ sồi nhập khẩu',
      color: 'Nâu vân gỗ sáng tự nhiên',
      dimensions: 'Dài 140cm x Rộng 80cm x Cao 75cm',
      weight: '32 kg',
      origin: 'Việt Nam'
    }
  },

  'den-tha-minimal': {
    title: 'Đèn thả trần Minimal',
    category: 'Đèn',
    categoryEn: 'Lighting',
    categorySlug: 'den',
    price: '599.000đ',
    oldPrice: '705.000đ',
    discount: '-15%',
    reviews: 29,
    image: 'assets/images/products/do-my-nghe/den-tre-thu-cong.webp',
    gallery: [
      'assets/images/products/do-my-nghe/den-tre-thu-cong.webp',
      'assets/images/products/San_pham/den-tre-thu-cong-original.webp',
      'assets/images/products/do-my-nghe/den-long-tre.webp',
      'assets/images/products/San_pham/den-long-tre-original.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Đèn thả trần phong cách Minimal kết hợp gỗ sồi mộc và chao kim loại sơn mờ tinh xảo. Ánh sáng vàng dịu nhẹ lan tỏa êm ái, hoàn hảo cho bàn ăn, quầy bar hoặc góc đọc sách.',
    specs: {
      material: 'Gỗ sồi & Chao nhôm phủ sơn tĩnh điện',
      color: 'Trắng mờ kết hợp gỗ sồi sáng',
      dimensions: 'Đường kính 28cm x Cao 24cm, Dây 120cm',
      weight: '1.1 kg',
      origin: 'Việt Nam'
    }
  },

  'binh-gom-decor': {
    title: 'Bình gốm Decor phong cách mộc',
    category: 'Trang trí',
    categoryEn: 'Home Decor',
    categorySlug: 'trang-tri',
    price: '290.000đ',
    oldPrice: '360.000đ',
    discount: '-19%',
    reviews: 48,
    image: 'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp',
    gallery: [
      'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp',
      'assets/images/products/San_pham/binh-gom-trang-tri-original.webp',
      'assets/images/products/do-my-nghe/bo-binh-gom-minimal.webp',
      'assets/images/products/do-my-nghe/bo-binh-gom-thu-cong.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Bình gốm sứ thủ công Bát Tràng tráng men mờ độc bản, phom dáng thon tròn thanh nhã. Phù hợp cắm các loại hoa lá cành khô tự nhiên hoặc đặt trang trí kệ sách, bàn trà.',
    specs: {
      material: 'Gốm nung nhiệt độ cao 1280°C',
      color: 'Trắng kem men mờ / Xanh rêu nhạt',
      dimensions: 'Miệng 8cm x Bụng 14cm x Cao 22cm',
      weight: '0.85 kg',
      origin: 'Bát Tràng, Việt Nam'
    }
  },

  'ke-go-da-nang': {
    title: 'Kệ gỗ đa năng 4 tầng',
    category: 'Nội thất',
    categoryEn: 'Storage & Furniture',
    categorySlug: 'luu-tru',
    price: '1.293.000đ',
    oldPrice: '1.550.000đ',
    discount: '-16%',
    reviews: 34,
    image: 'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
    gallery: [
      'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
      'assets/images/products/San_pham/ke-go-trang-tri-original.webp',
      'assets/images/products/noi-that-gia-dung/sofa-phong-khach.webp',
      'assets/images/products/do-thu-cong/gio-may-dan.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Kệ gỗ 4 tầng tháo lắp thông minh với các nan thoáng khí. Khả năng chịu lực cao, tiết kiệm tối đa diện tích bày biện sách báo, chậu hoa hay đồ trang trí lưu niệm.',
    specs: {
      material: 'Gỗ tự nhiên chống ẩm',
      color: 'Màu gỗ mộc ấm áp',
      dimensions: 'Rộng 70cm x Sâu 32cm x Cao 120cm',
      weight: '8.5 kg',
      origin: 'Việt Nam'
    }
  },

  'gio-may-luu-tru': {
    title: 'Giỏ mây lưu trữ nắp đậy',
    category: 'Lưu trữ',
    categoryEn: 'Storage & Organization',
    categorySlug: 'luu-tru',
    price: '199.000đ',
    oldPrice: '250.000đ',
    discount: '-20%',
    reviews: 53,
    image: 'assets/images/products/do-thu-cong/gio-may-dan.webp',
    gallery: [
      'assets/images/products/do-thu-cong/gio-may-dan.webp',
      'assets/images/products/San_pham/gio-may-dan-original.webp',
      'assets/images/products/do-my-nghe/gio-may-dan-thu-cong.webp',
      'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Giỏ mây đan tay thủ công từ sợi mây song tự nhiên đã qua hun sấy chống mối mọt. Nắp đậy kín đáo giúp bạn cất giữ khăn, quần áo, sách vở một cách gọn gàng và thẩm mỹ.',
    specs: {
      material: 'Mây song tự nhiên đan tay thủ công',
      color: 'Vàng mật ong tự nhiên',
      dimensions: 'Dài 38cm x Rộng 28cm x Cao 20cm',
      weight: '0.7 kg',
      origin: 'Làng nghề Phú Vinh, Việt Nam'
    }
  },

  'tranh-macrame': {
    title: 'Tranh treo tường Macrame đan tay',
    category: 'Trang trí',
    categoryEn: 'Home Decor',
    categorySlug: 'trang-tri',
    price: '350.000đ',
    oldPrice: '420.000đ',
    discount: '-16%',
    reviews: 27,
    image: 'assets/images/products/do-thu-cong/tranh-treo-macrame.webp',
    gallery: [
      'assets/images/products/do-thu-cong/tranh-treo-macrame.webp',
      'assets/images/products/San_pham/tranh-treo-macrame-original.webp',
      'assets/images/products/noi-that-gia-dung/sofa-phong-khach.webp',
      'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Tranh treo tường nghệ thuật Macrame phong cách Bohemian, đan hoàn toàn bằng tay từ sợi cotton 100% tự nhiên mềm mại trên cành gỗ mộc, thổi hồn nét mộc mạc thư thái cho căn phòng.',
    specs: {
      material: 'Sợi cotton tự nhiên & Thanh gỗ mộc',
      color: 'Trắng kem tự nhiên (Off-white)',
      dimensions: 'Rộng 45cm x Dài 80cm',
      weight: '0.6 kg',
      origin: 'Việt Nam'
    }
  },

  'khay-go-hoa-van': {
    title: 'Khay gỗ hoa văn chạm khắc cổ điển',
    category: 'Nhà bếp',
    categoryEn: 'Kitchen & Tableware',
    categorySlug: 'nha-bep',
    price: '240.000đ',
    oldPrice: '290.000đ',
    discount: '-17%',
    reviews: 35,
    image: 'assets/images/products/do-thu-cong/khay-go-hoa-van.webp',
    gallery: [
      'assets/images/products/do-thu-cong/khay-go-hoa-van.webp',
      'assets/images/products/San_pham/khay-go-hoa-van-original.webp',
      'assets/images/products/do-thu-cong/khay-go-trang-tri.webp',
      'assets/images/products/do-my-nghe/khay-kham-trai.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Khay gỗ tiện thủ công chạm khắc hoa văn vintage tinh xảo, thành khay gờ cao chống trượt đổ. Thích hợp phục vụ tiệc trà, cà phê sáng hoặc làm khay để nến thơm sang trọng.',
    specs: {
      material: 'Gỗ tần bì nguyên khối',
      color: 'Nâu cánh gián cổ điển',
      dimensions: 'Đường kính 30cm x Cao 2.5cm',
      weight: '0.65 kg',
      origin: 'Việt Nam'
    }
  },

  'khay-go-moc': {
    title: 'Khay gỗ mộc tiện dụng',
    category: 'Nhà bếp',
    categoryEn: 'Kitchen & Serving',
    categorySlug: 'nha-bep',
    price: '220.000đ',
    oldPrice: '260.000đ',
    discount: '-15%',
    reviews: 21,
    image: 'assets/images/products/do-thu-cong/khay-go-trang-tri.webp',
    gallery: [
      'assets/images/products/do-thu-cong/khay-go-trang-tri.webp',
      'assets/images/products/San_pham/khay-go-trang-tri-original.webp',
      'assets/images/products/do-thu-cong/khay-go-hoa-van.webp',
      'assets/images/products/noi-that-gia-dung/bo-ban-an-go.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Khay gỗ chữ nhật bo cong 4 góc tối giản, phủ dầu dừa bảo vệ an toàn 100% khi tiếp xúc trực tiếp đồ ăn, dễ lau chùi và độ bền cao.',
    specs: {
      material: 'Gỗ cao su tuyển chọn',
      color: 'Màu gỗ sáng tự nhiên',
      dimensions: 'Dài 34cm x Rộng 22cm x Cao 2cm',
      weight: '0.55 kg',
      origin: 'Việt Nam'
    }
  },

  'den-long-tre': {
    title: 'Đèn lồng tre nghệ thuật thủ công',
    category: 'Đèn',
    categoryEn: 'Lighting & Decor',
    categorySlug: 'den',
    price: '480.000đ',
    oldPrice: '560.000đ',
    discount: '-14%',
    reviews: 19,
    image: 'assets/images/products/do-my-nghe/den-long-tre.webp',
    gallery: [
      'assets/images/products/do-my-nghe/den-long-tre.webp',
      'assets/images/products/San_pham/den-long-tre-original.webp',
      'assets/images/products/do-my-nghe/den-tre-thu-cong.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Đèn lồng nan tre uốn tay thủ công theo phom dáng đèn truyền thống xứ Huế, tạo hiệu ứng bóng đổ nan tre huyền ảo, làm nổi bật không gian phòng khách, phòng thiền hay trà thất.',
    specs: {
      material: 'Nan tre cật tự nhiên hun khói',
      color: 'Vàng tre tự nhiên',
      dimensions: 'Đường kính 26cm x Cao 36cm',
      weight: '0.9 kg',
      origin: 'Làng nghề tre trúc Việt Nam'
    }
  },

  'chau-cay-de-ban': {
    title: 'Chậu cây gốm để bàn kèm đĩa lót gỗ',
    category: 'Trang trí',
    categoryEn: 'Home & Office Decor',
    categorySlug: 'trang-tri',
    price: '185.000đ',
    oldPrice: '220.000đ',
    discount: '-16%',
    reviews: 44,
    image: 'assets/images/products/noi-that-gia-dung/chau-cay-de-ban.webp',
    gallery: [
      'assets/images/products/noi-that-gia-dung/chau-cay-de-ban.webp',
      'assets/images/products/San_pham/chau-cay-de-ban-original.webp',
      'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp',
      'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Chậu cây mini men mờ kèm đĩa lót bằng gỗ sồi tiện dụng, có lỗ thoát đáy chống ngập úng rễ, lý tưởng trồng sen đá, lưỡi hổ hoặc trầu bà để bàn làm việc.',
    specs: {
      material: 'Gốm men mờ & Đĩa lót gỗ Sồi',
      color: 'Xám xi măng nhạt / Trắng sữa',
      dimensions: 'Đường kính 14cm x Cao 13cm',
      weight: '0.75 kg',
      origin: 'Việt Nam'
    }
  },

  'hop-son-mai': {
    title: 'Hộp sơn mài cao cấp truyền thống',
    category: 'Lưu trữ',
    categoryEn: 'Craft & Storage',
    categorySlug: 'luu-tru',
    price: '650.000đ',
    oldPrice: '790.000đ',
    discount: '-18%',
    reviews: 23,
    image: 'assets/images/products/do-my-nghe/hop-son-mai.webp',
    gallery: [
      'assets/images/products/do-my-nghe/hop-son-mai.webp',
      'assets/images/products/do-my-nghe/khay-kham-trai.webp',
      'assets/images/products/do-thu-cong/khay-go-hoa-van.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Hộp sơn mài thủ công nhiều lớp tráng láng mịn như gương, viền mạ hoa văn kim nhũ sang trọng. Cất giữ an toàn các món trang sức, kỷ vật hoặc dùng làm quà tặng ngoại giao đẳng cấp.',
    specs: {
      material: 'Cốt gỗ tự nhiên phủ sơn mài truyền thống',
      color: 'Đen tuyền vẽ họa tiết vàng đồng',
      dimensions: 'Dài 20cm x Rộng 14cm x Cao 8cm',
      weight: '0.8 kg',
      origin: 'Làng sơn mài Hạ Thái, Việt Nam'
    }
  },

  // Mẫu mặc định tương ứng ảnh tham chiếu mini-shop-product-detail-reference.webp
  'bo-binh-gom-minimal': {
    title: 'Ceramic Vase Set - Minimal Style',
    category: 'Trang trí',
    categoryEn: 'Home Decor',
    categorySlug: 'trang-tri',
    price: '499.000đ',
    oldPrice: '699.000đ',
    discount: '-29%',
    reviews: 48,
    image: 'assets/images/products/do-my-nghe/bo-binh-gom-minimal.webp',
    gallery: [
      'assets/images/products/do-my-nghe/bo-binh-gom-minimal.webp',
      'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp',
      'assets/images/products/do-my-nghe/bo-binh-gom-thu-cong.webp',
      'assets/images/products/San_pham/binh-gom-trang-tri-original.webp',
      'assets/images/products/San_pham/hero-home-decor-pexels-original.webp'
    ],
    desc: 'Elegant ceramic vase set perfect for modern home decoration. Bộ bình gốm sứ mộc mạc thủ công cao cấp với 3 dáng bình phối màu trang nhã, tạo cảm giác thư thái và tinh tế cho không gian tổ ấm.',
    specs: {
      material: 'Ceramic (Gốm sứ thủ công)',
      color: 'Beige, Green, White',
      dimensions: 'Tall: 20cm, Medium: 15cm, Small: 10cm',
      weight: '1.2 kg (set)',
      origin: 'Vietnam'
    }
  },

  'khay-kham-trai': {
    title: 'Khay khảm trai thủ công cao cấp',
    category: 'Nhà bếp',
    categoryEn: 'Kitchen & Tableware',
    categorySlug: 'nha-bep',
    price: '850.000đ',
    oldPrice: '990.000đ',
    discount: '-14%',
    reviews: 17,
    image: 'assets/images/products/do-my-nghe/khay-kham-trai.webp',
    gallery: [
      'assets/images/products/do-my-nghe/khay-kham-trai.webp',
      'assets/images/products/do-my-nghe/hop-son-mai.webp',
      'assets/images/products/do-thu-cong/khay-go-hoa-van.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Khay trà khảm vỏ trai biển tự nhiên lấp lánh ánh xà cừ ngũ sắc, từng chi tiết cẩn trai được nghệ nhân gắn kết tỉ mỉ mang đậm dấu ấn mỹ nghệ truyền thống.',
    specs: {
      material: 'Khảm trai tự nhiên trên cốt gỗ',
      color: 'Xà cừ ánh ngũ sắc trên nền đen mun',
      dimensions: 'Dài 36cm x Rộng 24cm x Cao 3cm',
      weight: '0.95 kg',
      origin: 'Làng khảm trai Chuôn Ngọ, Việt Nam'
    }
  },

  'gio-may-tron': {
    title: 'Giỏ mây đan tròn thủ công',
    category: 'Lưu trữ',
    categoryEn: 'Storage & Organization',
    categorySlug: 'luu-tru',
    price: '260.000đ',
    oldPrice: '320.000đ',
    discount: '-19%',
    reviews: 38,
    image: 'assets/images/products/do-my-nghe/gio-may-dan-thu-cong.webp',
    gallery: [
      'assets/images/products/do-my-nghe/gio-may-dan-thu-cong.webp',
      'assets/images/products/do-thu-cong/gio-may-dan.webp',
      'assets/images/products/noi-that-gia-dung/ke-go-trang-tri.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Giỏ mây đan tròn lòng sâu quai xách chắc chắn, thích hợp để đồ chơi trẻ em, cuộn len sợi hoặc vật dụng phòng tắm.',
    specs: {
      material: 'Mây song tự nhiên cao cấp',
      color: 'Màu mây mật ong tự nhiên',
      dimensions: 'Đường kính 30cm x Cao 25cm',
      weight: '0.65 kg',
      origin: 'Việt Nam'
    }
  },

  'binh-gom-vuot-tay': {
    title: 'Bình gốm vuốt tay mỹ nghệ độc bản',
    category: 'Trang trí',
    categoryEn: 'Home Decor',
    categorySlug: 'trang-tri',
    price: '520.000đ',
    oldPrice: '640.000đ',
    discount: '-19%',
    reviews: 26,
    image: 'assets/images/products/do-my-nghe/bo-binh-gom-thu-cong.webp',
    gallery: [
      'assets/images/products/do-my-nghe/bo-binh-gom-thu-cong.webp',
      'assets/images/products/do-my-nghe/binh-gom-trang-tri.webp',
      'assets/images/products/do-my-nghe/bo-binh-gom-minimal.webp',
      'assets/images/banner/banner-trang-chu-mini-shop.webp'
    ],
    desc: 'Bình gốm nung củi truyền thống, từng vệt vuốt tay và hiệu ứng màu hỏa biến men tro độc nhất vô nhị, mang vẻ đẹp nguyên sơ mộc mạc.',
    specs: {
      material: 'Đất sét thô nung củi nhiệt cao',
      color: 'Men tro hỏa biến mộc mạc',
      dimensions: 'Miệng 10cm x Bụng 16cm x Cao 26cm',
      weight: '1.4 kg',
      origin: 'Bát Tràng, Việt Nam'
    }
  }
};

// Aliases
PRODUCTS_DB['ceramic-vase-set'] = PRODUCTS_DB['bo-binh-gom-minimal'];

document.addEventListener('DOMContentLoaded', function () {
  // Lấy ID sản phẩm từ URL (ví dụ: product-detail.html?id=sofa-nordic)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'bo-binh-gom-minimal';
  const product = PRODUCTS_DB[productId] || PRODUCTS_DB['bo-binh-gom-minimal'];

  // 1. Cập nhật dữ liệu động vào trang
  renderProductData(product);

  // 2. Chuyển đổi ảnh khi bấm thumbnail
  initGalleryThumbs();

  // 3. Tăng giảm số lượng (Quantity Counter)
  initQuantityControls();

  // 4. Nút Thêm vào giỏ hàng (Add to Cart)
  initAddToCart(product);

  // 5. Nút Yêu thích (Wishlist)
  initWishlist(product);

  // 6. Điều hướng Slider sản phẩm liên quan
  initRelatedSlider();
});

/**
 * Hiển thị toàn bộ thông tin sản phẩm lên giao diện
 */
function renderProductData(product) {
  // Tiêu đề trang & Breadcrumb
  document.title = `${product.title} | Mini Shop`;

  const breadcrumbCat = document.getElementById('breadcrumbCategory');
  if (breadcrumbCat) {
    breadcrumbCat.textContent = product.category;
    breadcrumbCat.href = `products.html?category=${product.categorySlug || 'all'}`;
  }

  const breadcrumbTitle = document.getElementById('breadcrumbTitle');
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.title;

  // Tiêu đề & Badges
  const titleEl = document.getElementById('productTitle');
  if (titleEl) titleEl.textContent = product.title;

  const catBadge = document.getElementById('productCategoryBadge');
  if (catBadge) catBadge.textContent = product.categoryEn || product.category;

  // Giá & Giảm giá
  const priceEl = document.getElementById('productPrice');
  if (priceEl) priceEl.textContent = product.price;

  const oldPriceEl = document.getElementById('productOldPrice');
  if (oldPriceEl) oldPriceEl.textContent = product.oldPrice;

  const discountEl = document.getElementById('productDiscountTag');
  if (discountEl) discountEl.textContent = product.discount;

  // Mô tả
  const descEl = document.getElementById('productDesc');
  if (descEl) descEl.textContent = product.desc;

  // Bảng thông số kỹ thuật (Detail Specs)
  if (product.specs) {
    const specMat = document.getElementById('specMaterial');
    if (specMat) specMat.textContent = product.specs.material;

    const specCol = document.getElementById('specColor');
    if (specCol) specCol.textContent = product.specs.color;

    const specDim = document.getElementById('specDimensions');
    if (specDim) specDim.textContent = product.specs.dimensions;

    const specWei = document.getElementById('specWeight');
    if (specWei) specWei.textContent = product.specs.weight;

    const specOri = document.getElementById('specOrigin');
    if (specOri) specOri.textContent = product.specs.origin;
  }

  // Ảnh lớn
  const mainImg = document.getElementById('mainProductImage');
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.title;
  }

  // Danh sách Thumbnail
  const thumbsContainer = document.getElementById('galleryThumbs');
  if (thumbsContainer && product.gallery && product.gallery.length > 0) {
    thumbsContainer.innerHTML = product.gallery.map((src, index) => `
      <button type="button" class="thumb-item ${index === 0 ? 'active' : ''}" data-img="${src}" aria-label="Góc ảnh ${index + 1}">
        <img src="${src}" alt="${product.title} - ảnh ${index + 1}" loading="lazy">
      </button>
    `).join('');
  }
}

/**
 * Khởi tạo sự kiện chuyển đổi thumbnail ảnh lớn
 */
function initGalleryThumbs() {
  const thumbs = document.querySelectorAll('.thumb-item');
  const mainImage = document.getElementById('mainProductImage');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const newSrc = this.getAttribute('data-img');
      if (mainImage && newSrc) {
        mainImage.style.opacity = '0.35';
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 120);
      }
    });
  });
}

/**
 * Bộ đếm số lượng mua
 */
function initQuantityControls() {
  const btnMinus = document.getElementById('qtyMinus');
  const btnPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('qtyInput');

  if (btnMinus && btnPlus && qtyInput) {
    btnMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    btnPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    });

    qtyInput.addEventListener('change', function () {
      let val = parseInt(this.value, 10);
      if (isNaN(val) || val < 1) this.value = 1;
    });
  }
}

/**
 * Nút Thêm vào giỏ hàng
 */
function initAddToCart(product) {
  const btnAddCart = document.getElementById('btnAddToCart');
  const qtyInput = document.getElementById('qtyInput');

  if (btnAddCart) {
    btnAddCart.addEventListener('click', function () {
      const qty = parseInt(qtyInput?.value || '1', 10);
      showToast(`Đã thêm ${qty} "${product.title}" vào giỏ hàng thành công!`);
    });
  }
}

/**
 * Nút Yêu thích (Wishlist)
 */
function initWishlist(product) {
  const btnWishlist = document.getElementById('btnDetailWishlist');
  if (btnWishlist) {
    btnWishlist.addEventListener('click', function () {
      this.classList.toggle('active');
      const isSaved = this.classList.contains('active');
      showToast(isSaved ? `Đã thêm "${product.title}" vào danh sách yêu thích!` : `Đã xóa "${product.title}" khỏi danh sách yêu thích!`);
    });
  }
}

/**
 * Slider các sản phẩm liên quan
 */
function initRelatedSlider() {
  const btnPrev = document.getElementById('btnPrevRelated');
  const btnNext = document.getElementById('btnNextRelated');
  const relatedRow = document.getElementById('relatedProductsRow');

  if (btnPrev && btnNext && relatedRow) {
    btnPrev.addEventListener('click', () => {
      relatedRow.scrollBy({ left: -260, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      relatedRow.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }
}

/**
 * Hiển thị thông báo Toast góc dưới
 */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
