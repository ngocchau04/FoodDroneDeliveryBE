# 📊 Sample Data for Food Drone Delivery

Thư mục này chứa dữ liệu mẫu để test và phát triển hệ thống Food Drone Delivery.

## 🗂️ Cấu trúc dữ liệu

### 👥 Users (users.json)
- **5 users** với các role khác nhau:
  - 2 Customers (Nguyễn Văn An, Trần Thị Bình)
  - 1 Restaurant Owner (Lê Minh Châu)
  - 1 Admin (Phạm Thành Long)
  - 1 Drone Operator (Võ Văn Đức)

### 🚁 Drones (drones.json)
- **5 drones** với trạng thái khác nhau:
  - Eagle Swift (Available)
  - Hawk Thunder (In Transit)
  - Phoenix Rider (Charging)
  - Storm Falcon (Maintenance)
  - Lightning Dash (Available)

### 📦 Orders (orders.json)
- **3 orders** ở các giai đoạn khác nhau:
  - QB001: Processing (đang giao)
  - QB002: New Order (mới tạo)
  - QB003: Delivered (đã giao thành công)

### 💳 Payments (payments.json)
- **5 payment records** với các phương thức khác nhau:
  - Card, COD, Wallet, Bank Transfer
  - Các trạng thái: Processing, Pending, Completed, Failed

### 🔔 Notifications (notifications.json)
- **8 notifications** cho các user types:
  - Order updates, Delivery status
  - Promotions, System alerts
  - Payment notifications

## 🚀 Cách sử dụng

### Bước 1: Cấu hình environment
```bash
# Đảm bảo có file .env trong thư mục fooddronedelivery với:
SANITY_WRITE_TOKEN=your_sanity_write_token_here
```

### Bước 2: Cài đặt dependencies
```bash
cd fooddronedelivery/sample-data
npm install
```

### Bước 3: Import tất cả dữ liệu
```bash
npm run import
```

### Bước 4: Import từng loại riêng lẻ (nếu cần)
```bash
npm run import:users
npm run import:drones
npm run import:orders
npm run import:payments
npm run import:notifications
```

## 📋 Checklist sau khi import

- [ ] Users xuất hiện trong Sanity Studio
- [ ] Drones có đầy đủ thông tin kỹ thuật
- [ ] Orders liên kết đúng với Users và Restaurants
- [ ] Payments có transaction details chính xác
- [ ] Notifications hiển thị đúng theo user role

## 🔗 Relationships trong data

```
Customer ──→ Order ──→ Payment
    │           │
    │           ├──→ Restaurant  
    │           ├──→ Drone
    │           └──→ Notifications
    │
    └──→ Notifications
```

## 💡 Lưu ý quan trọng

1. **Project ID**: Cập nhật `projectId` trong `import-all.js`
2. **References**: Một số references có thể cần cập nhật để khớp với dữ liệu hiện có
3. **Coordinates**: Tọa độ GPS đều ở khu vực TP.HCM
4. **Thời gian**: Timestamps được set theo timezone UTC

## 🛠️ Tùy chỉnh dữ liệu

Để thêm dữ liệu mới:

1. Chỉnh sửa files JSON tương ứng
2. Đảm bảo `_id` và `_type` đúng format
3. Kiểm tra references giữa các documents
4. Chạy lại import script

## 📖 Tài liệu tham khảo

- [Sanity Import Guide](https://www.sanity.io/docs/importing)
- [Schema References](https://www.sanity.io/docs/reference-type)
- [Data Modeling Best Practices](https://www.sanity.io/docs/data-modeling)
