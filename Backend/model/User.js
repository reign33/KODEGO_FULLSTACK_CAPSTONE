import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],

  // unit: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Units",
  //   },
  // ],

});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
