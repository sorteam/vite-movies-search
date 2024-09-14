import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen } from "./utils/test-utils";

describe("Check main elements", () => {
  it("app is visible", () => {
    render(<App />);
    expect(screen.getByTestId("app")).toBeInTheDocument();
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(() => screen.getByTestId("drawer")).toThrow();
  });
});
