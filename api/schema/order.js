const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    description: { type: String, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
