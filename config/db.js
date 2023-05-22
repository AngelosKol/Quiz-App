const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
