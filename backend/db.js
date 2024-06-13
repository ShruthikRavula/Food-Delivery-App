const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shruthikravula24:Shruthik24@cluster0.hsf5hfc.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI );
        console.log("Connection established successfully");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_items = fetched_data;
        global.foodCategory = catData;
        //console.log(global.foodCategory)
         
    } catch (err) {
        console.error("Connection error:", err);
    }
};

module.exports = mongoDB;
