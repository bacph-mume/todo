import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/todos/";

// Lấy danh sách Todos
export const getTodos = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Thêm Todo
export const addTodo = async (newTodo) => {
  const response = await axios.post(BASE_URL, newTodo);
  return response.data;
};

// Cập nhật Todo
export const updateTodo = async (todo) => {
  const response = await axios.put(`${BASE_URL}${todo.id}/`, todo);
  return response.data;
};

// Xóa Todo
export const deleteTodo = async (id) => {
  await axios.delete(`${BASE_URL}${id}/`);
};

// Toggle status Todo
export const toggleStatus = async (id) => {
  await axios.patch(`${BASE_URL}${id}/toggle-status`);
};
