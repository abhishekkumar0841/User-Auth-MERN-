import express from 'express'
import {config} from 'dotenv'
import dbConn from './config/dbConn.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

config()
const app = express()

const PORT = process.env.PORT || 5050

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', userRoutes)

app.use('/', (req, res)=>{
    res.send("Home page")
})

app.use('*', (req, res)=>{
    res.send("**Error** 404 || This page does not exists!")
})

app.listen(PORT, async()=>{
    await dbConn()
    console.log(`Server is up and running on http://localhost:${PORT}`)
})