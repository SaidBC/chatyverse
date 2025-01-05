import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../../../App";
import userEvent from "@testing-library/user-event";
import Signup from "../signup";
import React from "react";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0";

describe("SIGNUP Test", () => {
  const data = { data: accessToken };
  const response = { json: vi.fn().mockResolvedValue(data) };
  global.fetch = vi.fn().mockResolvedValue(response);
  const mockedSetUser = vi.fn();

  const App = function () {
    const [user, setUser] = [null, mockedSetUser];
    const value = { user, setUser };
    return (
      <AppContext.Provider value={value}>
        <Signup />
      </AppContext.Provider>
    );
  };
  const client = userEvent.setup();
  const element = (
    <MemoryRouter initialIndex={0} initialEntries={["/auth/signup"]}>
      <Routes>
        <Route path="/auth/signup" element={<App />} />
        <Route path="/profile" element={<div>Singup Success</div>} />
      </Routes>
    </MemoryRouter>
  );
  it("should be in the document ", async () => {
    render(element);
    const heading = await screen.findByRole("heading");
    const inputs = await screen.findAllByRole("textbox");
    const signupBtn = await screen.findByRole("button");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("SIGN UP");
    expect(...inputs).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
  });
  it("should throw an text error", async () => {
    render(element);
    const signupBtn = await screen.findByRole("button");
    await client.click(signupBtn);
    const emailInputError = (await screen.findAllByRole("paragraph"))[0];
    const usernameInputError = (await screen.findAllByRole("paragraph"))[1];
    const passwordInputError = (await screen.findAllByRole("paragraph"))[2];
    const confirmPasswordInputError = (
      await screen.findAllByRole("paragraph")
    )[3];
    expect(emailInputError).toBeInTheDocument();
    expect(emailInputError).toHaveTextContent("Please enter your email");
    expect(usernameInputError).toBeInTheDocument();
    expect(usernameInputError).toHaveTextContent("Please enter your username");
    expect(passwordInputError).toBeInTheDocument();
    expect(passwordInputError).toHaveTextContent("Please enter your password");
    expect(confirmPasswordInputError).toBeInTheDocument();
    expect(confirmPasswordInputError).toHaveTextContent(
      "Please confirm password that's you wrote"
    );
  });
  it("should successully signup", async () => {
    render(element);
    const mockedUser = {
      email: "test@me.com",
      username: "123asbc",
      password: "abcd123",
    };
    const emailInput = await screen.findByTestId("email");
    const usernameInput = await screen.findByTestId("username");
    const confirmPasswordInput = await screen.findByTestId("confirm-password");
    const passwordInput = await screen.findByTestId("password");
    await client.type(emailInput, mockedUser.email);
    await client.type(usernameInput, mockedUser.username);
    await client.type(confirmPasswordInput, mockedUser.password);
    await client.type(passwordInput, mockedUser.password);
    const signupBtn = await screen.findByRole("button");
    await client.click(signupBtn);
    expect(screen.getByText("Singup Success")).toBeTruthy();
    expect(mockedSetUser).toHaveBeenCalled();
    const mockedUserArgument = mockedSetUser.mock.calls[0][0];
    expect(mockedUserArgument).toBe(accessToken);
  });
});
