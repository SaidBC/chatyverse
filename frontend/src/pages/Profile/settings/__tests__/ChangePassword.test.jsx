import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChangePassword from "../ChangePassword";
import userEvent from "@testing-library/user-event";
import { AppContext } from "../../../../App";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0";

describe("CHANGE PASSWORD TEST", () => {
  const mockedSetUser = vi.fn();
  const App = function () {
    const [user, setUser] = [accessToken, mockedSetUser];
    const value = { user, setUser };
    return (
      <AppContext.Provider value={value}>
        <ChangePassword />
      </AppContext.Provider>
    );
  };
  it("should be in the document", () => {
    render(<App />);
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const newPasswordInput = screen.getByPlaceholderText(
      "Enter your new password"
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm your new password"
    );
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    expect(passwordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });

  it("should throw text error", async () => {
    const client = userEvent.setup();
    render(<App />);
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    await client.click(saveBtn);
    const textErrors = screen.getAllByRole("paragraph");
    const errorsContent = [
      "Please enter your password",
      "Please enter your new password",
      "Please confirm password that's you wrote",
    ];
    textErrors.forEach((testCase, i) =>
      expect(testCase).toHaveTextContent(errorsContent[i])
    );
  });
});
