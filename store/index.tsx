import {
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Custom hook
const useTodos = (initial: Todo[] = []) => {
  const [todos, setTodos] = useState<Todo[]>(initial);
  const [newTodo, setNewTodo] = useState<string>("");

  return {
    todos,
    newTodo,
    setNewTodo,
    addTodo: useCallback(() => {
      setTodos((tl) => addTodo(tl, newTodo));
      setNewTodo("");
    }, [newTodo]),
    updateTodo: (id: number, text: string) =>
      setTodos((tl) => updateTodo(tl, id, text)),
    removeTodo: (id: number) => setTodos((tl) => removeTodo(tl, id)),
    toggleTodo: (id: number) => setTodos((tl) => toggleTodo(tl, id)),
    load: (newTodos: Todo[]) => setTodos(newTodos),
  };
};

const TodoContext = createContext<ReturnType<typeof useTodos> | null>(null);

export const useTodoContext = () => useContext(TodoContext)!;

export function TodoProvider({ children }: { children: ReactNode }) {
  return (
    <TodoContext.Provider value={useTodos([])}>{children}</TodoContext.Provider>
  );
}
