
# 🌐 KFUPM Activity Network (KAN)


## 📘 Project Description

The **KFUPM Activity Network** is a web platform designed to help students discover clubs, events, and activities happening at KFUPM. It enables students to register for events, join clubs, and engage with the university's social and academic communities. The platform provides a seamless and intuitive user interface with features like:

- 🔗 Social media integration  
- 📝 Event registration  
- 🌑 Dark mode  
- 📊 Dashboards for students, admins, and club admins  

---

## ⚙️ Setup and Installation Instructions

### ✅ Prerequisites

Make sure you have the following installed:

- 🟢 **Node.js** – [Download Node.js](https://nodejs.org/)
- 🧰 **Git** – Version control system for managing code

### 📥 Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/funoonAlbalawi12/SWE363Project.git
   cd SWE363Project
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install additional libraries**:
   ```bash
   npm install react-scripts
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. **Open in your browser**:  
   Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## 🚀 Usage Instructions and Examples

Once the app is running, users are routed to one of the following dashboards depending on their role:

### 👤 Admin Dashboard  
**URL**: `/admin`  
Admins can:
- View and manage all registered clubs
- Approve club creation requests
- Monitor system-wide activity

### 🧑‍💼 Club Admin Dashboard  
**URL**: `/clubadmin`  
Club Admins can:
- Post and manage announcements and events
- Review and approve membership requests
- Edit club profiles and communicate with members

### 👨‍🎓 Student Dashboard  
**URL**: `/student`  
Students can:
- Browse and register for events
- Join clubs and view their event history
- Update their profile and follow club activity

### 🌗 Dark Mode  
- Available site-wide  
- Saves user preference using local storage

---

## 🛠️ Technologies Used

This project leverages the following technologies to build a responsive, interactive, and user-friendly platform:

- ⚛️ **React.js** – Front-end JavaScript library for building user interfaces
- 🎨 **CSS** – For custom styling and responsive design
- 🌐 **HTML5** – Markup language used to structure web content
- 📦 **Node.js & npm** – JavaScript runtime and package manager for server-side logic and dependency management
- 🧩 **React Router** – Handles routing between different pages and dashboards
- 🌑 **Dark Mode** – Theme toggle feature using local storage
- 🔗 **React Icons** – For adding beautiful icons to enhance UI
- 📁 **Git & GitHub** – For version control and collaboration

---

## 🖌️ Figma Design

You can explore the full design prototype of the KFUPM Activity Network on Figma:

👉 [View on Figma](https://www.figma.com/proto/qtgg5Tq9rN33B2dAEuZiSH/swe363-project-KAN-?node-id=0-1&t=ii6pirTXHxPRfdzG-1)

## 👥 Team Members and Roles

### 👩‍💻 Funoon Albalawi  
Responsible for implementing the flow of the **Admin** user, who is considered the main user of the website. Funoon focuses on the admin dashboard and tools that allow efficient management of clubs, clubs Admin, and events.

### 👩‍💻 Budoor Alshehri  
 Takes the role of implementing the flow of the **Admin** user, who is considered the main user of the website. Budoor ensures smooth integration of admin functionalities, improving navigation and user interface for the admin role.

### 👩‍💻 Khulud Alotaibi  
  Implements the flow for the **Student** user and the **homepage** of the website, which is considered the main user interface for students. Khulud focuses on making the student experience intuitive and user-friendly, ensuring easy access to events, clubs, and user profiles.

### 👩‍💻 Zahra Alhadab  
 Takes the role of implementing the flow for the **Club Admin** user, who is considered an essential user of the website. Zahra focuses on providing Club Admins with tools for managing clubs, posting announcements, and engaging with members.

### 👩‍💻 Rahf Altwairqi  
Implements the flow for the **Club Admin** user, who is a main user of the website. Rahf works alongside Zahra to ensure Club Admins have the necessary tools for managing events, announcements, and members effectively.
