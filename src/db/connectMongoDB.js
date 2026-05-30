import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.log('Failed connect database', error);
    throw error;
  }
};

export default connectDatabase;
