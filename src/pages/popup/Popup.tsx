import * as React from "react";
import "@pages/popup/Popup.css";
import AppRouter from "../app-router/AppRouter";
import Navbar from "../navbar/Navbar";

import { defaultSettings } from "../../lib/const";

if (!localStorage.getItem("settings")) {
  localStorage.setItem("settings", JSON.stringify(defaultSettings, null, 2));
}

export default function Popup() {
  return (
    <div className="popup">
      <Navbar />
      <AppRouter />
    </div>
  );
}
