import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../About";
describe("USER PROFILE ABOUT TEST", () => {
  it("should about be in the document", () => {
    render(<About />);
    expect(screen.getByText(/LIVED IN : NOT AVAILABLE/)).toBeInTheDocument();
    expect(screen.getByText(/BIRTH DAY : NOT AVAILABLE/)).toBeInTheDocument();
  });
});
