import { ObjectId } from "mongodb";
import { Router } from "express";

import { db } from "../utils/db.js";

const postRouter = Router();

//GET
postRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("posts");

    const posts = await collection.find({}).limit(10).toArray();

    return res.json({ data: posts });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

//GET ID
postRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("posts");
    const postId = new ObjectId(req.params.id);

    const postById = await collection.findOne({ _id: postId });

    return res.json({ data: postById });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

//POST
postRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("posts");

    const postData = { ...req.body, created_at: new Date() };
    console.log("Received post data:", postData);

    const newPostData = await collection.insertOne(postData);
    return res.json({
      message: `post Id (${newPostData.insertedId}) has been created successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

//PUT
postRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("posts");
    const newPostData = { ...req.body, modified_at: new Date() };

    const postId = new ObjectId(req.params.id);
    await collection.updateOne(
      {
        _id: postId,
      },
      {
        $set: newPostData,
      }
    );
    return res.json({
      message: `post ${postId} has been updated successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

//DELETE
postRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("posts");
    const postId = new ObjectId(req.params.id);

    await collection.deleteOne({ _id: postId });

    return res.json({
      message: `Post ${postId} has been deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default postRouter;
