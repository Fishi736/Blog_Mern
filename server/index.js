const express = require('express')
const cors = require('cors')
require('dotenv').config()
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleWare')
const { connect } = require('mongoose')
const upload = require('express-fileupload')




const app = express();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: 'https://geeks-blog.onrender.com' }))
app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000', 'https://geeks-blog.onrender.com', 'https://geeks-blog.onrender.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
});
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URI).then(
    console.log('Connected to Database')).catch(error => { console.log(error) })
app.listen(8000, () => console.log(`Server is running on port :${process.env.PORT}`)) 