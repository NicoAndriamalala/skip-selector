import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock fetch for testing
global.fetch = jest.fn();

test("renders skip selector application", () => {
  // Mock pending fetch to keep in loading state
  (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

  render(<App />);
  const loadingElement = screen.getByText(/loading skip options/i);
  expect(loadingElement).toBeInTheDocument();
});
