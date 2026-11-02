# 📚 BookNook — A Small Online Library

**BookNook** is a modern, responsive, full-stack online library management application where users can explore books, manage their own book collections, borrow available books, and return them.

The application provides secure authentication, book management, borrowing functionality, and a user-friendly interface.

Built with **Next.js, TypeScript, Tailwind CSS, Shadcn UI, Better Auth, Node.js, Express.js, and MongoDB**.

---

## 🌐 Live Links

| Platform               | Link                                     |
| ---------------------- | ---------------------------------------- |
| 🌍 Live Website        | Coming Soon                              |
| 💻 Frontend Repository | Add your GitHub frontend repository link |
| ⚙️ Backend Repository  | Add your GitHub backend repository link  |

---

## ✨ Key Features

### 🔐 Authentication & Security

* Email and password registration and login.
* Google OAuth authentication.
* Secure authentication using Better Auth.
* JWT-based authentication for protected backend APIs.
* Private routes for authenticated users.
* Secure logout functionality.
* Ownership verification for editing and deleting books.

### 📖 Book Management

* Explore all available books.
* View detailed information about individual books.
* Add new books to the library.
* Edit book information using a Shadcn UI Dialog.
* Delete books using a confirmation dialog.
* Manage personally added books through the My Books page.
* Track total and available book copies.

### 📚 Borrow & Return System

* Borrow available books.
* Confirm borrowing through an interactive popup.
* Automatically decrease available copies when a book is borrowed.
* Prevent duplicate active borrowing of the same book.
* Prevent borrowing when no copies are available.
* View personal borrowing history.
* Return borrowed books.
* Automatically increase available copies after returning a book.
* Track borrowed and returned dates.
* View borrowing status.

### 🏠 Homepage

* Modern and welcoming library homepage.
* New Arrivals section displaying the latest six books.
* Dynamic book cards with cover images and important details.
* Easy navigation to the complete book collection.
* Responsive layout for different screen sizes.

### 🎨 User Experience

* Responsive design for mobile, tablet, and desktop devices.
* Reusable components.
* Shadcn UI dialogs and confirmation popups.
* Lucide React icons.
* Loading indicators.
* Custom 404 page.
* Error and empty-state messages.
* Clean and consistent user interface.

---

## 🛠️ Technologies Used

### Frontend

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| Next.js      | React framework and routing |
| React        | User interface              |
| TypeScript   | Type-safe development       |
| Tailwind CSS | Responsive styling          |
| Shadcn UI    | Reusable UI components      |
| Lucide React | Icons                       |
| Better Auth  | Authentication              |

### Backend

| Technology            | Purpose                         |
| --------------------- | ------------------------------- |
| Node.js               | JavaScript runtime              |
| Express.js            | REST API development            |
| MongoDB               | Database                        |
| MongoDB Native Driver | Database operations             |
| Better Auth JWT       | Token-based authentication      |
| Jose                  | JWT verification                |
| CORS                  | Cross-origin request handling   |
| Dotenv                | Environment variable management |

---

## 📂 Project Structure

The application contains two separate projects.

### Frontend

```text
client-booknook/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   │
│   │   ├── books/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── add-book/
│   │   ├── my-books/
│   │   └── my-borrows/
│   │
│   ├── components/
│   │   ├── books/
│   │   ├── home/
│   │   └── ui/
│   │
│   ├── lib/
│   │
│   └── types/
│
├── package.json
└── README.md
```

### Backend

```text
server-booknook/
│
├── index.js
├── package.json
├── .env
└── .gitignore
```

---

## 🚀 Installation and Setup

### Prerequisites

Before running the project, make sure you have:

* Node.js and npm installed.
* A MongoDB Atlas database.
* A Google OAuth application configured.
* Git installed.

### 1. Clone the Repositories

Clone the frontend and backend repositories from GitHub.

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL

git clone YOUR_BACKEND_REPOSITORY_URL
```

### 2. Install Frontend Dependencies

Navigate to the frontend folder:

```bash
cd client-booknook
```

Install dependencies:

```bash
npm install
```

### 3. Configure Frontend Environment Variables

Create a `.env.local` file in the frontend root directory.

Example:

```env
BETTER_AUTH_SECRET=your_secure_auth_secret

BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_API_URL=http://localhost:8000
```

Use the environment variable names required by your actual authentication configuration.

**Important:** Never expose real database credentials, OAuth secrets, or authentication secrets in a public GitHub repository.

### 4. Start the Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

### 5. Install Backend Dependencies

Open another terminal and navigate to the backend directory:

```bash
cd server-booknook
```

Install dependencies:

```bash
npm install
```

### 6. Configure Backend Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000
```

### 7. Start the Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:8000
```

The frontend and backend must both be running for the complete application to work locally.

---

## 🔌 REST API Documentation

**Base URL**

```text
http://localhost:8000
```

### Book APIs

| Method | Endpoint         | Description               | Authentication |
| ------ | ---------------- | ------------------------- | -------------- |
| GET    | `/books`         | Retrieve all books        | Public         |
| GET    | `/books?limit=6` | Retrieve latest six books | Public         |
| GET    | `/books/:id`     | Retrieve a single book    | Public API     |
| POST   | `/books`         | Add a new book            | JWT Required   |
| PATCH  | `/books/:id`     | Update an owned book      | JWT Required   |
| DELETE | `/books/:id`     | Delete an owned book      | JWT Required   |

### Borrow APIs

| Method | Endpoint              | Description                         | Authentication |
| ------ | --------------------- | ----------------------------------- | -------------- |
| POST   | `/borrows`            | Borrow a book                       | JWT Required   |
| GET    | `/borrows/my`         | Retrieve personal borrowing history | JWT Required   |
| PATCH  | `/borrows/:id/return` | Return a borrowed book              | JWT Required   |

### Authentication

Protected API requests require a valid JWT.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

JWT tokens are retrieved automatically through Better Auth and sent with authenticated API requests.

Users do not need to manually generate or paste tokens into the application.

---

## 🗄️ Database Design

The application uses **MongoDB Atlas**.

### Books Collection

Stores information about books available in the library.

Example:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "category": "Fiction",
  "image": "https://example.com/book.jpg",
  "description": "A novel about following your dreams.",
  "totalCopies": 5,
  "availableCopies": 5
}
```

Book documents also contain ownership and creation information.

### Borrows Collection

Stores borrowing history and return information.

Important fields:

```text
bookId
userId
userName
userEmail
bookTitle
bookAuthor
bookImage
status
borrowedAt
returnedAt
```

Borrowing and returning use MongoDB transactions to maintain consistency between borrowing records and book availability.

---

## 🔒 Security Features

BookNook uses multiple layers of application security:

* Better Auth for user authentication.
* JWT verification for protected backend routes.
* Protected pages for authenticated users.
* Ownership checks for editing and deleting books.
* User-specific borrowing history.
* Duplicate active borrowing prevention.
* Validation of incoming book data.
* Environment variables for sensitive configuration.

A user cannot edit or delete another user's books through the protected APIs.

---

## 📱 Responsive Design

BookNook is designed to work across multiple screen sizes.

Supported layouts include:

* Mobile devices
* Tablets
* Laptops
* Desktop computers

The responsive interface includes the navigation bar, book cards, forms, dialogs, and borrowing management pages.

---

## 🧪 Testing

The application should be tested for the following scenarios:

| Test Case                | Expected Result                  |
| ------------------------ | -------------------------------- |
| User registration        | Account created                  |
| Email/password login     | User authenticated               |
| Google login             | User authenticated               |
| Add book                 | Book saved in MongoDB            |
| Edit own book            | Book information updated         |
| Edit another user's book | Access denied                    |
| Delete own book          | Book removed when allowed        |
| Borrow available book    | Borrow record created            |
| Borrow same book twice   | Duplicate active borrow rejected |
| Borrow unavailable book  | Request rejected                 |
| Return borrowed book     | Borrow status updated            |
| Return same borrow twice | Request rejected                 |
| View My Borrows          | Only user's records displayed    |
| Open an invalid page     | Custom 404 page displayed        |

---

## ☁️ Deployment

The application can be deployed using platforms that support Next.js and Node.js applications.

A possible deployment setup:

| Application | Platform                   |
| ----------- | -------------------------- |
| Frontend    | Vercel                     |
| Backend     | Node.js-compatible hosting |
| Database    | MongoDB Atlas              |

Before deployment:

1. Configure production environment variables.
2. Update frontend API URLs.
3. Update backend CORS settings to allow the deployed frontend.
4. Configure Better Auth production URLs.
5. Update Google OAuth callback URLs.
6. Verify JWT authentication in production.
7. Test book management and borrowing functionality.

---

## 🔮 Future Improvements

Potential future enhancements include:

* Advanced book search and filtering.
* Book reviews and ratings.
* Personalized book recommendations.
* Borrowing due dates and reminders.
* Admin dashboard.
* Book availability notifications.

---

## 👨‍💻 Author

Developed as a full-stack web development project.

**Project Name:** BookNook — A Small Online Library

**Frontend:** Next.js, React, TypeScript

**Backend:** Node.js, Express.js

**Database:** MongoDB

---

## 📄 License

This project was developed for educational and learning purposes.

---

### ⭐ Support

If you find this project useful, consider giving the GitHub repository a star!

**Happy Reading with BookNook! 📚**
