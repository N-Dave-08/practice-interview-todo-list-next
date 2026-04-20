"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);

    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div>
      <main>
        <h1 className="font-semibold">Todo List</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="add task here"
          className="input"
        />
        <button type="button" onClick={addTodo} className="btn btn-primary">
          Add
        </button>
        <div>
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              type="button"
              className={`btn ${filter === type ? "btn-primary" : ""}`}
            >
              {type}
            </button>
          ))}
        </div>
        <ul>
          {filteredTodos.length === 0 ? (
            <p className="text-warning">No todos found</p>
          ) : (
            filteredTodos.map((todo) => (
              <li key={todo.id}>
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`font-semibold ${todo.completed ? "line-through text-gray-400" : ""}`}
                >
                  {todo.text}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-error btn-outline"
                >
                  remove
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}
