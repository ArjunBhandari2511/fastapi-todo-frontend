import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TaskList = ({ tasks, fetchTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/tasks/${editingTask.id}`, {
        title: updatedTitle,
        description: updatedDescription,
        completed: editingTask.completed,
      });
      setEditingTask(null); // Close the edit form
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through" : ""}`}>
              {task.title}
            </h3>
            <p className="text-gray-600">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(task)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}

      {/* Edit Form Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <textarea
              placeholder="Description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;