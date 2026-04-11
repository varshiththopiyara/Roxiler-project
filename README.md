# 📌 Rating Platform - Routes Documentation

## 🧾 Overview
This application is a **Rating Platform** supporting three roles:
- Admin
- Store Owner
- User

Each role has specific permissions and access to different routes.

---

## 🔐 Authentication Routes

### `POST /login`
- Description: Login into the platform
- Access:
  - Admin
  - Store Owner
  - User

---

### `POST /register`
- Description: Register a new account
- Access:
  - User
  - Store Owner
- Note:
  - Admin accounts are created from the backend only

---

## 👥 User Management

### `GET /users`
- Description: View all registered users and store owners
- Access:
  - Admin only

### `POST /users`
- Description: Add new users (if required)
- Access:
  - Admin only

---

## 📊 Dashboard (Role-Based)

### `GET /dashboard`

#### Admin View:
- Total users
- Total stores
- Total ratings
- Total store owners

#### Store Owner View:
- Total ratings received
- List of users who rated their store

#### User View:
- Browse stores
- Submit ratings

---

## 🏬 Store Routes

### `GET /stores/all`
- Description: View all stores
- Access:
  - Admin
  - User

---

### `GET /your-stores`
- Description: View stores owned by the logged-in store owner
- Access:
  - Store Owner only

---

## 🔒 Access Control Notes
- Role-based access control is implemented
- Authentication required for protected routes
- Admin routes are restricted
- Store-specific data is protected per owner

---
