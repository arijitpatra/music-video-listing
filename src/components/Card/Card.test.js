import { render } from "@testing-library/react";
import { Card } from "./Card";

test("Unit tests for Card component:", () => {
  const { getByText, getByAltText, getByTestId } = render(
    <Card
      image_url="https://arijitpatra.in"
      artist="AP"
      title="Title"
      genre="Rock"
    />
  );
  expect(getByTestId("test-card")).toBeInTheDocument();
  expect(getByText(/AP/)).toBeInTheDocument();
  expect(getByText(/Title/)).toBeInTheDocument();
  expect(getByText(/Rock/)).toBeInTheDocument();
  expect(getByAltText(/AP-Title/)).toBeInTheDocument();
});
