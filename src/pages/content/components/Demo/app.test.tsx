import { render, screen } from "@testing-library/react";
import App from "@pages/content/components/Demo/app";

describe("appTest", () => {
  test("render text", () => {
    // when
    render(<App />);
  });
});
