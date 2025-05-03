# 🌐 KFUPM Activity Network (KAN)

## 📘 Project Description

**KFUPM Activity Network** is a full-stack web platform designed to help students discover, register, and engage with university events and clubs. It allows for role-based interaction between students, club administrators, and system administrators.

Key features include:

- 🔗 Social media integration  
- 📝 Event registration  
- 🌑 Dark mode  
- 📊 Role-based dashboards (Admin, Club Admin, Student)  
- 🧾 Ticket generation and QR scanning  
- 📥 Club membership application & review  
- 🛡️ Backend validation and duplicate protection  

---

## ⚙️ Setup and Installation Instructions

### ✅ Prerequisites

Ensure the following are installed:

- 🟢 **Node.js** – [Download Node.js](https://nodejs.org/)
- 🧰 **Git** – Version control system
- 🟠 **MongoDB** – For backend data storage (local or cloud via Atlas)

---

### 📁 Clone the Repository

```bash
git clone https://github.com/funoonAlbalawi12/SWE363Project.git
cd SWE363Project
```

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 🛠️ Backend Setup

```bash
cd ../backend
npm install
npm run dev
```

> 🔒 Create a `.env` file in the backend directory with the following:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 🚀 Usage Instructions

Users are redirected based on their roles:

### 👤 Admin
- Manage clubs, events, and user roles  
- Approve or reject club requests  

### 🧑‍💼 Club Admin
- Create and manage events  
- View registered members  
- Post announcements  

### 👨‍🎓 Student
- Register for events  
- View and manage tickets  
- Apply to join clubs  

---

## 🧱 Tech Stack

- **Frontend**: React.js, CSS, React Router, Axios  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Stripe  
- **Tools**: GitHub, VS Code, Figma  
- **Features**: REST API, JWT authentication, QR code ticketing, dark mode  

---

## 🖌️ Figma Design

🎨 [View on Figma](https://www.figma.com/proto/qtgg5Tq9rN33B2dAEuZiSH/swe363-project-KAN-?node-id=0-1&t=ii6pirTXHxPRfdzG-1)

---

## 👥 Team Members

| Name              | Role Description |
|-------------------|------------------|
| **Funoon Albalawi** | Admin dashboard & management logic |
| **Budoor Alshehri** | Admin UX/UI and system integration |
| **Khulud Alotaibi** | Student dashboard, homepage, and event registration |
| **Zahra Alhadab** | Club Admin interface: event & announcement control |
| **Rahf Altwairqi** | Club Admin interface: member & event management |
