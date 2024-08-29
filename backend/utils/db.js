import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); 
    }
};

// Event listeners for more detailed feedback
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established.');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected.');
});

export default connectDB;
