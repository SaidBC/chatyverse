import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../../App";
import Login from "./index";
import { vi } from "vitest";
import fetchMock from "fetch-mock";

describe("Login", () => {
  const setUser = vi.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{ setUser }}>
          <Login />
        </AppContext.Provider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    fetchMock.hardReset();
  });

  it("renders the login form", () => {
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("updates the username state on input change", () => {
    const usernameInput = screen.getByPlaceholderText("Enter your username");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    expect(usernameInput.value).toBe("testuser");
  });

  it("updates the password state on input change", () => {
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(passwordInput.value).toBe("testpassword");
  });

  it("calls the setUser function and navigates to /profile on successful login", async () => {
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fetchMock.mockResponseOnce(JSON.stringify({ data: "token" }));

    fireEvent.click(loginButton);

    expect(setUser).toHaveBeenCalledWith("token");
    expect(window.location.pathname).toBe("/profile");
  });

  it("displays an error message when user is not found", async () => {
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fetchMock.mockGlobal(JSON.stringify({}), { status: 404 });

    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText("User not found");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays error messages when there are validation errors", async () => {
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);

    const usernameError = await screen.findByText("Please enter your username");
    const passwordError = await screen.findByText("Please enter your password");

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
