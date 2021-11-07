import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "./Search";

test("Unit tests for Search component:", () => {
  const { getByTestId } = render(<Search placeholder="Sample placeholder" />);
  const inputEl = getByTestId("test-search");
  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute("type", "text");
  expect(inputEl).toHaveAttribute("placeholder", "Sample placeholder");

  userEvent.type(inputEl, "Arijit Patra");
  expect(screen.getByTestId("test-search")).toHaveValue("Arijit Patra");
});
