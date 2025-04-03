import { useTodos } from "../context/todoContext";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import TodoForm from "../components/TodoForm";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatTime";
import { getTodos } from "../api/todo";
import Navbar from "../components/Navbar";

const Home = () => {
  const [selectedTodo, setSelectedTodo] = useState();

  const { todos, isLoading, error, updateTodo, deleteTodo, toggleStatus } =
    useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div className="p-4">
      <Navbar />
      <TodoForm todoDetail={selectedTodo} updateTodo={updateTodo} />
      <ul className="grid grid-cols-4 gap-8 mt-8">
        {todos?.results?.map((todo) => (
          <li
            key={todo.id}
            className={`p-2 border rounded-lg bg-yellow-200 ${
              todo.done ? "bg-red-400" : "bg-yellow-300"
            }`}
          >
            <div className="flex justify-between items-center w-4/5 mx-auto border-b p-2 border-gray-700">
              <h2
                className={`font-bold text-2xl cursor-pointer ${
                  todo.done ? "line-through" : ""
                }`}
                onClick={() => toggleStatus(todo.id)}
              >
                {todo.title}
              </h2>
              <div className="flex gap-2">
                <MdEditSquare
                  className="text-2xl text-green-500"
                  onClick={() => handleEditTodo(todo)}
                />
                <MdDeleteForever
                  className="text-2xl text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </div>
            <div className="w-4/5 mx-auto p-2">
              <p>{todo.description}</p>
              <div className="text-right text-sm italic">
                Create at: {formatDate(todo.created_at)}
              </div>
              <div className="text-right text-sm italic">
                {todo.done && (
                  <>Completed at: {formatDate(todo.completed_at)}</>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
