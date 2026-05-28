🚀 EduFlow AI — AI Powered Learning Management System (LMS)

<img width="1536" height="1024" alt="EduFlow Architecture" src="https://github.com/user-attachments/assets/f7c7353b-73b2-42bf-8738-43a393174708" />

EduFlow AI is a full-stack, AI-powered Learning Management System designed to simulate a real-world SaaS product. It enables structured curriculum creation (Subjects → Units → Lessons) with role-based access control and AI-assisted lesson generation.

Built with scalability, modular architecture, and production-level patterns in mind.

---

🧠 Key Features

🔐 Authentication & Authorization

- NextAuth (JWT-based session management)
- Credentials login system
- Role-Based Access Control (RBAC)
  - Admin
  - Teacher
  - Student
- Middleware-based route protection

---

📚 Core LMS Modules

📘 Subjects

- Create / Update / Delete Subjects
- Admin-only management

📂 Units

- Units under Subjects
- Teacher/Admin access control

📄 Lessons

- Full CRUD system
- Linked with Units
- Pagination & listing support
- Soft delete support

---

🤖 AI Integration

- AI-powered lesson generation
- Auto-generated:
  - Title
  - Description
  - Content
  - Objectives
  - Activities
- Powered by Groq/OpenAI SDK

---

📊 Dashboard

- Dynamic SaaS dashboard
- Displays system statistics:
  - Total Subjects
  - Total Units
  - Total Lessons
- Role-aware UI rendering

---

🏗️ Architecture Highlights

- Feature-based folder structure
- Separation of concerns:
  - Services
  - Repositories
  - Actions
  - Validators
- Prisma ORM for database layer
- Type-safe backend with TypeScript
- Scalable modular design

---

⚙️ Tech Stack

Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- React Hook Form + Zod

Backend

- Next.js Server Actions
- NextAuth
- Prisma ORM

Database

- PostgreSQL

AI Layer

- AI SDK (Groq / OpenAI compatible)

---

🔐 Security Model

- Middleware-based authentication
- RBAC at:
  - Middleware level (route protection)
  - Service/action level (business logic enforcement)
  - UI level (conditional rendering)
- Protected API actions

---

🚀 Future Improvements (Roadmap)

This project is designed to be extensible and production-ready. Future enhancements include:

📈 Advanced Features

- Student enrollment system
- Quiz & assessment module
- Progress tracking per student
- Certificate generation
- Discussion forum

📊 Analytics

- Lesson engagement metrics
- Completion rate tracking
- AI usage analytics

🤖 AI Expansion

- Quiz generation from lessons
- Auto grading system
- Personalized learning paths
- Smart recommendations

🌐 SaaS Enhancements

- Multi-tenancy (schools/organizations)
- Billing & subscription system
- Admin analytics dashboard
- API rate limiting

📱 UX Improvements

- Drag & drop curriculum builder
- Kanban-style lesson management
- Search & filtering system
- Skeleton loading states

---

📦 Deployment Ready

This project is designed for production deployment using:

- Vercel (Frontend + API)
- Neon / Supabase (Database)
- GitHub Actions (CI/CD pipeline)

---

👨‍💻 Developer

Shubham Shekhawat
MERN Stack Developer

---

⭐ Project Vision

The goal of EduFlow AI is to simulate a real SaaS-grade LMS platform that demonstrates:

- Scalable system design
- AI integration in education
- Production-ready authentication & RBAC
- Clean modular architecture

---

📌 Conclusion

EduFlow AI is not just a CRUD project — it is a future-ready SaaS foundation that can be extended into a full-fledged EdTech platform.
