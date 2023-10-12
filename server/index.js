const express = require("express")
const dbConnection = require("./config/dbConnection")

require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res)=>{
    res.send("Server is up and running")
})

app.listen(PORT, async()=>{
    await dbConnection();
    console.log(`Server is running on http://localhost:${PORT}`)
})