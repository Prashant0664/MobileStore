Mobile Store Assignment
This repository contains the code for a mobile store assignment, consisting of both client and backend folders. The project utilizes Node.js, MongoDB, React.js, Tailwind CSS, and Express.js to create a web-based mobile store application.

Features
Client Side (React.js)

User-friendly interface for browsing mobile devices
Ability to view product details, prices, and specifications
Shopping cart functionality to add/remove items
User authentication and authorization
Responsive design using Tailwind CSS for seamless experience across devices
Backend (Node.js, Express.js, MongoDB)

RESTful API endpoints for handling user authentication, product retrieval, and shopping cart management
MongoDB integration for storing product information, user data, and cart details
Secure authentication mechanisms and middleware for authorization
Express.js for server setup and routing
Folder Structure
client: Contains the frontend codebase developed using React.js and Tailwind CSS.
backend: Houses the server-side code written in Node.js and Express.js, integrating MongoDB for database operations.
Getting Started
To run this project locally, follow these steps:

Clone this repository to your local machine:

```
git clone https://github.com/Prashant0664/MobileStore.git
```
Install dependencies for both the client and backend folders:

```

cd MobileStore/client
npm install
  ```
```
cd ../backend
npm install
```
Set up MongoDB:

Install MongoDB locally or use a cloud-based service.
Configure the MongoDB connection URL in the backend code (if needed) - usually found in backend/config/db.js or a similar configuration file.
Start the development servers:


# Inside the client folder
```
npm run dev
```
# Inside the backend folder
```
npm start
```
Access the application:

Client: Open your web browser and go to http://localhost:PORT to view the client-side application.
Backend: The backend server will be running on http://localhost:5000 by default, providing the necessary API endpoints.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
