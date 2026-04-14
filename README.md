# DS LƯƠNG - PHÂN PHỐI DƯỢC MỸ PHẨM CAO CẤP ✨

Giao diện Website chuyên nghiệp dành cho hệ thống phân phối Dược Mỹ Phẩm chính hãng, được thiết kế với phong cách sang trọng, hiện đại và tích hợp hệ thống quản trị nội dung (CMS) mạnh mẽ.

![Demo Image](https://images.unsplash.com/photo-1556228578-0d85b1a4d52d?auto=format&fit=crop&q=80&w=1200)

## 🚀 Công Nghệ Sử Dụng

- **Frontend:** React 19 + Vite (Siêu nhanh)
- **Styling:** Tailwind CSS v4 (Modern & Custom Utilities)
- **Animations:** Framer Motion (Hiệu ứng mượt mà, cao cấp)
- **Icons:** Lucide React
- **Hệ thống dữ liệu:** Mock Storage (LocalStorage) đồng bộ thời gian thực qua Events.

## ✨ Tính Năng Nổi Bật

### 1. Giao diện Người dùng (UI/UX)
- **Permanent Light Mode:** Tông màu Trắng - Vàng Gold sang trọng, chuẩn y khoa.
- **Hoàn toàn Responsive:** Đẹp mắt trên mọi thiết bị (Mobile, Tablet, Desktop).
- **SEO Optimized:** Tích hợp cấu trúc tiêu đề, thẻ meta và hiệu suất tải trang cực nhanh.

### 2. Hệ Quản Trị Admin (CMS)
- **Dashboard:** Thống kê tổng quan đơn hàng, sản phẩm và liên hệ.
- **Quản lý Nội dung (Dynamic CMS):** Thay đổi toàn bộ văn bản, khẩu hiệu, tiêu đề trên website chỉ với vài cú nhấp chuột.
- **Quản lý Hình ảnh:** Hỗ trợ cả **URL hình ảnh** và **Tải ảnh trực tiếp từ máy tính**. 
- **Auto-fit Images:** Hình ảnh tự động được căn chỉnh (crop) theo tỉ lệ vàng, đảm bảo bố cục website luôn hoàn hảo.
- **Quản lý Blog & Sản phẩm:** Soạn thảo, chỉnh sửa và xuất bản nội dung mới linh hoạt.

## 🛠️ Cài Đặt & Khởi Chạy

### Yêu cầu hệ thống:
- Đã cài đặt [Node.js](https://nodejs.org/) (Khuyên dùng v18+).


## 🐳 Triển Khai Với Docker

Dự án đã được tích hợp sẵn cấu hình Docker để bạn có thể đóng gói và triển khai nhanh chóng:

1. **Xây dựng Image:**
   ```bash
   docker build -t dsluong-web .
   ```

2. **Chạy Container:**
   ```bash
   docker run -d -p 8080:80 --name dsluong-app dsluong-web
   ```
   *Sau khi chạy, bạn có thể truy cập web tại: `http://localhost:8080`*

## 🔐 Truy Cập Trang Quản Trị

- **Đường dẫn:** `[Domain-của-bạn]/admin` hoặc `localhost:5173/admin`


---

*Thiết kế và phát triển bởi DUCDEV* 🐉✨
