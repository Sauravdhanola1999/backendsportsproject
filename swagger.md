# Swagger Quick Start

Swagger has been integrated into your app! Just follow these steps:

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `swagger-ui-express` - Swagger UI for Express
- `yamljs` - YAML parser for loading swagger.yaml

## Step 2: Start Your Server

```bash
npm run dev
# or
npm start
```

## Step 3: Access Swagger UI

### Local Development:
Open your browser and go to:

**http://localhost:5000/api-docs**

### Production/Live URL:
If your backend is deployed, access Swagger at:

**https://your-production-url.com/api-docs**

Replace `your-production-url.com` with your actual production domain.

That's it! 🎉

## What's Included

✅ All 24 API endpoints documented
✅ Request/Response schemas
✅ Authentication support
✅ Try it out functionality
✅ Example values

## Using Swagger UI

1. **View Endpoints**: Browse all available endpoints organized by category
2. **Test APIs**: Click "Try it out" on any endpoint
3. **Authenticate**: 
   - First, use `/api/auth/signin-admin` to get a token
   - Click the **Authorize** button (top right)
   - Enter your JWT token
   - Click **Authorize** and **Close**
4. **Test Protected Endpoints**: Now you can test all protected endpoints

## Files Created/Modified

- ✅ `swagger.yaml` - Complete API specification
- ✅ `backend/src/config/swagger.js` - Swagger configuration
- ✅ `backend/src/app.js` - Swagger route added
- ✅ `backend/package.json` - Dependencies added

## Troubleshooting

**If you get an error about missing modules:**
```bash
npm install
```

**If Swagger UI doesn't load:**
- Make sure your server is running
- Check that the `swagger.yaml` file exists in the root directory
- Verify the route is `/api-docs`

**If you see CORS errors:**
- This shouldn't happen since Swagger UI is served from the same origin
- If it does, check your CORS configuration in `app.js`

## Production Setup

To configure Swagger for production:

1. Set environment variables:
   ```bash
   NODE_ENV=production
   PRODUCTION_URL=https://your-actual-domain.com
   # OR if using Vercel, it will auto-detect VERCEL_URL
   ```

2. The Swagger UI will automatically show the correct server URLs based on your environment.

3. Access Swagger in production:
   ```
   https://your-actual-domain.com/api-docs
   ```

## Alternative: View Online

If you prefer not to integrate, you can view the Swagger documentation online:

1. Go to https://editor.swagger.io/
2. Click **File** → **Import File**
3. Select `swagger.yaml`
4. View and test the API



