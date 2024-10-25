require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3127
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND
var app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var cors = require('cors')
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    Credentials: true
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())



const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', userRoutes);

//database connect
mongoose.set("strictQuery", false)
mongoose.
    connect(MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`)
        });
    }).catch((error) => {
        console.log(error)
    })
