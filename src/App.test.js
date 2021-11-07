import { render, screen } from "@testing-library/react";
import App from "./App";

test("Unit test for App component:", () => {
  render(<App />);
  const textElement = screen.getByText(/music video listing/i);
  expect(textElement).toBeInTheDocument();
});
