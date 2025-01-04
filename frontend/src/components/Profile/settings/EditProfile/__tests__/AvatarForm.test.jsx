import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AvatarForm from "../AvatarForm";
import userEvent from "@testing-library/user-event";

describe("EDIT USER PROFILE AVATAR TEST", () => {
  it("should about be in the document", () => {
    const handleSaveMocked = vi.fn();
    render(<AvatarForm handleSave={handleSaveMocked} />);
    const usernameInput = screen.getByPlaceholderText(
      "Enter your new username"
    );
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    expect(usernameInput).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
  it("should throw text error", async () => {
    const client = userEvent.setup();
    const handleSaveMocked = vi.fn(({ setUsername }) => {
      return (e) => {
        e.preventDefault();
        setUsername((prev) => ({ ...prev, errorMessage: "Error showed" }));
      };
    });
    const element = <AvatarForm handleSave={handleSaveMocked} username={""} />;
    render(element);
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    await client.click(saveBtn);
    const textError = screen.getByText(/Error showed/);
    expect(textError).toBeInTheDocument();
  });
  it("should type input", async () => {
    const client = userEvent.setup();
    const handleSaveMocked = vi.fn();
    render(<AvatarForm handleSave={handleSaveMocked} />);
    const usernameInput = screen.getByPlaceholderText(
      "Enter your new username"
    );
    await client.type(usernameInput, "abcd");
    expect(usernameInput.value).toBe("abcd");
  });
});
