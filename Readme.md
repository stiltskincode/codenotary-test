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

## **Configuring Frontend ↔ Backend Communication**

To connect the frontend with the backend, ensure that `frontend/.env` contains:
```
REACT_APP_API_URL=http://localhost:8080
```
In React code, you can read the backend URL with:
```js
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## **Building the Application**

### **Frontend (React) - Production Build**
```sh
cd frontend
npm run build  # or `yarn build`
```
The build output will be placed in `frontend/build/`.

### **Backend (Golang) - Production Build**
```sh
cd backend
go build -o server main.go
./server
```

---

## **Docker - Running the Application in Containers**

### **1. Build and Run Containers**
Create a `docker-compose.yml` file in the project root and run:
```sh
docker-compose up --build
```
The backend will be available at `http://localhost:8080`, and the frontend at `http://localhost:3000`.

---

Now you have a complete setup guide for running your backend/frontend project! 🚀

