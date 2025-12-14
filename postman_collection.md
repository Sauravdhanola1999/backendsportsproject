# Dhakkan API Postman Collection

This directory contains Postman collection and environment files for testing all Dhakkan API endpoints.

## Files

1. **Dhakkan_API_Collection.postman_collection.json** - Complete API collection with all endpoints (Updated v2.0.0)
2. **Dhakkan_API_Environment.postman_environment.json** - Environment variables for easy configuration

## Latest Updates (v2.0.0)

- ✅ Athlete creation now requires `eventId` and `heatId`
- ✅ Automatically creates Result entry when creating athlete
- ✅ New endpoint: Update result by event/heat/athlete
- ✅ Improved validation and error handling
- ✅ Enhanced descriptions and examples

## Setup Instructions

### 1. Import Collection and Environment

1. Open Postman
2. Click **Import** button (top left)
3. Select both files:
   - `Dhakkan_API_Collection.postman_collection.json`
   - `Dhakkan_API_Environment.postman_environment.json`
4. Click **Import**

### 2. Configure Environment

1. In Postman, select the **Dhakkan API Environment** from the environment dropdown (top right)
2. Update the `baseUrl` variable if your server is running on a different port:
   - Default: `http://localhost:5000`
   - Change to match your server configuration

### 3. Authentication Setup

The collection includes automatic token management:
- When you signup or signin, the JWT token is automatically saved to the `authToken` environment variable
- All protected endpoints use this token automatically via Bearer authentication

## API Endpoints Overview

### Authentication
- **POST** `/api/auth/signup-admin` - Create admin user
- **POST** `/api/auth/signin-admin` - Login and get JWT token

### Athletes
- **GET** `/api/athletes` - Get all athletes
- **GET** `/api/athletes/:id` - Get athlete by ID
- **POST** `/api/athletes/create` - Create athlete (**NEW:** requires eventId and heatId, automatically creates Result)
- **PUT** `/api/athletes/edit/:id` - Update athlete (note: eventId/heatId cannot be updated here)
- **DELETE** `/api/athletes/soft-delete/:id` - Soft delete athlete

### Events
- **GET** `/api/events` - Get all events
- **GET** `/api/events/:id` - Get event by ID
- **GET** `/api/events/:id/details` - Get event with details
- **POST** `/api/events/create` - Create event
- **PUT** `/api/events/:id` - Update event
- **DELETE** `/api/events/soft-delete/:id` - Soft delete event

### Heats
- **GET** `/api/heats` - Get all heats
- **GET** `/api/heats/:id` - Get heat by ID
- **GET** `/api/heats/event/:eventId` - Get heats by event
- **POST** `/api/heats` - Create heat
- **PUT** `/api/heats/:id` - Update heat
- **DELETE** `/api/heats/:id` - Delete heat

### Results
- **GET** `/api/results/heat/:heatId` - Get results by heat
- **GET** `/api/results/leaderboard/:eventId` - Get leaderboard
- **POST** `/api/results` - Create/update result (updates if exists for heat+athlete)
- **PUT** `/api/results/:id` - Update result by ID
- **PUT** `/api/results/event/:eventId/heat/:heatId/athlete/:athleteId` - **NEW:** Update result by event, heat, and athlete (creates if doesn't exist)

## Usage Workflow

### 1. First Time Setup
1. Start your backend server (default: `http://localhost:5000`)
2. Use **Signup Admin** to create an admin account
3. The token will be automatically saved

### 2. Typical Workflow
1. **Create Event**: Create an event first
2. **Create Heat**: Create heats for the event
3. **Create Athlete**: Create athletes and assign them to event and heat (automatically creates result entry)
4. **Update Results**: Update athlete results using the result endpoints
5. **View Leaderboard**: Get the leaderboard for an event

## Request Examples

### Create Athlete (with Event and Heat Assignment)
```json
{
    "name": "John Doe",
    "country": "USA",
    "age": 25,
    "gender": "M",
    "personalBest": 10.5,
    "seasonBest": 10.8,
    "eventId": 1,
    "heatId": 1,
    "lane": 3
}
```

### Update Result by Event, Heat, and Athlete
```json
{
    "finishTime": 10.2,
    "reactionTime": 0.13,
    "status": "OK",
    "position": 1,
    "lane": 3
}
```

## Notes

- All endpoints marked with 🔒 require authentication (Bearer token)
- The token is automatically included in requests after login
- Status values for results: `OK`, `DNS` (Did Not Start), `DNF` (Did Not Finish), `DSQ` (Disqualified)
- Round values for heats: `HEAT`, `SEMI`, `FINAL`
- Gender values: `M`, `F`, `O`

## Troubleshooting

1. **401 Unauthorized**: Make sure you've logged in and the token is saved
2. **404 Not Found**: Check that the server is running and the baseUrl is correct
3. **400 Bad Request**: Verify the request body matches the validation requirements
4. **CORS Error**: Ensure your server CORS settings allow requests from Postman

## Support

For API documentation, refer to the validation files in `backend/src/validations/` directory.

