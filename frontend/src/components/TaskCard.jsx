import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onUpdate, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const handleUpdateClick = () => {
    if (isEditing) {
      onUpdate(task._id, editedTask);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-300">
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Description"
            rows="3"
          />
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{task.title.toUpperCase()}</h3>
          <p className="mt-2 text-gray-600">{task.description}</p>
          <p className={`mt-2 text-sm font-semibold ${task.isCompleted ? 'text-green-600' : 'text-red-500'}`}>
            {task.isCompleted ? 'Completed' : 'Incomplete'}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-3 mt-4 flex-wrap">
        <button
          onClick={handleUpdateClick}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={onToggleComplete}
          className={`px-4 py-1 ${task.isCompleted ? 'bg-yellow-500' : 'bg-green-600'} text-white rounded hover:opacity-90 transition`}
        >
          Mark as {task.isCompleted ? "Incomplete" : "Completed"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;