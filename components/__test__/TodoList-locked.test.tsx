import { fireEvent } from "@testing-library/react-native";
import TodoList from "../TodoList";
import { Todo } from "../../store";
import { customRender } from "../../__test__/test-utils";

it("renders the TodoList items correctly when locked", () => {
  const setNewTodo = jest.fn();
  const setLocked = jest.fn();
  const addTodo = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();
  const load = jest.fn();
  const todos: Todo[] = [
    { id: 1, text: "Todo 1st item", done: false },
    { id: 2, text: "Todo 2nd item", done: true },
  ];

  const view = customRender(<TodoList />, {
    value: {
      todos,
      newTodo: "",
      locked: true,
      setLocked: setLocked,
      setNewTodo: setNewTodo,
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      toggleTodo: toggleTodo,
      load: load,
    },
  });

  expect(view.getAllByTestId("list-input")).toHaveLength(2);
  expect(view.getByDisplayValue("Todo 1st item")).toBeDefined();
  expect(view.getByDisplayValue("Todo 2nd item")).toBeDefined();
});

it("ensure the toggle function toggleTodo cannot be triggered when locked ", () => {
  const setNewTodo = jest.fn();
  const setLocked = jest.fn();
  const addTodo = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();
  const load = jest.fn();
  const todos: Todo[] = [
    { id: 1, text: "Todo 1st item", done: false },
    { id: 2, text: "Todo 2nd item", done: true },
  ];

  const view = customRender(<TodoList />, {
    value: {
      todos,
      newTodo: "",
      locked: true,
      setLocked: setLocked,
      setNewTodo: setNewTodo,
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      toggleTodo: toggleTodo,
      load: load,
    },
  });

  const checkbox = view.getAllByTestId("list-checkbox-1")[0];
  expect(checkbox).toBeTruthy();
  fireEvent.press(checkbox);
  expect(toggleTodo).not.toHaveBeenCalled();
});

it("ensure the delete function deleteTodo cannot be triggered when locked ", () => {
  const setNewTodo = jest.fn();
  const setLocked = jest.fn();
  const addTodo = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();
  const load = jest.fn();
  const todos: Todo[] = [
    { id: 1, text: "Todo 1st item", done: false },
    { id: 2, text: "Todo 2nd item", done: true },
  ];

  const view = customRender(<TodoList />, {
    value: {
      todos,
      newTodo: "",
      locked: true,
      setLocked: setLocked,
      setNewTodo: setNewTodo,
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      toggleTodo: toggleTodo,
      load: load,
    },
  });

  const removeButton = view.getAllByTestId("list-delete-button-1")[0];
  expect(removeButton).toBeTruthy();
  fireEvent.press(removeButton);
  expect(deleteTodo).not.toHaveBeenCalled();
});

it("ensure the update function updateTodo cannot be triggered when locked ", () => {
  const setNewTodo = jest.fn();
  const setLocked = jest.fn();
  const addTodo = jest.fn();
  const updateTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();
  const load = jest.fn();
  const todos: Todo[] = [
    { id: 1, text: "Todo 1st item", done: false },
    { id: 2, text: "Todo 2nd item", done: true },
  ];

  const view = customRender(<TodoList />, {
    value: {
      todos,
      newTodo: "",
      setNewTodo: setNewTodo,
      locked: true,
      setLocked: setLocked,
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      toggleTodo: toggleTodo,
      load: load,
    },
  });

  const firstInput = view.getByDisplayValue("Todo 1st item");
  expect(firstInput).toBeDefined();
  fireEvent.changeText(firstInput, "Todo 1st item updated");
  expect(updateTodo).not.toHaveBeenCalled();
});
