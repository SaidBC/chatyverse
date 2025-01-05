import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutForm from "../AboutForm";
import userEvent from "@testing-library/user-event";

describe("EDIT USER PROFILE ABOUT TEST", () => {
  it("should about be in the document", () => {
    const handleSaveMocked = vi.fn();
    render(<AboutForm handleSave={handleSaveMocked} />);
    const locationInput = screen.getByPlaceholderText(/Country,City/);
    const birthdayInput = screen.getByPlaceholderText(/Select your birthday/);
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    expect(locationInput).toBeInTheDocument();
    expect(birthdayInput).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });

  it("should throw text error", async () => {
    const client = userEvent.setup();
    const handleSaveMocked = vi.fn(({ setLocation, setBirthday }) => {
      return (e) => {
        e.preventDefault();
        setBirthday((prev) => ({ ...prev, errorMessage: "Error showed" }));
        setLocation((prev) => ({ ...prev, errorMessage: "Error showed" }));
      };
    });
    const element = <AboutForm handleSave={handleSaveMocked} username={""} />;
    render(element);
    const saveBtn = screen.getByRole("button", { name: "SAVE" });
    await client.click(saveBtn);
    const textErrors = screen.queryAllByText(/Error showed/);
    textErrors.forEach((testCase) => expect(testCase).toBeInTheDocument());
  });

  it("should type input", async () => {
    const client = userEvent.setup();
    const handleSaveMocked = vi.fn();
    render(<AboutForm handleSave={handleSaveMocked} />);
    const locationInput = screen.getByPlaceholderText(/Country,City/);
    const birthdayInput = screen.getByPlaceholderText(/Select your birthday/);
    await client.type(locationInput, "abcd");
    await client.type(birthdayInput, "2024-12-04");
    expect(locationInput.value).toBe("abcd");
    expect(birthdayInput.value).toBe("2024-12-04");
  });
});
