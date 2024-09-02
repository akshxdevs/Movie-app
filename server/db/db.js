const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://monkeyslapzx:akash123@cluster0.ewzdfcp.mongodb.net/movie-app"
).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((error) => {
  console.error("Error while connecting to MongoDB:", error);
});

module.exports = mongoose;

