const router = require("express").Router();
const mongoose = require("mongoose");
const blogSchema = require("../schemas/BlogSchema");
const Blogs = mongoose.model("Blog", blogSchema);

router.get("/get-allBlogs", async (req, res) => {
  try {
    const result = await Blogs.find({});
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/signle-blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);
    res.send(blog);
  } catch (err) {
    res.send(res.message);
  }
});

module.exports = router;
