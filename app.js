// Import the express module
import express from "express";

// Import mysql2 module
import mysql2 from "mysql2";

// Import .env
import dotenv from "dotenv";
dotenv.config();

// Create a connection pool
const pool = mysql2
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })
  .promise();

// Create an instance of an express application
const app = express();

// Define a port number for
// our server to listen on
const PORT = 3000;

// Create an array to store orders
const orders = [];

// Enable static file serving
app.use(express.static("public"));

// set view engine to ejs
app.set("view engine", "ejs");

// Add "middleware" to allow the app to parse form data
// Access form data through req.body
app.use(express.urlencoded({ extended: true }));

// Define a default route ("/")
app.get("/", (req, res) => {
  res.render("home");
});

// Create a route to test the database
app.get("/db-test", async (req, res) => {
  // try/catch block for error handling
  try {
    const orders = await pool.query("SELECT * FROM orders");

    // Send the orders data back to the browser as JSON
    res.send(orders[0]);
  } catch (err) {
    // If ANY error happened in the 'try' block, this code runs
    // Log the error to the server console (for developers to see)
    console.error("Database error:", err);

    // Send an error response to the browser
    // status(500) means "Internal Server Error"
    res.status(500).send("Database error: " + err.message);
  }
});

// Add a contact route to display a contact view page
app.get("/contact-us", (req, res) => {
  res.render("contact");
});

// Add an order confirmation route
app.get("/confirm-order", (req, res) => {
  res.render("confirm");
});

// Add a route to process a pizza order
app.post("/submit-order", async (req, res) => {
  // Create a JSON object to store order data
  const order = req.body;
  console.log(order);

  // Convert toppings array to a comma-delimited string
  order.toppings = Array.isArray(order.toppings) ?
    order.toppings.join(", ") : "";

  // Define a SQL query to INSERT a new order
  const sql = `INSERT INTO orders (fname, lname, email, size, method, toppings, comment)
  VALUES(?,?,?,?,?,?,?)`;

  // Create an array of parameters from order data
  const params = [
    order.fname,
    order.lname,
    order.email,
    order.size,
    order.method,
    order.toppings,
    order.comment,
  ];

  // Execute the query
  const [result] = await pool.execute(sql, params);

  // Get the id from the newly constructed rows
  order.id = result.insertId;
  console.log("A new row was inserted with ID" + order.id);

  // Display the confirmation page
  res.render("confirm", { order });
});

// Add an admin route
app.get("/admin", async (req, res) => {
  // try/catch block for error handling
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders ORDER BY timestamp DESC",
    );

    // Send the orders data back to the browser as JSON
    console.log(orders);

    // Render the admin page
    res.render("admin", { orders });
  } catch (err) {
    // If ANY error happened in the 'try' block, this code runs
    // Log the error to the server console (for developers to see)
    console.error("Database error occured");

    // Send an error response to the browser status(500) means "Internal Server Error"
    res.status(500).send("Database error: " + err.message);
  }
});

// Start the server on the designated port
app.listen(PORT, () => {
  console.log(`Server is running at 
        http://localhost:${PORT}`);
});
