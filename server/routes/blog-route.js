const express = require("express");
const blogRouter = express.Router();

const {
  fetchBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog-controller");

blogRouter.get("/", fetchBlog);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);
module.exports = blogRouter;
