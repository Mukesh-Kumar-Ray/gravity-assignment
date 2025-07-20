import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!description || !title){
    return res.status(400).json({ message: "Heading and Title are required" });
  }
    

  try {
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
};


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title,description, isCompleted } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title,description, isCompleted },
      { new: true }
    );

    if (!task){
        return res.status(404).json({ message: "Task not found" });
    } 

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task){
        return res.status(404).json({ message: "Task not found" });
    } 

    res.status(200).json({ message: "Task deleted", task });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};
