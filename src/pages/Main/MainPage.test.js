import { render, screen, fireEvent } from "@testing-library/react";
import { MainPage } from "./MainPage";

beforeEach(() => {
  jest.spyOn(global, "fetch");
});

test("Unit tests for Dropdown component:", () => {
  const { getByTestId } = render(<MainPage />);
  expect(getByTestId("test-header")).toBeInTheDocument();
  expect(getByTestId("test-card-container")).toBeInTheDocument();
  expect(getByTestId("test-search")).toHaveAttribute(
    "placeholder",
    "Search artist, title, genre..."
  );
  expect(screen.getByText("Select Genres")).toBeInTheDocument();
  expect(screen.getByText("Select Year")).toBeInTheDocument();

  expect(
    screen.getByText("Getting the best music videos for you...")
  ).toBeInTheDocument();

  fireEvent.load(getByTestId("test-card-container"));
  expect(fetch).toHaveBeenCalled();
});
