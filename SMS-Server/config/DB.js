const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;