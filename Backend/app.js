const express = require('express')
const userRouter = require('./routes/userRouter')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json('10kb'))
app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString();
    next();
})
app.use('/',userRouter )

module.exports =app