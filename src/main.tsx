import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { PokemonProvider } from "./contexPovider/ContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </StrictMode>
);
