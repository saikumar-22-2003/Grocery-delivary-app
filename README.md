<div align="center">

# 🛒 FreshDrop — Grocery Delivery App

**A modern, full-stack grocery delivery web application built with TypeScript.**

FreshDrop allows users to browse groceries, add items to cart, and place orders — powered by a robust backend with real-time background jobs, email notifications, image uploads, and payment support.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://grocery-delivary-app.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/saikumar-22-2003/Grocery-delivary-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- 🛍️ Browse grocery products by category & search
- 🛒 Add / remove items from cart
- 📦 Place and track orders
- 🔐 User authentication (Login / Register)
- 📧 Email notifications via **Brevo**
- 🔄 Background jobs via **Inngest**
- 🖼️ Image uploads via **Cloudinary**
- 💳 Payment integration via **Stripe** *(optional)*
- 📱 Fully responsive — mobile & desktop

---

## 🛠️ Tech Stack

**Frontend:** React.js · TypeScript · Tailwind CSS · Vercel

**Backend:** Node.js · Express.js · TypeScript · Neon DB · Prisma ORM · Brevo · Inngest · Cloudinary · Stripe

---

## 🚀 Getting Started

> ⚠️ Always run the **Server first**, then the **Client.**

```bash
git clone https://github.com/saikumar-22-2003/Grocery-delivary-app.git
cd Grocery-delivary-app
```

**Backend:**
```bash
cd server
npm install
cp .env.example .env   # Fill in your values
npx prisma db push
npm run server         # Runs at http://localhost:5000
```

**Frontend:**
```bash
cd ../client
npm install
cp .env.example .env   # Fill in your values
npm run dev            # Runs at http://localhost:5173
```

---

## ⚙️ Environment Variables

> 🔒 Never commit `.env` to GitHub. Use `.env.example` for reference.

**`server/.env`**
```env
PORT=5000
DATABASE_URL=your_neon_db_connection_string
JWT_SECRET=your_jwt_secret
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_sender_email
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key         # optional
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret # optional
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000
```

---

## 🌍 Deployment (Vercel)

Deploy **server** and **client** as separate Vercel projects.

1. Import repo → set Root Directory to `server` → add env vars → Deploy
2. Copy live server URL → import repo again → set Root Directory to `client` → set `VITE_API_URL` to live server URL → Deploy
3. Update **Stripe** webhook and **Inngest** app sync with the live server URL

| Service | URL |
|---|---|
| 🌐 Frontend | [grocery-delivary-app.vercel.app](https://grocery-delivary-app.vercel.app) |
| ⚙️ Backend | *(Add your live server URL here)* |

---

## 🤝 Contributing

Contributions are welcome! See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the full guide.

Commit format: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`

---

## 📄 License

Licensed under the [MIT License](LICENSE) — Copyright © 2026 Saikumar.

---

## 👨‍💻 Author

**Saikumar** — [@saikumar-22-2003](https://github.com/saikumar-22-2003)

---

<div align="center">

⭐ If you found this project helpful, please give it a star on GitHub! ⭐

</div>