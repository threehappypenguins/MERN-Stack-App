require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        // Listen for requests
        app.listen(process.env.PORT,() => {
            console.log('Connected to db & listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })