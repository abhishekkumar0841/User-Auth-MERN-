const express = require("express")
const dbConnection = require("./config/dbConnection")
const userRoutes = require("./routes/userRoutes")
const cookeParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true, //credentials allow us to set cookies or etc..
}))
app.use(express.json())
app.use(cookeParser())
app.use('/api/auth', userRoutes)

app.get('/', (req, res)=>{
    res.send("Server is up and running")
})

app.listen(PORT, async()=>{
    await dbConnection();
    console.log(`Server is running on http://localhost:${PORT}`)
})