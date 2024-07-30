
# Flight Status Notifications

This project is a flight status notification system that sends updates via SMS and email to passengers. The system allows users to add passenger details, update flight statuses, and notify passengers about delays, cancellations, or gate changes.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type safety in the frontend code.
- **Axios**: For making API calls to the backend.

### Backend
- **Node.js**: For the server-side environment.
- **TypeScript**: For type safety in the backend code.
- **Express**: For building the RESTful API.
- **MongoDB Atlas**: For the database to store passenger and flight data.
- **Mongoose**: For interacting with MongoDB.
- **Vonage**: Used for sending SMS.
- **Nodemailer**: For sending emails.

### Additional Tools and Libraries
- **Axios**: Used in both frontend and backend for making HTTP requests.
- **React Router**: For routing in the React application.
- **dotenv**: For managing environment variables.
- **nodemon**: For automatically restarting the server during development.

## Features
- **Add Passenger**: A form to add passenger details.
- **Update Flight Status**: A form to update flight status and notify passengers.
- **Send Notifications**: Sends SMS and email notifications to passengers about flight status changes.

## Usage

### Running the Backend
1. Clone the repository.
2. Navigate to the backend directory: `cd backend`.
3. Install the dependencies: `npm install`.
5. Start the server: `npm start`.

### Running the Frontend
1. Navigate to the frontend directory: `cd frontend`.
2. Install the dependencies: `npm install`.
3. Start the React application: `npm start`.

### API Endpoints
- **Add Passenger**: `POST /addPassenger`
- **Update Flight Status**: `POST /updateFlightStatus`


## Notes
- Ensure phone numbers are in the correct international format (e.g., +919876543210 for an Indian number).
- Verify that your Vonage account has enough balance and is allowed to send messages to the regions you're targeting.

## License
This project is licensed under the MIT License.
