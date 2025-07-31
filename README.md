# LabTasker 🧪🗂️  
A research project and task management platform designed for academic labs, researchers, and students. Built with a modern tech stack to streamline lab workflows, track progress, and encourage collaboration.

---

## 🚀 Features

- 📊 **Project Organization**  
  Structure your research projects with clear hierarchies and timelines.

- ✅ **Task Management**  
  Break down complex research into manageable, trackable tasks.

- ⏰ **Deadline Tracking**  
  Stay on top of deadlines with intuitive reminders.

- 👥 **Team Collaboration**  
  Work seamlessly with supervisors, lab members, and collaborators.

- 🔐 **Authentication**  
  Secure registration/login using JWT tokens and React Context.

- 🖥️ **Responsive UI**  
  Clean and responsive design using Tailwind CSS and shadcn/ui components.

---

## 🧱 Tech Stack

- **Frontend**: React + TypeScript + Vite  
- **Styling**: Tailwind CSS, shadcn/ui  
- **Routing**: React Router  
- **State Management**: React Context API  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (via Mongoose)  
- **Auth**: JSON Web Tokens (JWT)

---

## 📁 Folder Structure

```
labtasker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   └── index.html
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/labtasker.git
cd labtasker
```

### 2. Setup the Backend

```bash
cd backend
npm install
touch .env
```

Create a `.env` file with the following:

```env
PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/labtasker
JWT_SECRET=your_jwt_secret
```

Then run the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

Backend `.env`:

```
PORT=
MONGO_URI=
JWT_SECRET=
```

Frontend: None required at this stage.

---

## 🧪 Sample API Endpoints

```
POST   /api/users/register       Register a new user  
POST   /api/users/login          Authenticate user & return token  
GET    /api/projects             Fetch all projects (protected)  
POST   /api/projects             Create a new project (protected)  
GET    /api/projects/:id         Get project details (protected)  
```

---

## 🧰 Dependencies

- Frontend:
  - `react`, `react-router-dom`, `@fontsource/inter`
  - `tailwindcss`, `clsx`, `shadcn/ui`, `@hello-pangea/dnd`

- Backend:
  - `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`

---

## 🖼️ Screenshots

| Landing Page | Dashboard |
|--------------|-----------|
| ![Landing](./screenshots/landing.png) | ![Dashboard](./screenshots/dashboard.png) |

---

## 💡 Roadmap Ideas

- 🔔 Add email & in-app notifications  
- 📱 Mobile responsiveness enhancements  
- 📊 Analytics dashboard for project insights  
- ⏳ Time tracking for tasks  
- 🧪 Lab-specific features (e.g., reagent tracking, experiment protocols)

---

## 🤝 Contributing

1. Fork the project  
2. Create a feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m "Add feature"`  
4. Push to the branch: `git push origin feature/YourFeature`  
5. Open a Pull Request

---

## 📄 License

MIT License © 2025 [Your Name]

---

## 💬 Contact

Have feedback, suggestions, or want to collaborate?

📧 Email: your@email.com  
🔗 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)  
🌐 Website: [yourdomain.com](https://yourdomain.com)
