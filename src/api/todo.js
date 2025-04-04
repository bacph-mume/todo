import axios from "axios";
import axiosClient from "../utils/axios";

// Get all todos
export const getTodos = async () => {
  const response = await axiosClient.get(
    import.meta.env.VITE_BASE_URL + "todos/"
  );
  return response.data;
};

// Add Todo
export const addTodo = async (newTodo) => {
  const response = await axiosClient.post(
    import.meta.env.VITE_BASE_URL + "todos/",
    newTodo
  );
  return response.data;
};

// Update Todo
export const updateTodo = async (todo) => {
  const response = await axiosClient.put(
    `${import.meta.env.VITE_BASE_URL}todos/${todo.id}/`,
    todo
  );
  return response.data;
};

// Delete Todo
export const deleteTodo = async (id) => {
  await axiosClient.delete(`${import.meta.env.VITE_BASE_URL}todos/${id}/`);
};

// Toggle status Todo
export const toggleStatus = async (id) => {
  await axiosClient.patch(
    `${import.meta.env.VITE_BASE_URL}todos/${id}/toggle-status`
  );
};
