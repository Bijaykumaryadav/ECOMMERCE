# 🛒 Ecommerce Platform

This is a full-stack **Ecommerce platform** built with the **MERN stack** and modern frontend tooling.
It includes **user authentication, product management, cart, checkout, and payment integration**.

---

## 🚀 Features

### **Frontend (React + Vite + Redux + Tailwind)**

* ⚡ Fast development with **Vite**
* 🎨 Styled with **TailwindCSS** & **ShadCN UI (Radix + lucide-react)**
* 🔐 JWT authentication with **jwt-decode**
* 🛍 Product browsing, filtering & cart management
* 🔔 Toast notifications with **react-toastify**
* 🛠 State management with **Redux Toolkit**

### **Backend (Node.js + Express + MongoDB)**

* 🔑 User authentication with **JWT** & **Passport** (Google OAuth included)
* 🗄 MongoDB with **Mongoose** for database management
* 🛡 Secure password handling with **bcrypt**
* 📦 Product & category management
* 💳 Payment integration with **PayPal Checkout SDK**
* ☁ Media storage with **Cloudinary**
* 📧 Email service via **Nodemailer**
* 🛠 Session handling with **express-session** & **connect-mongo**

---

## 📂 Project Structure

```
root/
│── backend/ (ecommerce)    # Express + MongoDB API
│   ├── index.js             # Entry point
│   ├── routes/              # API routes
│   ├── models/              # Mongoose schemas
│   ├── controllers/         # Business logic
│   ├── middlewares/         # Auth & validation
│   └── package.json
│
│── frontend/                # React + Vite + Redux + Tailwind
│   ├── src/                 # React components & Redux slices
│   ├── public/              # Static assets
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
```

### **2. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run backend in dev mode:

```bash
npm run dev
```

### **3. Frontend Setup**

```bash
cd ../frontend
npm install
```

Run frontend in dev mode:

```bash
npm run dev
```

### **4. Build for Production**

From `backend/` run:

```bash
npm run build
```

This will build the frontend and serve it from Express.

### **5. Start in Production**

```bash
npm run prod
```

---

## 🔑 Available Scripts

### **Frontend**

* `npm run dev` → Start Vite dev server
* `npm run build` → Build production frontend
* `npm run preview` → Preview production build

### **Backend**

* `npm run dev` → Run backend with nodemon
* `npm run build` → Install frontend & build it
* `npm run prod` → Start backend in production

---

## 📦 Dependencies

### **Frontend**

* React, React Router, Redux Toolkit, Axios
* TailwindCSS, ShadCN, Radix UI, Lucide React
* React Toastify, React Icons

### **Backend**

* Express, Mongoose, JWT, Passport (Google OAuth)
* Bcrypt, Nodemailer, Cloudinary, Multer
* PayPal Checkout SDK, CORS, dotenv

---

## 👨‍💻 Author

**Bijay Kumar Yadav**
📍 Bangalore, India
💼 Full Stack Developer (MERN)
