
# 👁️‍🗨️ SAFETY FOR ALL - Women Safety Alert App

A real-time alert application built with the **MERN Stack** that empowers women by enabling them to send emergency alerts to authorities with a single click.

## 🌐 Live Links

- 🔗 **Frontend (Vercel)**: [https://women-safety-app-ru25.vercel.app/](https://women-safety-app-ru25.vercel.app/)
- 🔗 **Backend (Render)**: [https://women-safety-app-backend.onrender.com](https://women-safety-app-backend.onrender.com)

---

## 📱 Features

- 👤 **User Registration** – Collects user information including name, surname, DOB, contact number, and email.
- 🚨 **Emergency Alert** – Sends user's full details to authorities when triggered.
- 🧿 **Symbolic Interface** – Includes empowering icons: the Hamsa hand, a raised fist, and a lotus flower.
- 🌐 **Real-Time API Integration** – Alerts are sent through a connected backend API.
- 📩 **Data Storage** – User profiles are stored and managed securely.

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **MongoDB** | Cloud-hosted NoSQL database for user data |
| **Express.js** | Backend framework handling API routes |
| **React.js** | Frontend library used for UI components |
| **Node.js** | Runtime for executing JavaScript on the server |
| **Socket.io** *(optional for real-time)* | Enables real-time communication |
| **Vercel** | Hosting for the frontend |
| **Render** | Hosting for the backend API |

---

## 📁 Folder Structure

```
├── client/             # React Frontend (Vercel deployed)
│   └── src/            # React Components and Pages
├── server/             # Node + Express Backend (Render deployed)
│   └── models/         # Mongoose Schemas
│   └── routes/         # API Routes
├── .gitignore
├── README.md
└── package.json
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-8-capstone_-Enhle21.git
cd week-8-capstone_-Enhle21
```

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file inside `server/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the App Locally

#### Backend

```bash
cd server
npm start
```

#### Frontend

```bash
cd client
npm start
```

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users` | Register a new user |
| `GET`  | `/api/users` | Get all users |
| `POST` | `/api/alert` | Send emergency alert |

---

## 🙌 Contributors

- [@Enhle21](https://github.com/PLP-MERN-Stack-Development) – Lead Developer

---

## 🛡️ License

This project is open source and available under the [MIT License](LICENSE).

---

> Empowering safety through technology.
