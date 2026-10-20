// Import the express module
import express from 'express';

// Create an instance
// Express application
const app = express();

// Define a port number
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// Create an array to store orders
const orders = [];

// Add "middleware" to allow the app to parse form data
// Access form data through req.body
app.use(express.urlencoded({extended: true }));


// Define a defaule route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// Add a contact rout to display a contact view page
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

// Add a order confirmation route to display a conformation page
app.get('/confirm-order', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});

// Add a route to process a pizza order
app.post('/submit-order' (req, res), () => {
    // Create a JSON object to store order data
    const order = req.body;
    order['timestamp'] = new Date();

    console.log(order);

    // Add order object to orders array
    orders.push(order);
    console.log(orders);

    // Display the conformation page
    res.sendFile(res.sendFile(`${import.meta.dirname}/views/confirm.html`));
});

// Add a order confirmation route to display a conformation page
app.get('/menu', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/menu.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});