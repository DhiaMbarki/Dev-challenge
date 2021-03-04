const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://root:root@crud.c1rxu.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("jawek behi");
  });

mongoose.set("useFindAndModify", false);

var db = mongoose.connection;

db.once("open", () => {
  console.log("Mongodb");
});

db.on("error", () => {
  console.log("there is an error");
});

let User = mongoose.Schema({
  uid: String,
  name: String,
  bio: String,
  phoneNumber: Number,
  image: String,
  password: String,
});

module.exports = mongoose.model("user", User);




