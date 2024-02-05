import React from "react";
import ReactDOM from "react-dom/client";
import { createSignal, createEffect } from "solid-js";
import { createRoot } from "solid-js";
import { App } from "./App.jsx";
import { Toggle } from "./components/Toggle/index.jsx";
import "./index.css";

createRoot(() => {
  const [darkMode, setDarkMode] = createSignal(false);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
    document.body.style = darkMode() ? "background-color: #3c495c;" : "background-color: #f3f4f6;";
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode());
  };

  ReactDOM.createRoot(document.getElementById("root")).render(
    <>
      <Toggle handleDarkMode={handleDarkMode} />
      <App />
    </>
  );
});
