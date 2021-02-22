const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../schema/project");
const Auth = require("../midelware/Auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("productimage"), Auth, (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    productname: req.body.productname,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    productimage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Data Inserted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  Product.find()
    .select()
    .exec()
    .then((result) => {
      const respond = {
        count: result.length,
        product: result.map((item) => {
          return {
            id: item._id,
            productname: item.productname,
            price: item.price,
            quantity: item.quantity,
            category: item.category,
          };
        }),
      };
      res.status(200).json(respond);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Product Delete",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: error,
      });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.updateOne(
    {
      _id: id,
    },

    {
      $set: {
        productname: req.body.productname,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
      },
    }
  )

    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        err: error,
      });
    });
});

module.exports = router;
