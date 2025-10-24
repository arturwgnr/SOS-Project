# SOS Transpaletes - Full Stack Service Report System

SOS Transpaletes is a complete full-stack web application designed for a real mechanical service business that provides maintenance reports for forklifts and pallet trucks.  
The system allows technicians to create, store, and access detailed service reports from anywhere, integrating PDF generation, authentication, and a modern dashboard interface.

---

## 🚀 Overview

This project is a full-stack evolution of a previous local-only version that used localStorage.  
Now, all data is persisted in a PostgreSQL database and can be accessed securely by multiple users.  
The system supports both Pallet Truck Reports and Forklift Reports, each with their specific fields, structured dynamically in the database.

---

## 🧩 Features

### 🔐 Authentication
- Secure login and registration using bcrypt + JWT.
- Role-based access (admin, technician, etc.).
- Each user can view only their own reports.

### 🧾 Report Management
- Create detailed service reports for:
  - Pallet Trucks (simplified version)
  - Forklifts (advanced form with dynamic sections)
- Attach client and technician signatures.
- Automatically generate and store PDFs.
- Retrieve, view, and download reports from any device.

### ☁️ Cloud Integration
- PDF and signature upload via Cloudinary or similar storage service.
- Real-time sync between backend and frontend.

### 📊 Dashboard (optional)
- Stats by report type, technician, and month.
- Visualization of total services performed.

---

## ⚙️ Tech Stack

### Frontend
- React + TypeScript + Vite
- Modern responsive design
- Reusable components for forms and tables
- Integration with REST API
- State management with Context API
- PDF preview and download

### Backend
- Node.js + Express
- Prisma ORM with PostgreSQL
- Authentication with JWT and password hashing (bcrypt)
- File uploads with Multer and Cloudinary
- REST API architecture with modular routes
- Deployed on Render or Railway

---

## 🧱 Database Structure (Prisma)

The Report model supports both Pallet Truck and Forklift reports:

model Report {
  id                  Int       @id @default(autoincrement())
  type                String    // "paleteira" | "empilhadeira"
  client              String
  city                String?
  date                DateTime  @default(now())
  pdfUrl              String?
  user                User      @relation(fields: [userId], references: [id])
  userId              Int

  // Pallet Truck fields
  contactName         String?
  phone               String?
  email               String?
  brandModel          String?
  defectDescription   String?
  serviceDescription  String?
  loanProvided        Boolean?  @default(false)
  loanBrandModel      String?

  // Forklift fields
  requestNumber       String?
  forkliftModel       String?
  registration        String?
  hourmeter           String?
  defect              String?
  possibleCauses      String?
  solution            String?
  testPerformed       Boolean?
  testReason          String?
  result              String?
  observations        String?
  serviceType         String?

  clientSignature     String?
  technicianSignature String?

  otherServices       Json?
  trips               Json?
  materialsUsed       Json?

  createdAt           DateTime  @default(now())
}

---

## 🧰 Installation

### Clone the repository
git clone https://github.com/yourusername/sos-transpaletes-fullstack.git
cd sos-transpaletes-fullstack

### Install dependencies
npm install

### Environment variables
Create a .env file in the root folder:

DATABASE_URL="postgresql://user:password@localhost:5432/sosdb?schema=public"
JWT_SECRET="yoursecretkey"
CLOUDINARY_URL="your_cloudinary_connection_string"

### Run migrations
npx prisma migrate dev --name init

### Start the server
npm run dev

---

## 🌐 Deployment

Frontend: Vercel  
Backend: Render or Railway  
Database: PostgreSQL (Neon, Supabase, or Railway)  
Environment variables managed via .env and dashboard configuration.

---

## 👨‍🔧 Author

Developed by Artur Wagner as part of the *Ragnarok Full-Stack Odyssey* — a self-improvement and professional transformation project.  
This app combines technical precision, practical business logic, and clean modern design for real-world deployment.

---

## 🏁 Status

✅ Backend authentication complete  
✅ Report CRUD in progress  
🚧 Cloud integration next  
🚀 Frontend redesign under development
