// Entry point used by Vercel serverless functions.
// Export the Express app from the backend so Vercel can use it as a handler.

const app = require('../backend/server');

// Export the app directly. Vercel's Node builder accepts an exported function/app.
module.exports = app;
