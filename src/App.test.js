import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Header logo rendered", () => {
  const { getByAltText } = render(<App />);
  const logoElement = getByAltText(/healthify-me-header/i);
  expect(logoElement).toBeInTheDocument();
});
test("Login Box rendered", () => {
  const { getByText } = render(<App />);
  const signInText = getByText(/Sign In/i);
  expect(signInText).toBeInTheDocument();
});
