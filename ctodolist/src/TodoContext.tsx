// TodoContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Todo = {
  task: string;
  timestamp: string;
};

type TodoContextType = {
  todos: Todo[];
  completed: Todo[];
  addTodo: (task: string) => void;
  removeTodo: (index: number) => void;
  completeTodo: (index: number) => void;
  editTodo: (index: number, newTask: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);

  const addTodo = (task: string) => {
    setTodos([...todos, { task, timestamp: new Date().toLocaleString() }]);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const todoToComplete = todos[index];
    setCompleted([...completed, todoToComplete]);
    removeTodo(index);
  };

  const editTodo = (index: number, newTask: string) => {
    const newTodos = [...todos];
    newTodos[index] = { task: newTask, timestamp: new Date().toLocaleString() };
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, completed, addTodo, removeTodo, completeTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
