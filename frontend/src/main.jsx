import { createRoot } from "react-dom/client";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/"
);
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
