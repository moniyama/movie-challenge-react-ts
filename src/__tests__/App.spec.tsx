import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("AppComponent", () => {
	test("demo", () => {
		expect(true).toBe(true);
	});
	test("Renders the main page", () => {
		render(<App />);
		expect(screen.queryByText("Vite + React")).toBeTruthy();
	});
});
