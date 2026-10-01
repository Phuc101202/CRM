import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if(!uri) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
        return connection;
}