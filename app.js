const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const routerProject = require("./api/router/projectRouter");
const user = require("./api/router/user");
const descOrder = require("./api/router/order");

mongoose.connect(
  `mongodb+srv://prelax:${process.env.ATLAS_PW}@cluster0.wxg53.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
  // `mongodb+srv://prelax:${process.env.ATLAS_PW}@cluster0.wxg53.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.Promise = global.Promise;

app.use("/product", routerProject);
app.use("/Order", descOrder);
app.use("/user", user);

// app.use((req, res, next) => {
//   const error = new Error("not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

module.exports = app;
