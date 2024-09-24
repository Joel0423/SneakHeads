const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/auth/", authRoutes);

app.get('/', function(req, res){
    res.send("Welcome to Authentication/Authorization API");
})


app.listen(8002);

