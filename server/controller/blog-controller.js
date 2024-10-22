const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//fetch list of blogs
const fetchBlog = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }
  if (!blogList) {
    return res.status(404).json({ message: "no blog found" });
  }
  return res.status(200).json({ blogList });
};

//add a new blog
const addBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });
  try {
    await newlyCreatedBlog.save();
  } catch (e) {
    console.log(e);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.status(500).json({ message: e });
  }
  return res.status(200).json({ newlyCreatedBlog });
};

//delete a blog
const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "blog not found" });
    }
    return res.status(200).json({ message: "successfully deleted!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "unable to delete data" });
  }
};

//update a blog
const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "something went wrong" });
  }
  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: "unable to update" });
  }
  return res.status(200).json(currentBlogToUpdate);
};

module.exports = { fetchBlog, addBlog, deleteBlog, updateBlog };
