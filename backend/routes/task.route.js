import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/", protect, createTask);         
router.get("/", protect, getTasks);            
router.put("/:id", protect, updateTask);       
router.delete("/:id", protect, deleteTask);    

export default router;
