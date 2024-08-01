const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const app = express();



const path =require('path')

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true
}));

app.use("/api", router);

const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Connection successful to DB`);
    console.log(`Server is running on port ${PORT}`);
  });
});
