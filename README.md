# AI-Predict 🤖

A full-stack web application that provides an intuitive interface for AI-powered predictions with secure user authentication and real-time prediction capabilities.

## 🛠️ Technology Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcrypt for password hashing

**Frontend:**
- React.js
- Redux.js for state management
- CSS3 & HTML5

## 🌟 Features

- User Authentication & Authorization (JWT)
- Secure password hashing with bcrypt
- Real-time AI predictions through REST APIs
- User-specific prediction history
- Responsive design
- Protected routes and data access

## 🏗️ Project Structure

```
AI-Predict/
├── client/
│   ├── src/
│   │   ├── components/
│   │   └── store/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── README.md
```

## 🚀 API Endpoints

**Authentication:**
- `POST /api/auth/SignUp` - User registration
- `POST /api/auth/Login` - User login

**Predictions:**
- `POST /api/predictEmail` - Make prediction (protected)
- `GET /api/EmailHistory` - Get prediction history (protected)

## 🔧 Installation

```bash
# Clone repository
git clone https://github.com/AyushGotawala/AI-Predict.git

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd frontend
npm install
npm run dev 
```

## 📝 Environment Variables

## Client
```env
VITE_API_URL='backend server url/api'
```

## Server
```env
MONGODB_URI=mongodb://localhost:27017/ai-predict
JWT_SECRET=your-secret-key
PORT=3000
GLOBAL_PORT = 'http://192.168.0.117'
SPAM_EMAIL_URL = 'Your FastAPI URL/predictEmail'
JWT_EXPIRES_IN=your-time
```

## 👨‍💻 Author

**Ayush Jitendra Gotawala**
- GitHub: [@AyushGotawala](https://github.com/AyushGotawala)