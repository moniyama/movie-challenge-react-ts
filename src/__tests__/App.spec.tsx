import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

jest.mock("../utils/constants", () => "token API");

describe("AppComponent", () => {
  test("demo", () => {
    expect(true).toBe(true);
  });
  test("Renders the main page", () => {
    render(<App />);
    fireEvent.click(screen.getByText("count is 0"));
    expect(screen.queryByText("Vite + React")).toBeTruthy();
    expect(screen.queryByText("count is 1")).toBeTruthy();
  });
});
