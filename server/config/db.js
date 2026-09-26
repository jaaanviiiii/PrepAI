import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepai';
    mongoose.set('strictQuery', false);
    
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    // Attempt standard connection with 3s timeout
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`Local MongoDB connection failed (${err.message}). Starting In-Memory MongoDB fallback...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`In-Memory MongoDB Connected: ${inMemoryUri}`);
    } catch (memErr) {
      console.error('Failed to start MongoMemoryServer:', memErr.message);
      process.exit(1);
    }
  }
};
