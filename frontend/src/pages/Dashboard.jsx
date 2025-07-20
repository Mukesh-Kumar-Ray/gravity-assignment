import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { toast, Bounce} from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task`, {
        withCredentials: true,
      });
      setTasks(res.data || []);
    } catch (err) {
      console.error("Error fetching tasks", err);
      setTasks([]);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task`, newTask, {
        withCredentials: true,
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "" });
      toast.success("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
        toast.error(" Some thing went wrong while adding Task!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
      console.error("Error adding task", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("🦄 ToDo Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
        toast.error(" Some thing went wrong while deleting Task", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
      console.error("Error deleting task", err);
    }
  };

  const handleUpdate = async (taskId, updatedData) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/${taskId}`,
        updatedData,
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
      toast.success("🦄 ToDo Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
        toast.error(" Some thing went wrong while updating Task", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
      console.error("Error updating task", err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/${task._id}`,
        { ...task, isCompleted: !task.isCompleted },
        { withCredentials: true }
      );
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
      toast.success("ToDo sate has been changed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
        toast.error(" Some thing went wrong while changing Task state", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
      console.error("Error toggling task status", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "incomplete") return !task.isCompleted;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1 rounded ${
            filter === "completed" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-4 py-1 rounded ${
            filter === "incomplete" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          Incomplete
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onToggleComplete={() => handleToggleComplete(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
