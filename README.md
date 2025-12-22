LocalChefBazaar

Project Type: MERN Stack Web Application
Live URL: https://bucolic-alfajores-6cda44.netlify.app/

Project Overview

LocalChefBazaar is a modern online marketplace that connects local home cooks with customers seeking fresh, homemade meals. Customers can browse daily menus, place orders, leave reviews, and track their favorite meals. Home cooks can easily create meals, manage orders, and grow their local food business without a physical restaurant.

Key Features
Public Features

User registration and login using Firebase Authentication

Browse daily meals with card layout

Meal details page with full information and reviews

Favorite meals functionality

Private Features
User Dashboard

View Profile, Orders, Reviews, and Favorites

Place orders with automatic calculation of total price

Chef Dashboard

Create and manage meals

View and update order requests

Admin Dashboard

Manage Users (mark as fraud)

Manage Chef/Admin requests

View platform statistics (total users, orders, payments)

Other Features

Role-based access control: Admin, Chef, User

Responsive design for mobile devices

Loading and error pages

Dynamic page titles

React-Hook-Form used for all forms

Framer Motion animations on Hero section

Technologies Used

Frontend: React, Tailwind CSS, Framer Motion, React Router, React-Hook-Form

Backend: Node.js, Express.js

Database: MongoDB

Authentication: Firebase Authentication

Deployment: Netlify / Vercel

Installation & Setup

Clone the client and server repositories from GitHub

Create a .env file in both client and server to store Firebase and MongoDB credentials securely

Run the following commands:

cd client
npm install
npm run dev

cd server
npm install
npm start