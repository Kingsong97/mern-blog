import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
    createComment,
    // editComment, deleteComment, likeComment, getComments, getPostComments 
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
// router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
// router.put("/editComment/:commentId", verifyToken, editComment);
// router.put("/likeComment/:commentId", verifyToken, likeComment);
// router.get("/getPostComments/:commentId", verifyToken, getPostComments);
// router.get("/getComments", verifyToken, getComments);


export default router;
