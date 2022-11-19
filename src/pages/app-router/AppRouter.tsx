import React, { useEffect } from "react";

import {
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";
import Job from "../job/Job";

import "@pages/popup/Popup.css";

export default function AppRouter() {
  useEffect(() => {
    const { component, props } = getCurrent();
    console.log(
      component
        ? `There is a component on the stack! ${component} with ${props}`
        : `The current stack is empty so Router's direct children will be rendered`
    );
    const components = getComponentStack();
    console.log(`The stack has ${components.length} components on the stack`);
  });
  return (
    <Router>
      <Job />
    </Router>
  );
}
