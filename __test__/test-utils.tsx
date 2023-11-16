import { ReactElement } from "react";
import { render } from "@testing-library/react-native";
import { TodoProvider, useTodos } from "../store";

interface TodoContextValue {
  newTodo: string;
  setNewTodo: (newTodo: string) => void;
  addTodo: () => void;
}

const customRender = (
  element: ReactElement,
  { value = { ...useTodos([]) }, ...options }
) => {
  const Wrapper = (props: any) => <TodoProvider value={value} {...props} />;
  return render(element, {
    wrapper: Wrapper,
    ...options,
  });
};

export { customRender };
