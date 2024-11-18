import mongoose from "mongoose";


export const connect = async () : Promise<void> => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables");
          }
          await mongoose.connect(process.env.MONGO_URL);
        console.log('Connect database successfully');
    } catch (error) {
        console.log('Connect database error: ', error);
    }
}
