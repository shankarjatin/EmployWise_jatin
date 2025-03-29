# EmployWise Assignment Submission 

## ✨ Overview

##The EmployWise Assignment is a React-based web application that integrates with the Reqres API to perform basic user management functions, including authentication, user listing, and user modification (edit & delete). This document provides details on the implementation, technologies used, and setup instructions.

## Screenshots

 ### Sign-Up
![App Screenshot](https://i.ibb.co/KpQW4w9w/image.png)

 ### Login
![App Screenshot](https://i.ibb.co/r230VJ7p/image.png)

 ### Dashboard
![App Screenshot](https://i.ibb.co/R4TSvR2N/image.png)

 ### Realtime-databse
![App Screenshot](https://i.ibb.co/Rp0Bj27Z/image.png)


## 🛠️ Tech Stack 

- **React.js** (with Javascript)
- **TailwindCSS** (for styling)
- **MaterialUI** (for styling)
- **Context API**: (State management)
- **React Router**  (Routing)
- **Axios**: ( API Requests)



  
## 🚀 Setup and Installation
 Prerequisites

Node.js installed
Node.js (v14 or higher)
npm or yarn




### Backend Setup
```bash

#Clone repository
git clone <repository-url>

# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start server
node server.js

```

### Frontend Setup
```bash
# Navigate to frontend folder
cd my-next-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```bash
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# Firebase Credentials
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_DATABASE_URL=your_firebase_database_url
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Google Sheets API
GOOGLE_SHEET_ID=your_google_sheet_id
RANGE=Sheet1!A1:Z1000

# Service Account Credentials
SERVICE_ACCOUNT_TYPE=service_account
SERVICE_ACCOUNT_PROJECT_ID=your_project_id
SERVICE_ACCOUNT_PRIVATE_KEY_ID=your_private_key_id
SERVICE_ACCOUNT_PRIVATE_KEY=your_private_key
SERVICE_ACCOUNT_CLIENT_EMAIL=your_client_email
SERVICE_ACCOUNT_CLIENT_ID=your_client_id
SERVICE_ACCOUNT_AUTH_URI=https://accounts.google.com/o/oauth2/auth
SERVICE_ACCOUNT_TOKEN_URI=https://oauth2.googleapis.com/token
SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
SERVICE_ACCOUNT_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_client_email
SERVICE_ACCOUNT_UNIVERSE_DOMAIN=googleapis.com

# JWT Secret Key
JWT_SECRET=your_secret_key

# Server Configuration
PORT=3000
```


