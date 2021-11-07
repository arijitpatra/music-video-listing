import { render, screen } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

test("Unit tests for Dropdown component:", () => {
  const { getByTestId, getByText } = render(
    <Dropdown placeholder="Sample placeholder" data={["hey", "hi", "hello"]} />
  );
  expect(getByTestId("test-dropdown")).toBeInTheDocument();
  expect(getByText("Sample placeholder")).toBeInTheDocument();
  expect(screen.getByText("hi")).toBeInTheDocument();
});
