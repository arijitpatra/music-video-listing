import { render, screen } from "@testing-library/react";
import { TagFilter } from "./TagFilter";

test("Unit tests for Dropdown component:", () => {
  const { getByTestId, getByText } = render(
    <TagFilter placeholder="Sample placeholder" data={["hey", "hi", "hello"]} />
  );
  expect(getByTestId("test-tagFilter")).toBeInTheDocument();
  expect(getByText("Sample placeholder")).toBeInTheDocument();
  expect(screen.getByText("hi")).toBeInTheDocument();
});
