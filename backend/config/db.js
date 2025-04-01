const mongoose = require("mongoose");

const dburl = "mongodb+srv://root:123@cluster-1.tqcba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1";

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connection = async () => {
    try {
        await mongoose.connect(dburl);
        console.log("MongoDB Connected~");
    } catch (e) {
        console.error(e.message);
        process.exit();
    }
};

module.exports = connection;