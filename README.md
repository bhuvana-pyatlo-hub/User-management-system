**User Management System**

A modern, responsive web application for managing user registrations and profiles built with Flask and Bootstrap.

**Project Description**

The User Management System is a comprehensive solution that allows administrators to:

Register new users with a beautiful, validated form

View all registered users in an organized, searchable table

Manage user profiles with easy-to-use controls

Delete users with confirmation prompts

The application features a modern glass-morphism design with smooth animations, real-time form validation, and full mobile responsiveness.

**Features**

**Core Functionality**

User Registration: Secure registration form with validation

User Management: View all users with detailed information

User Deletion: Safe removal with confirmation dialogs

Search Functionality: Real-time user search by name or email

User Experience
Responsive Design: Works perfectly on desktop, tablet, and mobile

Real-time Validation: Instant feedback during form completion

Password Strength Indicator: Visual password strength meter

Interactive UI: Hover effects, animations, and smooth transitions

Modern Design: Glass-morphism effects and gradient backgrounds

Technical Features
Client-side Validation: JavaScript form validation

Server-side Validation: Flask backend validation

Session Management: Basic user data persistence

Error Handling: Comprehensive validation error management

**Technologies Used**

**Backend**

Python 3.x - Programming language

Flask - Web framework

Jinja2 - Template engine

**Frontend**

HTML5 - Markup language

CSS3 - Styling with custom gradients and animations

JavaScript - Client-side interactions and validation

Bootstrap 5 - CSS framework

Font Awesome - Icons

**Development**
Git - Version control

**Setup Instructions**

**Prerequisites**

Python 3.7 or higher

pip (Python package manager)

**Installation Steps**

Clone or Download the Project


If using Git

git clone <repository-url>

cd user-management-system

python -m venv venv

On Windows

venv\Scripts\activate

Install Flask

pip install flask

Project Structure Setup
Create the following folder structure:

user-management-system/

├── app.py

├── templates/

    ├── base.html
    
    ├── index.html
    
    ├── register.html
    
    └── users.html
    
└── static/

    ├── css/
    
    │   └── style.css
    
    └── js/
    
        └── script.js
        
**Run the Application**

python app.py

Access the Application

Open your web browser and navigate to:

http://localhost:5000
