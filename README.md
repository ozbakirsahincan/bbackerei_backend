# Balkan Backerei Backend API

A Node.js/Express backend API for the Balkan Backerei web application.

## Tech Stack

- Node.js & Express.js
- MySQL with Drizzle ORM
- JWT Authentication
- File uploads with Multer

## Dependencies

- express: Web framework
- drizzle-orm: SQL ORM
- mysql2: MySQL driver
- bcrypt: Password hashing
- jsonwebtoken: JWT authentication
- multer: File upload handling
- helmet: Security headers
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- cookie-parser: Cookie handling

## Setup

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file with the following variables:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=bbackerei_db
JWT_SECRET=your_jwt_secret
```

4. Start development server:
```sh
npm run dev
```

This command will:
- Initialize database
- Push schema changes
- Seed initial data
- Start the server with nodemon

## API Routes

### Authentication
- `POST /api/auth/login`: User login

### Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `POST /api/users`: Create new user
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user
- `GET /api/users/roles`: Get available roles

### Categories
- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get category by ID
- `POST /api/categories`: Create new category
- `PUT /api/categories/:id`: Update category
- `DELETE /api/categories/:id`: Delete category

### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get product by ID
- `POST /api/products`: Create new product (with image upload)
- `PUT /api/products/:id`: Update product (with image upload)
- `DELETE /api/products/:id`: Delete product

### Health Check
- `GET /api/health`: API health check

## File Structure

```
src/
├── app.js              # Express app setup
├── server.js           # Server entry point
├── controllers/        # Route controllers
├── services/          # Business logic
├── models/           # Data models
├── routes/           # API routes
├── middlewares/      # Custom middlewares
├── db/               # Database configuration
└── public/          # Static files
    └── uploads/     # Uploaded images
```

## Development

Run the server in development mode with hot reload:

```sh
npm run dev
```

## Database Management

Initialize database:
```sh
npm run db:init
```

Push schema changes:
```sh
npm run db:push
```

Seed initial data:
```sh
npm run db:seed
```