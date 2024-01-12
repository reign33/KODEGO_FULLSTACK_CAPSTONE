import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 4,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

categorySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;

//npm i bcrypt to transform passwordhash to encrypted type