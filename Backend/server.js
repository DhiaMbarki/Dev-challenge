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

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const details = { email, password };
    const User = await Users.findOne({ email });
    if (User) {
      return res.json({ msg: "User already exist" });
    }
    const newUser = new Users(details);
    newUser.save();
    return res.json({
      msg: "  user has been successfully added to our database ",
      newUser,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getUser/:uid", async (req, res) => {
  try {
    let user = await Users.findOne({ uid: req.params.uid });
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateUser", async (req, res) => {
  try {
    const result = await cloud.uploads(req.body.profilePic);
    let update = await Users.findOneAndUpdate(
      { uid: req.uid },
      {
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        profilePic: result.url,
        email: req.body.userName,
        password: req.body.password,
      }
    );
    return res.json("user fields updated with success", update);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`server up and running ${port}`));
