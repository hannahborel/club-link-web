# API Test Page Documentation

## Overview

The API test page (`/test-api`) is a comprehensive testing interface that demonstrates the data flow between the Club Link web application and the API server. It provides a full CRUD interface for testing user management operations.

## Prerequisites

Before testing, ensure both servers are running:

1. **API Server** (club-link-api): `http://localhost:3000`
2. **Web Server** (club-link-web): `http://localhost:3001`

## Features

### 1. Health Check

- **Real-time API status monitoring**
- Visual indicator (green/yellow/red dot)
- Manual health check button
- Automatic health check on page load

### 2. Connection Status

- **API Server**: http://localhost:3000
- **Web Server**: http://localhost:3001
- **Status**: Connected/Disconnected/Checking

### 3. User Management (CRUD Operations)

#### Create User

- Email (required, validated)
- Role selection (admin/owner/member)
- Clerk ID (required)
- Form validation and error handling

#### Read Users

- Fetch all users from database
- Display in organized table
- Refresh button for real-time updates
- User count display

#### Update User

- Edit existing user information
- Pre-populated form with current data
- Cancel edit functionality
- Optimistic UI updates

#### Delete User

- Confirmation dialog
- Immediate UI removal on success
- Error handling for failed deletions

### 4. Error Handling

- **Network errors**: Connection issues, timeouts
- **API errors**: Validation errors, server errors
- **User feedback**: Clear error messages with details
- **Form validation**: Required field validation

### 5. UI Features

- **Responsive design**: Works on all screen sizes
- **Loading states**: Visual feedback during operations
- **Disabled states**: Buttons disabled when API is unhealthy
- **Modern styling**: Tailwind CSS with consistent design

## Testing Scenarios

### 1. Basic Connectivity

1. Navigate to `/test-api`
2. Check health status indicator
3. Verify connection status shows "Connected"

### 2. Create User Flow

1. Fill out the form with test data
2. Submit the form
3. Verify user appears in the table
4. Check that form resets after successful creation

### 3. Read Users Flow

1. Click "Refresh" button
2. Verify users are loaded from database
3. Check user count is accurate

### 4. Update User Flow

1. Click "Edit" on any user
2. Modify the form data
3. Submit the update
4. Verify changes are reflected in the table

### 5. Delete User Flow

1. Click "Delete" on any user
2. Confirm deletion in dialog
3. Verify user is removed from table

### 6. Error Handling

1. Try to create user with invalid email
2. Test with API server stopped
3. Verify appropriate error messages

## API Endpoints Tested

The test page exercises these API endpoints:

- `GET /api/test-db` - Fetch all users
- `POST /api/test-db` - Create new user
- `PUT /api/test-db?id={id}` - Update existing user
- `DELETE /api/test-db?id={id}` - Delete user

## Data Flow Verification

### Frontend → Backend

1. **Form submission**: User input is collected and sent via fetch API
2. **Data validation**: Frontend validates required fields
3. **HTTP requests**: Proper headers and body format
4. **Error handling**: Network and API errors are caught and displayed

### Backend → Frontend

1. **Response parsing**: JSON responses are parsed and validated
2. **State updates**: UI state is updated based on API responses
3. **Optimistic updates**: UI reflects changes immediately
4. **Error display**: Backend errors are shown to user

### Database Integration

1. **Data persistence**: Created users are stored in database
2. **Real-time updates**: Changes are immediately visible
3. **Data integrity**: All CRUD operations maintain data consistency

## Troubleshooting

### Common Issues

1. **API Server Not Running**
   - Error: "Network error: Failed to fetch"
   - Solution: Start the API server on port 3000

2. **CORS Issues**
   - Error: "Network error: CORS policy"
   - Solution: Ensure API server allows requests from localhost:3001

3. **Database Connection Issues**
   - Error: "API responded with status: 500"
   - Solution: Check database connection and schema

4. **Port Conflicts**
   - Error: "Network error: Connection refused"
   - Solution: Verify ports 3000 and 3001 are available

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API server is running and accessible
3. Test API endpoints directly with Postman/curl
4. Check database connection and schema
5. Verify environment variables are set correctly

## Next Steps

After successful testing:

1. **Implement authentication**: Add Clerk integration
2. **Add real user types**: Replace test users with actual user management
3. **Implement role-based access**: Add admin/owner/member permissions
4. **Add form validation**: Implement Zod schemas on frontend
5. **Add error boundaries**: Implement React error boundaries
6. **Add loading states**: Implement skeleton loaders
7. **Add pagination**: Handle large user lists
8. **Add search/filtering**: Implement user search functionality

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React useState hooks
- **API Calls**: Native fetch API
- **Error Handling**: Try-catch with user-friendly messages
- **TypeScript**: Full type safety with interfaces
- **Responsive**: Mobile-first design approach
