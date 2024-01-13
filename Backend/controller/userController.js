import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Categories from "../model/Category.js";
import config from "../utils/config.js";

async function getUsers(req, res) {
  const users = await User.find({}).populate("category", {
    content: 1,
    important: 1,
  }).populate("unit", {
    content: 1,
    important: 1,
  });
  return res.json(users);
} //this function is just for checking para pwede i hit sa browser for testing

async function createUser(req, res, next) {
  try {
  const { username, password } = req.body;
  const saltRounds = 10; //level of hashing
  const passwordHash = await bcrypt.hash(password, saltRounds); // two params (data, how complicated the hashing)
  const user = new User({
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  //representation lang ng user
  const userForToken = {
    username: user.username,
    id: user._id, //kaya _id kinukuha lang ntn galing kay schema
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: 60 * 6000,
  }); //

  return res
    .status(200)
    .json({ token, username: user.username, name: user.name });
}catch(error){
  next(error);
}
  
} 


async function deleteUser(req, res, next) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const categoryIds = user.category;

    // Step 2: Delete the user document
    await User.findByIdAndDelete(id);

    // Step 3: Delete the associated categories
    await Categories.deleteMany({ _id: { $in: categoryIds } });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUsers,
  loginUser,
  deleteUser,
};
