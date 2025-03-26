import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const dbName = 'kid-tutor'; // Specify your desired database name
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: dbName
        });
        console.log(`Connected to database: ${dbName}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;