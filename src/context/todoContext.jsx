import { createContext, useContext } from "react";
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleStatus,
  updateTodo,
} from "../api/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const toggleStatusTodoMutation = useMutation({
    mutationFn: toggleStatus,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        addTodo: addTodoMutation.mutate,
        updateTodo: updateTodoMutation.mutate,
        deleteTodo: deleteTodoMutation.mutate,
        toggleStatus: toggleStatusTodoMutation.mutate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodoContext);
};
