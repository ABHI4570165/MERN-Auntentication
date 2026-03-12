# 🔐 MERN Authentication App

A full-stack authentication system built with the MERN stack. Includes user registration, login, email verification via OTP, and password reset — all secured with JWT and HTTP-only cookies.

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| Frontend | `https://your-app.vercel.app` |
| Backend | `https://your-api.onrender.com` |

> Replace these with your actual deployed URLs after deployment.

---

## ✨ Features

- ✅ User Registration & Login
- ✅ JWT Authentication with HTTP-only cookies
- ✅ Email Verification via 6-digit OTP
- ✅ Password Reset via OTP
- ✅ Protected Routes
- ✅ Responsive UI with dark theme
- ✅ Toast notifications

---

## 🛠 Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Nodemailer (email OTP)
- bcryptjs (password hashing)
- Cookie Parser
- CORS

### Database & Hosting
- MongoDB Atlas (Database)
- Vercel (Frontend)
- Render (Backend)

---

## 📁 Project Structure

```
myapp/
├── backend/
│   ├── config/
│   │   └── mongodb.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── userAuth.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Header.jsx
    │   ├── context/
    │   │   └── AppContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── EmailVerify.jsx
    │   │   └── ResetPassword.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── .gitignore
    ├── vercel.json
    └── package.json
```

---

## ⚙️ Getting Started Locally

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Gmail account (for Nodemailer OTP emails)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/myapp.git
cd myapp
```

---

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env` file:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/myapp
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_gmail_app_password
```

> For `SMTP_PASS` — use a Gmail **App Password**, not your real Gmail password.
> Generate one at: Google Account → Security → 2-Step Verification → App Passwords

Start the backend server:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Fill in your `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🌍 Deployment

### MongoDB Atlas
1. Create a free M0 cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Under **Network Access** → Add `0.0.0.0/0`
3. Copy your connection string

### Backend → Render
1. Push backend to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add all environment variables from `.env`
6. Deploy

### Frontend → Vercel
1. Push frontend to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Add environment variable:
   - `VITE_BACKEND_URL` = your Render backend URL
5. Deploy

---

## 🔑 Environment Variables

### Backend `.env.example`
```env
MONGODB_URI=
JWT_SECRET=
NODE_ENV=
FRONTEND_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### Frontend `.env.example`
```env
VITE_BACKEND_URL=
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/send-verify-otp` | Send email verification OTP |
| POST | `/api/auth/verify-account` | Verify email with OTP |
| POST | `/api/auth/sent-reset-otp` | Send password reset OTP |
| POST | `/api/auth/reset-password` | Reset password with OTP |
| GET  | `/api/auth/is-auth` | Check if user is authenticated |
| GET  | `/api/user/data` | Get logged in user data |

---

## 🔒 Security Practices

- Passwords hashed with **bcryptjs**
- Auth tokens stored in **HTTP-only cookies** (not localStorage)
- `secure: true` and `sameSite: none` on cookies in production
- CORS restricted to frontend domain only
- `.env` file never committed to GitHub

---

## 🧪 Testing with Postman

### Setup

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Make sure your backend is running locally on `http://localhost:5000`
3. In Postman, go to **Settings → General** → turn on **"Automatically follow redirects"**
4. ⚠️ Critical — go to **Settings → General** → turn on **"Send cookies"** so JWT cookies are stored and sent automatically between requests

---

### Create an Environment

Using a Postman Environment lets you switch between local and production easily.

1. Click **Environments** → **New Environment** → name it `Local`
2. Add this variable:

| Variable | Value |
|---|---|
| `base_url` | `http://localhost:5000` |

3. Select `Local` as your active environment
4. Use `{{base_url}}` in all your request URLs

---

### Request Examples

#### 1. Register a new user
```
Method : POST
URL    : {{base_url}}/api/auth/register
Body   : raw → JSON
```
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Test@1234"
}
```
**Expected response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

#### 2. Login
```
Method : POST
URL    : {{base_url}}/api/auth/login
Body   : raw → JSON
```
```json
{
  "email": "john@example.com",
  "password": "Test@1234"
}
```
**Expected response:**
```json
{
  "success": true,
  "message": "Login successful"
}
```
> ✅ After login, Postman automatically stores the JWT cookie. All subsequent requests will send it automatically.

---

#### 3. Get user data (protected route)
```
Method : GET
URL    : {{base_url}}/api/user/data
Body   : none
```
**Expected response:**
```json
{
  "success": true,
  "userData": {
    "name": "John Doe",
    "email": "john@example.com",
    "isAccountVerified": false
  }
}
```
> ❌ If you get `401 Unauthorized` — make sure you logged in first so the cookie is set.

---

#### 4. Send email verification OTP
```
Method : POST
URL    : {{base_url}}/api/auth/send-verify-otp
Body   : none
```
**Expected response:**
```json
{
  "success": true,
  "message": "Verification OTP sent to email"
}
```
> Check your email inbox for the 6-digit OTP.

---

#### 5. Verify email with OTP
```
Method : POST
URL    : {{base_url}}/api/auth/verify-account
Body   : raw → JSON
```
```json
{
  "otp": "123456"
}
```
**Expected response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

#### 6. Send password reset OTP
```
Method : POST
URL    : {{base_url}}/api/auth/sent-reset-otp
Body   : raw → JSON
```
```json
{
  "email": "john@example.com"
}
```
**Expected response:**
```json
{
  "success": true,
  "message": "Reset OTP sent to email"
}
```

---

#### 7. Reset password
```
Method : POST
URL    : {{base_url}}/api/auth/reset-password
Body   : raw → JSON
```
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewPass@5678"
}
```
**Expected response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

#### 8. Logout
```
Method : POST
URL    : {{base_url}}/api/auth/logout
Body   : none
```
**Expected response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
> ✅ After logout, the cookie is cleared. Hitting a protected route should now return `401`.

---

### Testing Flow (Recommended Order)

Run your tests in this exact order to cover the full auth cycle:

```
1. Register        → creates account
2. Login           → sets JWT cookie
3. Get user data   → confirms cookie works
4. Send verify OTP → triggers email
5. Verify email    → confirms OTP flow
6. Logout          → clears cookie
7. Send reset OTP  → triggers reset email
8. Reset password  → confirms reset flow
9. Login again     → confirms new password works
```

---

### Common Postman Errors

| Error | Reason | Fix |
|---|---|---|
| `401 Unauthorized` | Cookie not sent | Login first, check "Send cookies" is on |
| `CORS error` | Wrong origin | Make sure backend is running on port 5000 |
| `Cannot POST /api/...` | Wrong URL | Double-check the endpoint path |
| `500 Internal Server Error` | Backend crash | Check your terminal for error logs |
| OTP email not received | Wrong SMTP config | Verify `SMTP_PASS` is a Gmail App Password |

---

## 🐛 Common Issues

**Cookies not working in production?**
Make sure your backend sets:
```js
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none'
})
```

**CORS errors?**
Make sure `FRONTEND_URL` in your backend `.env` exactly matches your Vercel URL (no trailing slash).

**Render backend sleeping?**
Free Render services sleep after 15 minutes of inactivity. The first request after sleep takes ~30 seconds. Upgrade to a paid plan to avoid this.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourprofile](https://linkedin.com/in/yourprofile)
