import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Bio from "../Bio";

describe("USER PROFILE BIO TEST", () => {
  it("should about be in the document", () => {
    render(<Bio />);
    expect(screen.getByText(/NO BIO ADDED/)).toBeInTheDocument();
  });
});
