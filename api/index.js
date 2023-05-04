require('dotenv').config()
const { connect } = require('./config')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const uploadRoutes = require('./routes/upload')
const categoriesRoutes = require('./routes/categories')
const { unknow } = require('./middlewares/middlewares')
const path = require('path')

const PORT = process.env.PORT || 2000

const app = express()

connect()
// middleware
app.use(cors({
  origin: 'http://localhost:5173', // necesary for using cookies
  credentials: true, // necesary for using cookies
  optionSuccessStatus: 200 // necesary for using cookies
}))
app.use('/uploads', express.static('uploads'))

console.log('path', path.resolve(__dirname) + '\\uploads')
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/categories', categoriesRoutes)
app.use('/upload', uploadRoutes)

app.use(unknow)

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
