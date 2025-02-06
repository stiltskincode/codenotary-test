# Project Documentation

## Directory Structure
```
/project-root
│── backend/   # Backend application in Golang
│── frontend/  # Frontend application in React
```

---

## **Project Setup Instructions**

### **1. Backend (Golang)**

#### **Install Dependencies**
```sh
cd backend
go mod tidy
```

#### **Run the Backend**
```sh
cd backend
go run ./cmd/service/main.go
```
The backend will listen on `http://localhost:9000` by default.

---

### **2. Frontend (React)**


#### **Install Dependencies**
```sh
cd frontend
npm install
```

#### **Run the Frontend**
```sh
cd frontend
npm run dev  
```
The frontend will start at `http://localhost:3000` by default.

---
