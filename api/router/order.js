const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../schema/order");
const Product = require("../schema/project");

router.post("/", (req, res, next) => {
  // console.log(req.body);
  const product = req.body.product;
  Order.findById(product)
    .then((productId) => {
      // console.log(productId, "new product");
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),

        product: req.body.product,
        description: req.body.description,
      });
      return order.save().then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Order was created",
          // createOrder: {
          //   _id: result._id,
          //   product: result.productId,
          //   quantity: result.quantity,
          // },
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Product not found",
      });
    });
});

module.exports = router;
