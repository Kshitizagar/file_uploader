const express = require('express');
const path = require('path');

const app = express();
const port = 5000; // Change the port number if needed

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
