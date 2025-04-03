import React, { useEffect, useState } from "react";
import { useTodos } from "../context/todoContext";

const TodoForm = ({ todoDetail }) => {
  const { addTodo, updateTodo } = useTodos();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const [mode, setMode] = useState("new");

  useEffect(() => {
    if (todoDetail) {
      setTodo(todoDetail);
      setMode("update");
    }
  }, [todoDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.title.trim()) return;
    if (!todo.description.trim()) return;
    if (mode === "new") {
      addTodo(todo);
    } else {
      updateTodo(todo);
      setMode("new");
    }
    setTodo({ title: "", description: "" });
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          {mode == "new" ? "Add New Todo" : "Edit Todo"}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-600 font-medium mb-1"
          >
            Title
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="title"
            placeholder="Enter title..."
            value={todo.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            placeholder="Enter description..."
            value={todo.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
