import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../App";

describe("Main Page", () => {
  test("renders a search input", async () => {
    render(<App />);

    const input = await screen.findByPlaceholderText("Search by character name");

    expect(input).toBeDefined();
  });
});
