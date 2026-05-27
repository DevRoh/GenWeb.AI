import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected")
    } catch (error) {
        console.log("Db Connnection error: "+error)
    }
}

export default connectDB