import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddTask = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/tasks", {
        title,
        description,
        completed: false,
      });
      setTitle("");
      setDescription("");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Add Task
        </button>
      </div>
    </motion.form>
  );
};

export default AddTask;