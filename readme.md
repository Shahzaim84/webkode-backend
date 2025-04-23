# 📦 FinConnect - Subscription-Gated Fintech API Dashboard

A full-stack sandbox portal built with **React** (frontend) and **Express** (backend) where developers can register, subscribe to a plan, and consume mock fintech APIs. Securely gated using **JWT** and **Role-Based Access Control (RBAC)**.

---

# 📁 Project Structure


---

# 🚀 Quick Start Guide

## 🔧 Backend (Express)

### 🔹 Installation
```bash
npm install
```

### 🔹 Environment Variables
Create a `.env` file in the `server` directory:
```env
MONGOOSE_URL
JWT_KEY
PORT
USER
USER_PASS
STRIPE_SECRET_KEY
BASIC_PRICE_ID
STANDARD_PRICE_ID
PREMIUM_PRICE_ID
FRONTEND_URL
```

### 🔹 Start Server
```bash
npm start
```

### 🔹 Seed/Test Accounts
Use this to test transfers between accounts:

| Email              | Password | Role  |
|--------------------|----------|--------|
| admin@test.com     | 123456   | Admin  |
| developer@test.com | 123456   | User   |


### 🔹 API Documentation

#### 🔐 Auth Endpoints
- `POST /api/auth/register` → Register new user
  - Payload: `{ fullname, email, password }`
  - Example:
    ```json
    {
      "fullname": "John",
      "email": "john@example.com",
      "password": "123456"
    }
    ```

- `POST /api/auth/login` → Login and get JWT
  - Payload: `{ email, password }`
  - Response: `{ token }`
  - Example:
    ```json
    {
      "email": "john@example.com",
      "password": "123456"
    }
    ```

#### 💳 Subscription Endpoints
- `POST /api/subscriptions/subscribe`
- `POST /api/subscriptions/cancel`

#### 💰 Core Fintech APIs (JWT + Subscription Required)
- `GET /api/balance`
- `POST /api/transfer`
  - Payload: `{ sourceId, destinationId, amount }`
  - Example:
    ```json
    {
      "sourceId": "u1",
      "destinationId": "u2",
      "amount": 100
    }
    ```
- `GET /api/transactions?page=1&pageSize=10`
- `GET /api/invoice?start=2024-01-01&end=2024-12-31`

#### 🛠️ Admin APIs
- `GET /api/admin/users`
- `POST /api/admin/subscriptions/cancel`
  - Payload: `{ userId }`
- `GET /api/admin/logs`

#### 🔐 Middleware
- JWT Token Validation
- Role-Based Access Control
- Rate Limiting (10 req/min)
- Logging Middleware

### 🔹 Subscription Flow

1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login` → Get JWT
3. Redirect to `/pricing` → Choose Plan
4. Subscribe: `POST /api/subscriptions/subscribe`
5. Access Dashboard only if Subscribed

> ❌ Unsubscribed users blocked from `/dashboard/*` and `/api/*` (HTTP 403)

---



# 📄 License

MetaStacker Team !!



