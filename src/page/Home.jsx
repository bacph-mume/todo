import { useTodos } from "../context/todoContext";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const { todos, isLoading, error, updateTodo, deleteTodo, toggleStatus } =
    useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoForm />
      <ul className="grid grid-cols-4 gap-8 mt-8">
        {todos?.results?.map((todo) => (
          <li
            key={todo.id}
            className={`p-2 border rounded-lg bg-yellow-200 ${
              todo.done ? "bg-red-300" : "bg-yellow-300"
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
                <MdEditSquare className="text-2xl text-green-500" />
                <MdDeleteForever
                  className="text-2xl text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </div>
            <div className="w-4/5 mx-auto p-2">{todo.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
