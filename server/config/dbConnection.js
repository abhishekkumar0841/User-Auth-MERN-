const mongoose = require('mongoose')

const dbConnection = ()=>{
    mongoose.connect(process.env.DATABASE_URI).then((c)=>{
        console.log(`Database connected successfully with ${c.connection.host}`)
    }).catch((e)=>{
        console.log("Database connection failed!")
        console.log(e)
        console.log(e.message)
        process.exit(1)
    })
}

module.exports = dbConnection;