const express = require('express');
const path = require('path');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 5000; // Change the port number if needed

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

// Define a route for file upload
// app.post('/upload', upload.single('csvFile'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // Process the uploaded CSV file
//   const csvFilePath = req.file.path;
//   const results = [];
//   fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//       // Once CSV is processed, you can perform further actions here
//       res.json(results); // Sending JSON response with parsed CSV data
//     });
// });

app.post('/upload', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Process the uploaded CSV file
    const csvFilePath = req.file.path;
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Construct HTML table markup
        let tableHtml = '<table border="1"><thead><tr>';
  
        // Add table headers based on CSV column names
        const headers = Object.keys(results[0]);
        headers.forEach((header) => {
          tableHtml += `<th>${header}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
  
        // Add table rows with CSV data
        results.forEach((row) => {
          tableHtml += '<tr>';
          headers.forEach((header) => {
            tableHtml += `<td>${row[header]}</td>`;
          });
          tableHtml += '</tr>';
        });
  
        tableHtml += '</tbody></table>';
  
        // Send HTML response with table
        res.send(tableHtml);
      });
  });
  

// Define a route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
