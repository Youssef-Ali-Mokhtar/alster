const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users')
const productRoutes  = require('./routes/products')

const cors = require('cors')
const app = express()
require('dotenv').config()


app.use(cors({origin: [process.env.CORS]}))
app.use(express.json())

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.all('*', (req, res)=>{
    res.status(404).json("NOTHING")
})

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port ${process.env.PORT}...`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })

