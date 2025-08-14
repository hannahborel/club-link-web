# 🔗 Testing Web App to API Connection

This guide will help you verify that the web application can successfully connect to the API and perform data operations.

## 🚀 Quick Start

### Option 1: Use the Startup Script (Recommended)

```bash
./start-services.sh
```

This script will:

- Start the API server on port 3000
- Start the web server on port 3001
- Handle cleanup when you stop the services

### Option 2: Manual Startup

```bash
# Terminal 1: Start API
cd club-link-api
npm run dev

# Terminal 2: Start Web (in new terminal)
cd club-link-web
PORT=3001 npm run dev
```

## 🧪 Testing the Connection

### 1. Check Service Status

- **API Server**: http://localhost:3000
- **Web App**: http://localhost:3001
- **Test Page**: http://localhost:3001/test-api

### 2. Test API Connection

```bash
node test-connection.js
```

### 3. Manual Testing via Web Interface

1. Open http://localhost:3001/test-api
2. Check the "API Health Check" section
3. Verify the connection status shows "Connected"
4. Test CRUD operations:
   - Create a new user
   - View all users
   - Edit a user
   - Delete a user

## 🔍 What to Look For

### ✅ Success Indicators

- API Health Check shows green "API Healthy"
- Connection Status shows "Connected"
- No error messages in the interface
- CRUD operations work without errors
- Users list updates after operations

### ❌ Common Issues

- **CORS Errors**: Check browser console for CORS-related errors
- **Connection Refused**: Ensure both services are running
- **Port Conflicts**: Verify ports 3000 and 3001 are available
- **Database Errors**: Check API server logs for database connection issues

## 🛠️ Troubleshooting

### CORS Issues

If you see CORS errors in the browser console:

1. Verify the API has CORS headers (already configured)
2. Check that the web app is running on port 3001
3. Ensure the API is running on port 3000

### Database Connection Issues

If the API can't connect to the database:

1. Check your `.env` file in `club-link-api`
2. Verify PostgreSQL is running
3. Run database migrations: `npm run db:migrate`

### Port Conflicts

If ports are already in use:

```bash
# Check what's using the ports
lsof -i :3000
lsof -i :3001

# Kill processes if needed
kill -9 <PID>
```

## 📊 Expected Results

When everything is working correctly, you should see:

1. **Health Check**: Green indicator with "API Healthy"
2. **Connection Status**: Shows both servers running and "Connected"
3. **User Operations**:
   - Create: Success message, user appears in list
   - Read: Users list populated with data
   - Update: User data changes in the list
   - Delete: User removed from list
4. **No Errors**: Clean interface with no error messages

## 🎯 Next Steps

Once the connection is verified:

1. ✅ Mark the task as complete in `workspaceConfig/.cursor/rules/tasks.mdc`
2. 🚀 Move on to the next task: "Connect mobile app to test route and verify data flow"
3. 📝 Update documentation if any issues were discovered

## 🔧 Development Notes

- The web app uses `fetch()` API for HTTP requests
- CORS is configured to allow requests from `http://localhost:3001`
- All API responses include CORS headers
- Error handling shows user-friendly messages
- The interface includes loading states and error boundaries
