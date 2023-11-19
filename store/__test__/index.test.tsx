import { renderHook, act } from "@testing-library/react-hooks";
import { useTodos } from "../index";

describe("useTodos", () => {
  it("should initialize with empty array", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
  });

  it("should initialize with provided todos", () => {
    const todos = [
      { id: 1, text: "Todo 1", done: false },
      { id: 2, text: "Todo 2", done: true },
    ];
    const { result } = renderHook(() => useTodos(todos));
    expect(result.current.todos).toEqual(todos);
  });

  it("should add a todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setNewTodo("New todo");
    });
    expect(result.current.newTodo).toEqual("New todo");
    act(() => {
      result.current.addTodo();
    });
    expect(result.current.todos).toEqual([
      { id: 1, text: "New todo", done: false },
    ]);
  });

  it("should update a todo", () => {
    const todos = [{ id: 1, text: "Todo 1", done: false }];
    const { result } = renderHook(() => useTodos(todos));
    act(() => {
      result.current.updateTodo(1, "Updated todo");
    });
    expect(result.current.todos).toEqual([
      { id: 1, text: "Updated todo", done: false },
    ]);
  });

  it("should toggle a todo", () => {
    const todos = [{ id: 1, text: "Todo 1", done: false }];
    const { result } = renderHook(() => useTodos(todos));
    act(() => {
      result.current.toggleTodo(1);
    });
    expect(result.current.todos).toEqual([
      { id: 1, text: "Todo 1", done: true },
    ]);
  });

  it("should remove a todo", () => {
    const todos = [
      { id: 1, text: "Todo 1", done: false },
      { id: 2, text: "Todo 2", done: true },
    ];
    const { result } = renderHook(() => useTodos(todos));
    act(() => {
      result.current.deleteTodo(1);
    });
    expect(result.current.todos).toEqual([
      { id: 2, text: "Todo 2", done: true },
    ]);
  });
});
