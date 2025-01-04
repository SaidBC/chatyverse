import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../../../App";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../login";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0";

describe("LOGIN Test", async () => {
  const data = { data: accessToken };
  const response = { json: vi.fn().mockResolvedValue(data) };
  global.fetch = vi.fn().mockResolvedValue(response);
  const mockedSetUser = vi.fn();

  const App = function () {
    const [user, setUser] = [null, mockedSetUser];
    const value = { user, setUser };
    return (
      <AppContext.Provider value={value}>
        <Login />
      </AppContext.Provider>
    );
  };
  const client = userEvent.setup();
  const element = (
    <MemoryRouter initialIndex={0} initialEntries={["/auth/signup"]}>
      <Routes>
        <Route path="/auth/signup" element={<App />} />
        <Route path="/profile" element={<div>Login Success</div>} />
      </Routes>
    </MemoryRouter>
  );
  it("should be in the document ", async () => {
    render(element);
    const heading = await screen.findByRole("heading");
    const inputs = await screen.findAllByRole("textbox");
    const loginBtn = await screen.findByRole("button");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("LOGIN");
    expect(...inputs).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it("should throw an text error", async () => {
    render(element);
    const loginBtn = await screen.findByRole("button");
    await client.click(loginBtn);
    const usernameInputError = (await screen.findAllByRole("paragraph"))[0];
    const passwordInputError = (await screen.findAllByRole("paragraph"))[1];
    expect(usernameInputError).toBeInTheDocument();
    expect(usernameInputError).toHaveTextContent("Please enter your username");
    expect(passwordInputError).toBeInTheDocument();
    expect(passwordInputError).toHaveTextContent("Please enter your password");
  });

  it("should login successfully", async () => {
    render(element);
    const mockedUser = {
      email: "test@me.com",
      username: "123asbc",
      password: "abcd123",
    };
    const usernameInput = await screen.findByTestId("username");
    const passwordInput = await screen.findByTestId("password");
    await client.type(usernameInput, mockedUser.username);
    await client.type(passwordInput, mockedUser.password);
    const loginBtn = await screen.findByRole("button");
    await client.click(loginBtn);

    expect(screen.getByText("Login Success")).toBeTruthy();
    expect(mockedSetUser).toHaveBeenCalled();
    const mockedUserArgument = mockedSetUser.mock.calls[0][0];
    expect(mockedUserArgument).toBe(accessToken);
  });
});
