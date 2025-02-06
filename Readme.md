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

## **Uploading an Image via cURL**
To upload an image to the backend, use the following cURL command:
```sh
curl --location 'http://127.0.0.1:8080/upload' \
--form 'image=@"/Users/lukasz/Desktop/interview/Screenshot 2023-09-17 at 12.45.44.png"' \
--form 'metadata="image test"'
```
This command sends an image file along with metadata to the backend.

---

## **Retrieving Uploaded Files via cURL**
To retrieve a list of all uploaded files, use the following cURL command:
```sh
curl --location 'http://127.0.0.1:8080/files'
```
This command will return a JSON response with all uploaded files and their metadata.

---


## **Viewing Uploaded Files in the Web Portal**
To view the list of uploaded files in the frontend application, open the following URL in your browser:
```
http://127.0.0.1:3000/table
```
This page will display all uploaded files in a tabular format.



