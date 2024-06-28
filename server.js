require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db'); // Import the database connection function
const cors = require('cors');
const uiGenerationRoute = require('./routes/uiGeneration');
const authRoutes = require('./routes/auth');
const definitionRoutes = require('./routes/definitions');

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ui-generation', uiGenerationRoute);
app.use('/api/definitions', definitionRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
