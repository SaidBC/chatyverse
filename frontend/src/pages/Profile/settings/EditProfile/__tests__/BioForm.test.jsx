import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BioForm from "../BioForm";
import userEvent from "@testing-library/user-event";

describe("EDIT USER PROFILE BIO TEST", () => {
  it("should about be in the document", () => {
    const handleSaveMocked = vi.fn();
    render(<BioForm handleSave={handleSaveMocked} />);
    const bioInput = screen.getByPlaceholderText("Enter your new bio");
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    expect(bioInput).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
  it("should throw text error", async () => {
    const client = userEvent.setup();
    const handleSaveMocked = vi.fn(({ setBio }) => {
      return (e) => {
        e.preventDefault();
        setBio((prev) => ({ ...prev, errorMessage: "Error showed" }));
      };
    });
    const element = <BioForm handleSave={handleSaveMocked} username={""} />;
    render(element);
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    await client.click(saveBtn);
    const textError = screen.getByText(/Error showed/);
    expect(textError).toBeInTheDocument();
  });
  it("should type input", async () => {
    const client = userEvent.setup();
    const handleSaveMocked = vi.fn();
    render(<BioForm handleSave={handleSaveMocked} />);
    const bioInput = screen.getByPlaceholderText("Enter your new bio");
    await client.type(bioInput, "abcd");
    expect(bioInput.value).toBe("abcd");
  });
});
