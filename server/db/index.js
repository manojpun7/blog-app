const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://manojpun:qwerty12345@cluster0.w61ndxi.mongodb.net/")
  .then(() => console.log("connected mongodb"))
  .catch((e)=>console.log(e));
 