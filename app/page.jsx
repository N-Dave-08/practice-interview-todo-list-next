"use client";

import React, { useEffect, useState } from "react";

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

  // add
  const addTodo = () => {
    if (!input.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: input, completed: false },
    ]);

    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "complted") return todo.completed;
    return true;
  });

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <div>
      <main>
        <h1>Todo List</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="add task here..."
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
                  className={`${todo.completed ? "line-through text-gray-400" : ""}`}
                >
                  {todo.text}{" "}
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => toggleTodo(todo.id)}
                    checked={todo.completed}
                  />
                </span>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-error btn-sm btn-outline"
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
