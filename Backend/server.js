const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const Users = require("./Models/Users");
const cloud = require("./cloudinaryConfig");
const port = 5000;

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());







app.get("/get/:uid", async (req, res) => {
  try {
    let user = await Users.findOne({ uid: req.params.uid });
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/post", async (req, res) => {
  try {
    var obj = {};

    if (req.body.name) {
      obj["name"] = req.body.name;
    }

    if (req.body.bio) {
      obj["bio"] = req.body.bio;
    }

    if (req.body.phoneNumber) {
      obj["phoneNumber"] = req.body.phoneNumber;
    }

    if (req.body.image) {
      obj["image"] = req.body.image;
    }

    let user = await Users.findOneAndUpdate({ uid: req.body.uid }, obj);
    if (!user) {
      const details = {
        name: req.body.name,
        bio: req.body.bio,
        phoneNumber: req.body.phoneNumber,
        uid: req.body.uid,
        image: req.body.image,
      };

      const newUser = new Users(details);
      await newUser.save();
      res.json({
        msg: "  user join to database ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});



app.listen(port, () => console.log(`server up and running ${port}`));
