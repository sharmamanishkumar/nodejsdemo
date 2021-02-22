const mongoose = require("mongoose");
const projectRouter = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: String, required: true },
    category: { type: String, required: true },
    productimage: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", projectRouter);
