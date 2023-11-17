import { fireEvent } from "@testing-library/react-native";
import AddItem from "../AddItem";
import { Todo } from "../../store";
import { customRender } from "../../__test__/test-utils";

it("renders the AddItem component correctly", () => {
  const setNewTodo = jest.fn();
  const addTodo = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();
  const load = jest.fn();
  const todos: Todo[] = [];

  const view = customRender(<AddItem />, {
    value: {
      todos,
      newTodo: "",
      setNewTodo: setNewTodo,
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      toggleTodo: toggleTodo,
      load: load,
    },
  });

  view.getByPlaceholderText("Add a new todo item");
  view.getByText("Add");
});

it("Adding items with correct functions being called", () => {
  const setNewTodo = jest.fn();
  const addTodo = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();
  const load = jest.fn();
  const todos: Todo[] = [];

  const modalView = customRender(<AddItem />, {
    value: {
      todos,
      newTodo: "",
      setNewTodo: setNewTodo,
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      toggleTodo: toggleTodo,
      load: load,
    },
  });

  const input = modalView.getByPlaceholderText("Add a new todo item");
  const button = modalView.getByText("Add");
  expect(input).toBeDefined();
  expect(button).toBeDefined();
  fireEvent.changeText(input, "first test item");

  expect(setNewTodo).toHaveBeenCalled();
  expect(setNewTodo).toHaveBeenCalledWith("first test item");

  fireEvent.press(button);
  expect(addTodo).toHaveBeenCalled();
});
