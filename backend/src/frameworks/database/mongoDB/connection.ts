import mongoose from "mongoose"
import configKeys from "../../../config"
mongoose.set("strictQuery", true)

const connectDB = async () => {
    try {
        await mongoose.connect(configKeys.MONGO_DB_URL)
        console.log(`Database connected successfully`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB
