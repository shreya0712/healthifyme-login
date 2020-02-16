import React from "react";
import {
  render,
  fireEvent,
  getByTestId,
  getByText
} from "@testing-library/react";
import { LoginComponent } from "./index";

test("Email input box rendered", () => {
  const { getByPlaceholderText } = render(<LoginComponent />);
  const email = getByPlaceholderText(/Enter your email/i);
  expect(email).toBeInTheDocument();
});
test("Password input box rendered", () => {
  const { getByPlaceholderText } = render(<LoginComponent />);
  const pwd = getByPlaceholderText(/Enter your Password/i);
  expect(pwd).toBeInTheDocument();
});

it("Login component has initial email ''", () => {
  const { container } = render(<LoginComponent />);
  const emailInput = getByTestId(container, "email");
  expect(emailInput.textContent).toBe("");
});

it("Typing a value in email field updates state", () => {
  const { container } = render(<LoginComponent />);
  const emailInput = getByTestId(container, "email");
  const text = "test";
  fireEvent.change(emailInput, { target: { value: text } });
  expect(emailInput.value).toBe(text);
});

it("Typing invalid email shows error message", () => {
  const { container } = render(<LoginComponent />);
  const pwdInput = getByTestId(container, "email");
  const invalidPwd = "test";
  fireEvent.change(pwdInput, { target: { value: invalidPwd } });
  const error = getByTestId(container, "email-error");
  expect(error.textContent).toBe("Invalid email format!");
});

it("Login component has initial password ''", () => {
  const { container } = render(<LoginComponent />);
  const passwordInput = getByTestId(container, "password");
  expect(passwordInput.textContent).toBe("");
});

it("Typing a value in password field updates state", () => {
  const { container } = render(<LoginComponent />);
  const pwdInput = getByTestId(container, "password");
  const text = "test";
  fireEvent.change(pwdInput, { target: { value: text } });
  expect(pwdInput.value).toBe(text);
});

it("Typing invalid password shows error message", () => {
  const { container } = render(<LoginComponent />);
  const pwdInput = getByTestId(container, "password");
  const invalidPwd = "test";
  fireEvent.change(pwdInput, { target: { value: invalidPwd } });
  const error = getByTestId(container, "pwd-error");
  expect(error.textContent).toBe("Password length too short!");
});
it("Typing valid password does not show error message", () => {
  const { container } = render(<LoginComponent />);
  const pwdInput = getByTestId(container, "password");
  const validPwd = "Hello1234";
  fireEvent.change(pwdInput, { target: { value: validPwd } });
  const error = getByTestId(container, "pwd-error");
  expect(error.textContent).toBe("");
});
it("Login button is disabled if no input made", () => {
  const { container } = render(<LoginComponent />);
  const loginButton = getByText(container, "Login");
  expect(loginButton.disabled).toBe(true);
});
it("Login button is not disabled if valid input made", () => {
  const { container } = render(<LoginComponent />);
  const loginButton = getByText(container, "Login");
  const pwdInput = getByTestId(container, "password");
  const emailInput = getByTestId(container, "email");
  fireEvent.change(pwdInput, { target: { value: "Hello1234" } });
  fireEvent.change(emailInput, { target: { value: "abcd@ef.com" } });
  expect(loginButton.disabled).toBe(false);
});
it("Loader made visible on click of Login", () => {
  const { container } = render(<LoginComponent />);
  const loginButton = getByText(container, "Login");
  const pwdInput = getByTestId(container, "password");
  const emailInput = getByTestId(container, "email");
  fireEvent.change(pwdInput, { target: { value: "Hello1234" } });
  fireEvent.change(emailInput, { target: { value: "abcd@ef.com" } });
  fireEvent.click(loginButton);
  const loader = getByTestId(container, "loader");
  expect(loader).toBeInTheDocument();
});

it("Successful login redirects to home page after some time", () => {
  const { container } = render(<LoginComponent />);
  const loginButton = getByText(container, "Login");
  const pwdInput = getByTestId(container, "password");
  const emailInput = getByTestId(container, "email");
  fireEvent.change(pwdInput, { target: { value: "Hello1234" } });
  fireEvent.change(emailInput, { target: { value: "abcd@ef.com" } });
  fireEvent.click(loginButton);
  setTimeout(() => {
    expect(window.location.pathname).toBe("/home");
  }, 1500);
});
