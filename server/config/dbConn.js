import mongoose from "mongoose";

const dbConn = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log(`DATABASE CONNECTED SUCCESSFULLY WITH ${conn.connection.host}`)
        }
    } catch (error) {
        console.log("FAILED TO CONNECT TO DATABASE")
        console.log(error)
        process.exit(1)
    }
}

export default dbConn;
