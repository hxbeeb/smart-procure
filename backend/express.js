const express = require('express');
const app = express();
const cors = require('cors');
const { GoogleGenerativeAI } =require( "@google/generative-ai");
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
app.use(express.json());
app.use(cors());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const models = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });
  const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const userSchema = new mongoose.Schema({

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  

  });
  
  
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if password isn't modified
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next(); // Call next to continue to save the user
    } catch (error) {
      console.error('Error hashing password:', error.message); // Log the error message
      return next(error); // Pass the error to the next middleware
    }
  });
  
  
  // Method to compare passwords
  userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  
  const User=mongoose.model('User',userSchema);
  module.exports = {
    User
  };








app.get('/get-ram-variants', async (req, res) => {
    const { itemName, make, model } = req.query;

    if (!make || !model || !itemName) {
        return res.status(400).json({ success: false, message: "Make/Model is required" });
    }

    const makeModel = `${make} ${model}`;
    console.log(makeModel);

    try {
        const prompt = `Return the list of specificaitons with available variants for ${makeModel}.\n no comments or anything else, just the list of specificaitons with available variants. no text or anything else.`;

        const result = await models.generateContent(prompt);
        res.json(result.response.text());
    } catch (error) {
        console.error('Error fetching RAM variants:', error);
        res.status(500).json({ error: 'Failed to fetch RAM variants' });
    }
});




app.get('/get-companies', async (req, res) => {
    const { item } = req.query; // Retrieve the 'item' parameter from the request query
    console.log(item);

    if (!item) {
        return res.status(400).json({ success: false, message: "Item name is required" });
    }

    try {
        const prompt = "Return the list of companies that manufacture " + item + ".\n no comments or anything else, just the list of companies. no text or anything else.";

        const result = await models.generateContent(prompt);
        console.log(result.response.text());
        res.json(result.response.text());
        console.log("companies sent");
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
});

app.get('/get-models', async (req, res) => {
  const { itemName, make } = req.query; // Retrieve the 'company' parameter from the request query
      console.log(make);
      
  if (!make) {
    return res.status(400).json({ success: false, message: "Company name is required" });
  }
  try {
      const prompt = "Return the list of "+itemName +"manufactured by " + make + ".\n no comments or anything else, just the list of "+itemName+" in a proper list not separated by commas.no text or anything else.without astriks and also which are available in the market not the old ones in india";

      const result = await models.generateContent(prompt);
      console.log(result.response.text());
      res.json(result.response.text());
  } catch (error) {
      console.error('Error fetching models:', error);
      res.status(500).json({ error: 'Failed to fetch models' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));














app.post('/api/register', async (req, res) => {
    const {email, password } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const user = new User({email, password});
      await user.save(); // This may throw an error if the pre-save fails
  
      // Generate JWT token
      console.log("saved");
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
      console.error('Registration error:', error); // Log the complete error
      res.status(500).json({ error: 'Registration failed', details: error.message });
    }
  });



app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      console.log("User found");
  
      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      console.log("Token generated:", token);
  
      // Send response with token, email, and department
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,

        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  });
  // Authentication Middleware to Protect Routes
  const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };
  
  // Protected Route Example
  app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route, user authenticated!' });
  });
  
  