"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // load form localStorage
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // add todo
  const addTodo = () => {
    if (!input.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: input, completed: false },
    ]);

    setInput("");
  };

  // delete todo
  const deleteTodo = (id) => [
    setTodos((prev) => prev.filter((t) => t.id !== id)),
  ];

  // update todo
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // start editing
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // save edit
  const updateTodo = (id) => {
    if (!editText.trim()) return;

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: editText } : t)),
    );

    setEditingId(null);
    setEditText("");
  };

  // cancel edit
  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  // filtered todo
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main>
      <h1 className="font-semibold">Todo List</h1>

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
            type="button"
            onClick={() => setFilter(type)}
            className={`btn ${filter === type ? "btn-accent" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>
      <ul>
        {filteredTodos.length === 0 ? (
          <span className="text-warning font-semibold">No tasks found</span>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => updateTodo(todo.id)}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="btn btn-error btn-outline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox"
                  />
                  <button
                    type="button"
                    onClick={() => startEditing(todo)}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-outline btn-warning btn-sm"
                  >
                    remove
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
