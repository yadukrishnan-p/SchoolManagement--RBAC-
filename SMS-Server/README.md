# School Management System App

---

This is a **School Management System**, a MERN (MongoDB, Express.js, React, Node.js) application that allows users to manage student details, library records, fees, and staff information with role-based access control (RBAC). Users can perform CRUD (Create, Read, Update, Delete) operations, and the application includes user authentication based on roles (Admin, Office Staff, and Librarian), which dictates their access and capabilities within the system.

---

## Features

The application includes the following key features:

### 1. Role-Based Access Control (RBAC):

- **Admin**:
    - Full control over Office Staff and Librarians.
    - Can create, edit, and delete staff and librarian accounts.
    - Has access to all student details, library records, and fees management.
  
- **Office Staff**:
    - Access to student details, including the ability to manage fees history.
    - Can view library records and student-related information.
  
- **Librarian**:
    - Manages library details, including borrowing and return records of students.
    - Has view-only access to student details.

### 2. Authentication and Access Control:

- **User Authentication**: 
    - Users log in based on their roles.
    - Role-Based Access Control (RBAC) ensures that each user can only perform actions relevant to their role.
    - Enhances security and maintains data integrity.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance)
- **npm** (comes with Node.js)

---

## Installation Steps

Follow these steps to set up the project locally:

### 1. Install Backend Dependencies

1. Clone the repository.
2. Navigate to the server directory:
    ```bash
    cd SMS-Server
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Run the server:
    ```bash
    npm run dev
    ```

### 2. Install Frontend Dependencies

1. Navigate to the client directory:
    ```bash
    cd ../sms-ui
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Run the frontend server:
    ```bash
    npm start
    ```

### 3. Running in Development Mode

- The **backend** will run on `http://localhost:5400`.
- The **frontend** will run on `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```bash
PORT=5400
DB=mongodb://0.0.0.0:27017/SchoolManagementSys
JWT_SECRET_KEY=65C1C41FD1157CCD3B8E8918A5EB5
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
CLIENT_URL=http://localhost:3000
