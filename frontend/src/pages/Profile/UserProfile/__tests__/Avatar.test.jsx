import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Avatar from "../Avatar";

describe("USER PROFILE AVATAR TEST", () => {
  it("should about be in the document", () => {
    render(<Avatar username="user123" />);
    expect(screen.getByText(/@user123/)).toBeInTheDocument();
    expect(screen.getByAltText(/profile image/)).toBeInTheDocument();
  });
});
