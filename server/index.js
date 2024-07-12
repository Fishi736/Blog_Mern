const express = require('express')
const cors = require('cors')
require('dotenv').config()
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleWare')
const { connect } = require('mongoose')
const upload = require('express-fileupload')

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: '*',
    credentials: true
};


const app = express();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URI).then(
    console.log('Connected to Database')).catch(error => { console.log(error) })
app.listen(8000, () => console.log(`Server is running on port :${process.env.PORT}`)) 