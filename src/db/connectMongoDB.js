import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
