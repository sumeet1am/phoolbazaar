# 🌸 PhoolBazaar - Fresh Flowers, Garlands, Pooja Essentials & Event Rentals

**PhoolBazaar** is a complete, full-stack luxury web application built for the flower, pooja essentials, and event decor industry.

---

## 🌟 Key Features

### 1. 🎨 Premium UI/UX & Flower Animations
- **Luxury Theme**: Emerald green (`#064e3b`), Rose pink (`#f43f5e`), Marigold orange (`#f97316`), Lotus purple (`#a855f7`), and Glassmorphism aesthetics.
- **Falling Petals & Sparkles Overlay**: Ambient floating flower petals (Rose, Marigold, Jasmine, Leaves).
- **Flower Micro Cursor**: Interactive trail following mouse movement.
- **Flower Confetti Celebration**: Canvas confetti burst with floral petal colors on successful order checkout.
- **Bloom Micro-Animations**: Smooth Framer Motion button scale and entrance effects.

### 2. 🔐 Auth & Guest Lock
- **Guest Access**: Browse catalog, search flowers, view decoration rentals and details.
- **Auth Guard**: Attempting to Add to Cart, Wishlist, or Checkout opens the **PhoolBazaar Auth Modal**.
- **Admin Capability**: Access full `/admin` dashboard to manage catalog, orders, categories, and time slots.

### 3. ⏰ Early Morning Delivery Slot Chooser
- Select specific delivery windows:
  - Early Morning (5:30 AM - 7:30 AM) for Daily Temple Pooja.
  - Standard Morning Slot (8:00 AM - 11:00 AM).
  - Afternoon & Evening Slots.

### 4. 👑 Complete Admin Dashboard
- Manage Products: Add new flower products with multiple image URLs, MRP, Selling Price, stock toggle, and badges.
- Manage Orders: Update order status (`Placed` → `Packing` → `Out for Delivery` → `Delivered`).
- Overview Analytics: Real-time Revenue, Orders count, Product count, Registered users.

### 5. 📊 Automatic Excel Database Fallback Engine + PostgreSQL Ready
- **Default (No Database setup required)**: Automatically creates and persists data in `excel_data/` (`users.xlsx`, `products.xlsx`, `categories.xlsx`, `orders.xlsx`, `timeslots.xlsx`).
- **PostgreSQL Switch**: Simply pass `DATABASE_URL` env variable to switch to SQLAlchemy ORM models automatically without frontend changes.

---

## 🚀 How to Run Locally

### Frontend (React + Vite + Tailwind CSS + Framer Motion)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Backend (FastAPI + Python + Excel Fallback)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Open `http://localhost:8000/docs` to view Interactive Swagger API documentation.

---

## 🔑 Quick Demo Logins
- **Customer**: Click **👤 Customer Demo** in Auth Modal.
- **Admin**: Click **👑 Admin Demo** in Auth Modal (or use `admin@phoolbazaar.com` / `admin123`).
