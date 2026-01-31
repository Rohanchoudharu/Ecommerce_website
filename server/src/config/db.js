import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/orbitcart";
  await mongoose.connect(uri, {
    autoIndex: true
  });
};

export default connectDb;
