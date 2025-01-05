import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChangeEmail from "../ChangeEmail";
import userEvent from "@testing-library/user-event";
import { AppContext } from "../../../../App";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0";

describe("CHANGE EMAIL TEST", () => {
  const mockedSetUser = vi.fn();
  const App = function () {
    const [user, setUser] = [accessToken, mockedSetUser];
    const value = { user, setUser };
    return (
      <AppContext.Provider value={value}>
        <ChangeEmail />
      </AppContext.Provider>
    );
  };
  it("should be in the document", () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const newEmailInput = screen.getByPlaceholderText("Enter your new email");
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(newEmailInput).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });

  it("should throw text error", async () => {
    const client = userEvent.setup();
    render(<App />);
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    await client.click(saveBtn);
    const textErrors = screen.getAllByRole("paragraph");
    const errorsContent = [
      "Please enter your email",
      "Please enter your password",
      "Please enter your new email",
    ];
    textErrors.forEach((testCase, i) =>
      expect(testCase).toHaveTextContent(errorsContent[i])
    );
  });
});
