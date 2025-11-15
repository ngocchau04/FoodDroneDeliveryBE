# Food Drone Delivery Backend

Hệ thống quản lý nội dung cho ứng dụng giao đồ ăn bằng drone, được xây dựng với Sanity CMS.

## 📋 Tổng quan

Food Drone Delivery Backend là hệ thống Content Management System (CMS) được xây dựng trên nền tảng Sanity, cung cấp các API và quản lý dữ liệu cho ứng dụng giao đồ ăn bằng drone. Hệ thống cho phép quản lý thông tin nhà hàng, món ăn, danh mục và các tính năng nổi bật.

## 🏗️ Cấu trúc dữ liệu Sanity

Hệ thống bao gồm các schema chính cho 3 giao diện: Customer, Restaurant và Admin:

### 📱 **Schemas hiện có** (Dữ liệu tĩnh)

### 1. **Restaurant** (`restaurant.ts`)
- **Mục đích**: Quản lý thông tin các nhà hàng đối tác
- **Dữ liệu chính**:
  - Tên nhà hàng
  - Hình ảnh đại diện
  - Mô tả ngắn
  - Địa chỉ và thông tin liên hệ
  - Đánh giá và thời gian giao hàng
  - Danh mục món ăn
  - Tọa độ GPS để điều hướng drone

### 2. **Category** (`category.ts`)
- **Mục đích**: Phân loại các món ăn theo danh mục
- **Dữ liệu chính**:
  - Tên danh mục (Pizza, Burger, Asian Food, v.v.)
  - Hình ảnh danh mục
  - Mô tả

### 3. **Dish** (`dish.ts`)
- **Mục đích**: Quản lý thông tin chi tiết từng món ăn
- **Dữ liệu chính**:
  - Tên món ăn
  - Hình ảnh món ăn
  - Mô tả chi tiết
  - Giá cả
  - Thành phần và allergens
  - Liên kết đến nhà hàng và danh mục

### 4. **Featured** (`featured.ts`)
- **Mục đích**: Tạo các danh mục nổi bật cho trang chủ ứng dụng
- **Dữ liệu chính**:
  - Tên danh mục nổi bật
  - Mô tả ngắn
  - Danh sách nhà hàng được đề xuất

---

### 🚀 **Schemas cần bổ sung** (Để hoàn thiện hệ thống 3 giao diện)

### 5. **User** (`user.ts`) - *Cần tạo*
- **Mục đích**: Quản lý thông tin người dùng (Customer, Restaurant Owner, Admin)
- **Dữ liệu chính**:
  - Tên, email, số điện thoại
  - Avatar và thông tin cá nhân
  - Địa chỉ giao hàng
  - Role (customer/restaurant/admin)
  - Lịch sử đơn hàng
  - Phương thức thanh toán ưa thích

### 6. **Order** (`order.ts`) - *Cần tạo*
- **Mục đích**: Quản lý đơn hàng và luồng giao hàng
- **Dữ liệu chính**:
  - Order ID (QB001, QB002, QB003...)
  - Thông tin khách hàng
  - Danh sách món ăn đã đặt
  - Tổng tiền và phương thức thanh toán
  - Địa chỉ giao hàng
  - Trạng thái đơn hàng (New Orders, Processing, Delivered)
  - Thông tin drone được gán
  - Thời gian đặt hàng và giao hàng dự kiến

### 7. **Drone** (`drone.ts`) - *Cần tạo*
- **Mục đích**: Quản lý fleet drone và tracking
- **Dữ liệu chính**:
  - Drone ID và tên (Eagle Swift, Hawk Thunder...)
  - Trạng thái (Available, In Transit, Charging, Maintenance)
  - Battery level
  - Vị trí hiện tại (GPS coordinates)
  - Tải trọng tối đa
  - Đơn hàng hiện đang giao
  - Lịch sử bay

### 8. **Payment** (`payment.ts`) - *Cần tạo*
- **Mục đích**: Quản lý thông tin thanh toán
- **Dữ liệu chính**:
  - Payment ID
  - Order reference
  - Phương thức (CARD, COD, Digital Wallet)
  - Trạng thái thanh toán
  - Số tiền và thời gian
  - Transaction details

### 9. **Notification** (`notification.ts`) - *Cần tạo*
- **Mục đích**: Quản lý thông báo cho các giao diện
- **Dữ liệu chính**:
  - Loại thông báo (Order Update, Promo, System)
  - Người nhận (Customer/Restaurant/Admin)
  - Nội dung và thời gian
  - Trạng thái đã đọc/chưa đọc

---

### 🎯 **Kết nối giữa 3 giao diện:**

#### 👥 **Customer App:**
- Xem Restaurant → Category → Dish
- Tạo Order với User info
- Tracking Order status và Drone location
- Nhận Notification về trạng thái đơn hàng

#### 🏪 **Restaurant Dashboard:**
- Quản lý Restaurant và Dish data
- Nhận Order từ Customer
- Cập nhật trạng thái Order (Preparing → Ready)
- Xem thống kê và Payment

#### 👨‍💼 **Admin Panel:**
- Quản lý toàn bộ User, Restaurant, Order
- Monitor Drone fleet và assignments
- Xử lý Payment và dispute
- Gửi Notification system-wide
- Analytics và reporting

## 🚀 Cài đặt và Sử dụng

### Yêu cầu hệ thống
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn
- Tài khoản Sanity

### Cài đặt
```bash
# Clone repository
git clone https://github.com/ngocchau04/FoodDroneDeliveryBE.git

# Di chuyển vào thư mục project
cd FoodDroneDeliveryBE

# Cài đặt dependencies cho project chính
npm install

# Di chuyển vào thư mục Sanity
cd fooddronedelivery

# Cài đặt dependencies cho Sanity
npm install
```

### Chạy Sanity Studio
```bash
cd fooddronedelivery
npm run dev
```

Sanity Studio sẽ chạy tại `http://localhost:3333`

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env` trong thư mục `fooddronedelivery` với nội dung:
```
SANITY_WRITE_TOKEN=your_sanity_write_token_here
```

### Sanity Configuration
File cấu hình chính: `fooddronedelivery/sanity.config.ts`

## 📊 Data Export/Import

Thư mục `sanity-export` chứa các script và dữ liệu:
- `data.json`: Dữ liệu gốc
- `data-migrated.ndjson`: Dữ liệu đã được migrate
- Scripts để convert và migrate dữ liệu

## 🛠️ Scripts hữu ích

```bash
# Export dữ liệu từ Sanity
npm run export

# Import dữ liệu vào Sanity
npm run import

# Chạy development server
npm run dev

# Build project
npm run build
```

## 📖 Tài liệu tham khảo

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)

## 🗺️ Roadmap phát triển

### ✅ **Phase 1: Completed** (Dữ liệu tĩnh)
- Restaurant management
- Category & Dish catalog
- Featured categories

### 🚧 **Phase 2: In Progress** (Cần phát triển)
- User management system
- Order processing workflow
- Drone fleet management
- Payment integration
- Real-time notifications

### 🔮 **Phase 3: Future**
- AI-powered delivery optimization
- Weather integration for drone routing
- Customer feedback system
- Analytics dashboard
- Multi-language support

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/new-schema`
3. Commit changes: `git commit -am 'Add new schema'`
4. Push branch: `git push origin feature/new-schema`
5. Tạo Pull RequestClean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
