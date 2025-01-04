import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Your MySQL password
    database: "product_management",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Fetch all products
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.error("Error fetching products:", err); // Log the error for debugging
        return res.status(500).json({ fatal: true }); // Send a clear error response
      }
      res.json(results); // Send the query results as a response
    });
  });
  

// Add a new product
app.post("/api/products", (req, res) => {
    const product = req.body;
    db.query("INSERT INTO products SET ?", product, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, ...product });
    });
});

// Update an existing product
app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    db.query(
        "UPDATE products SET ? WHERE id = ?",
        [updatedProduct, id],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ id, ...updatedProduct });
        }
    );
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: "Product deleted successfully" });
    });
});


// Dummy users data
const users = [
    { UserId: 1, UserName: 'rthomas', Password: 'adminpass', Type: 'Admin', Email: 'abc@mail.com' },
    { UserId: 2, UserName: 'ajackson', Password: 'managerpass', Type: 'Manager', Email: 'non@mail.com' },
    { UserId: 3, UserName: 'pnelson', Password: 'staffpass', Type: 'Staff', Email: 'mmm@mail.com' }
  ];
  
  // Login API to check credentials and send user data with their role
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = users.find(u => u.Email === email && u.Password === password);
  
    if (user) {
      // If user exists and credentials match, return user data
      res.json({ success: true, user });
    } else {
      // If credentials are incorrect, send error response
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  // SignUp API endpoint
app.post('/api/signup', (req, res) => {
    const { email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.Email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
  
    // Create new user
    const newUser = {
      UserId: users.length + 1,  // Assign a new UserId
      UserName: email.split('@')[0],  // Set username based on email
      Password: password,
      Type: role,
      Email: email
    };
  
    // Add new user to the users array
    users.push(newUser);
    
    // Return success response
    res.json({ success: true, message: 'User created successfully' });
  });

  
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
