require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3127
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND
const path = require('path');
var app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
var cors = require('cors')
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    Credentials: true
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())



const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoute = require('./routes/newsRoute');
const knowledgeRoute = require('./routes/knowledgeRoute');
const basicProfileRoutes = require('./routes/basicProfileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api/news', newsRoute);
app.use('/api/knowledge', knowledgeRoute);
app.use('/api/profiles', basicProfileRoutes);


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
