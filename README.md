# Athletics Tournament Management & Live Scoreboard System

A full-stack athletics tournament management system designed to manage athletes, events, heats, and race results while delivering a real-time live leaderboard experience, similar to professional sports broadcasts.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Real-Time Features](#real-time-features)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Dhakkan is a comprehensive athletics tournament management system that enables administrators to efficiently manage competitions while providing viewers with real-time updates on race results and leaderboards. The system supports multiple events, heats, and automatic ranking calculations with instant WebSocket-based updates.

### Key Capabilities

- **Athlete Management**: Centralized database for managing athlete profiles
- **Event Organization**: Create and manage athletics events with multiple heats
- **Results Tracking**: Enter and process race results with automatic ranking
- **Live Leaderboard**: Real-time scoreboard updates using WebSocket technology
- **User Authentication**: Secure JWT-based authentication system

## ✨ Features

### Admin Features

- ✅ Add and manage athletes with detailed profiles
- ✅ Create athletics events (e.g., 100m, 200m sprints)
- ✅ Organize multiple heats per event
- ✅ Enter official race results (finish time, reaction time)
- ✅ Automatic ranking and position calculation
- ✅ Real-time leaderboard updates
- ✅ Toast notifications for success and error handling

### Viewer/User Features

- ✅ View upcoming and live events
- ✅ Watch real-time leaderboards
- ✅ See winner, runner-up, and podium standings
- ✅ Sports-broadcast-style UI experience
- ✅ No manual refresh required

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize ORM** - Database ORM
- **Socket.IO** - WebSocket server
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Database
- **MySQL** - Relational database (via Sequelize)

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Swagger, and app configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── helpers/         # Utility helpers (JWT, file upload, etc.)
│   │   ├── middleware/      # Custom middleware (auth, validation, error handling)
│   │   ├── migrations/      # Database migrations
│   │   ├── models/          # Sequelize models
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API route definitions
│   │   ├── seeders/         # Database seeders
│   │   ├── services/        # Business logic layer
│   │   ├── sockets/         # Socket.IO configuration
│   │   ├── utils/           # Utility functions
│   │   ├── validations/     # Input validation schemas
│   │   └── app.js           # Express app setup
│   ├── server.js            # Application entry point
│   ├── package.json
│   └── README.md
└── README.md                # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MySQL** (v8.0 or higher) or compatible database server
- **Git** (for cloning the repository)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dhakkan
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies** (if frontend is in a separate directory)
   ```bash
   cd ../frontend  # Adjust path as needed
   npm install
   ```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_NAME=dhakkan_db
DB_USER=root
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql

# JWT Configuration
JWT_SECRET=replace-with-a-secure-secret-key

# Optional: Environment
NODE_ENV=development
```

> **⚠️ Important**: Always set a secure `JWT_SECRET` in production. Never commit `.env` files to version control.

## 🏃 Running the Application

### Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Run database migrations**
   ```bash
   npm run migrate
   ```

3. **Run seeders (optional)**
   ```bash
   npx sequelize-cli db:seed:all --config src/config/sequelize.config.cjs
   ```

4. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm run start
   ```

   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

### Frontend

Navigate to the frontend directory and start the development server:

```bash
cd frontend  # Adjust path as needed
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### Resource Endpoints

- `GET /athletes` - Get all athletes
- `POST /athletes` - Create a new athlete
- `GET /athletes/:id` - Get athlete by ID
- `PUT /athletes/:id` - Update athlete
- `DELETE /athletes/:id` - Delete athlete

- `GET /events` - Get all events
- `POST /events` - Create a new event
- `GET /events/:id` - Get event by ID
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

- `GET /heats` - Get all heats
- `POST /heats` - Create a new heat
- `GET /heats/:id` - Get heat by ID
- `PUT /heats/:id` - Update heat
- `DELETE /heats/:id` - Delete heat

- `GET /results` - Get all results
- `POST /results` - Create a new result
- `GET /results/:id` - Get result by ID
- `PUT /results/:id` - Update result
- `DELETE /results/:id` - Delete result

### Authentication

Protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

For detailed API documentation, refer to:
- `backend/swagger.yaml` - OpenAPI specification
- `backend/postman_collection.md` - Postman collection documentation

## 🗄️ Database Setup

### Creating the Database

1. **Connect to MySQL**
   ```bash
   mysql -u root -p
   ```

2. **Create the database**
   ```sql
   CREATE DATABASE dhakkan_db;
   ```

3. **Exit MySQL**
   ```sql
   EXIT;
   ```

### Running Migrations

```bash
cd backend
npm run migrate
```

### Running Seeders

```bash
npx sequelize-cli db:seed:all --config src/config/sequelize.config.cjs
```

### Rolling Back Migrations

```bash
npx sequelize-cli db:migrate:undo --config src/config/sequelize.config.cjs
```

## 🔄 Real-Time Features

The application uses **Socket.IO** for real-time communication:

- **Live Leaderboard Updates**: When results are entered, all connected clients receive instant updates
- **No Manual Refresh**: Viewers see updates automatically without page refresh
- **WebSocket Connection**: Persistent connection for low-latency updates

### Socket Events

- Real-time result updates
- Leaderboard changes
- Event status changes

Socket configuration is located in `backend/src/sockets/socket.js`.

## 🏗️ Architecture

### Competition Model

The system follows a hierarchical structure:

1. **Event** - Represents the type of race (e.g., "100m Sprint - Men")
2. **Heat** - A smaller group of athletes competing within an event
3. **Result** - Official race timings for athletes in a heat
4. **Ranking** - Automatically calculated positions based on finish times

### Ranking Logic

- Athletes are ranked based on finish time (fastest = Position 1)
- Rankings recalculate automatically after result entry
- Tie-breakers can be extended (e.g., reaction time)

### Data Flow

```
Admin enters result → Backend processes ranking → WebSocket broadcast → All clients updated
```

## 🧪 Available Scripts

### Backend Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload
- `npm run migrate` - Run database migrations

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
- Ensure MySQL server is running
- Verify database credentials in `.env` file
- Check that the database exists

**JWT Authentication Errors**
- Ensure `JWT_SECRET` is set in `.env`
- Verify token is included in Authorization header
- Check token expiration

**Migration Errors**
- Ensure database exists before running migrations
- Check database user has proper permissions
- Verify Sequelize configuration

**Socket.IO Connection Issues**
- Ensure backend server is running
- Check CORS configuration
- Verify Socket.IO client configuration in frontend

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

## 👥 Authors

- Project Maintainers

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by professional sports broadcast systems

---

For more detailed information about specific components, refer to:
- `backend/README.md` - Backend-specific documentation
- `backend/projectoverview.md` - Detailed project overview
