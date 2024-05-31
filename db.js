const mongoose = require("mongoose");
require('dotenv').config()

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoURL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.db.collection("food_items");
    const data = await collection.find({}).toArray();
    const fetchCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await fetchCategory.find({}).toArray();


    // console.log(data);
    global.food_items=data;
    global.food_Category=catData;
    // console.log(global.food_items);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = DbConnect;
