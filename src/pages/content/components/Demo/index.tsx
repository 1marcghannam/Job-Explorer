import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/Demo/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content/components/Demo");

const root = document.createElement("div");
root.id = "job-explorer-chrome-extension-content-view-root";
document.body.append(root);

createRoot(root).render(<App />);
