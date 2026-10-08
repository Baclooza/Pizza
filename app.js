// Import the express module
import express from 'express';

// Create an instance
// Express application
const app = express();

// Define a port number
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// Define a defaule route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});