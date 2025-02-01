# MERN Authentication Project

This is a full-stack authentication system built using the MERN (MongoDB, Express, React, Node.js) stack. It provides user registration, login, and authentication functionalities using JWT (JSON Web Token) for secure access control.

## Features

*   **User Registration:** Users can create new accounts by providing necessary information.
*   **User Login:** Existing users can log in using their credentials.
*   **JWT Authentication:**  JSON Web Tokens are used for secure authentication and authorization.
*   **Password Hashing:** Passwords are securely hashed using bcrypt before being stored in the database.
*   **Protected Routes:**  Certain routes are protected and require authentication to access.
*   **Role-based Authorization (Optional):**  The project can be extended to implement role-based access control.
*   **State Management:**  Uses Context API or Redux for efficient state management on the frontend.

## Tech Stack

### Frontend

*   **React.js:**  The core library for building the user interface.
*   **React Router:**  For navigation and routing within the application.
*   **Context API / Redux:**  For managing application state.  Choose either Context API or Redux based on your preference and project complexity.
*   **Axios:**  For making HTTP requests to the backend API.

### Backend

*   **Node.js:** The runtime environment for the server.
*   **Express.js:**  A web framework for building the API.
*   **MongoDB & Mongoose:**  MongoDB as the database and Mongoose as an ODM (Object Data Modeling) library.
*   **JWT (JSON Web Token):** For creating and verifying authentication tokens.
*   **bcrypt:**  For securely hashing passwords.
*   **dotenv:** For managing environment variables.
