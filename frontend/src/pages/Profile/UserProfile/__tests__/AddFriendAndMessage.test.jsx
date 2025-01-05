import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FriendsAndLogout from "../FriendsAndLogout";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../../../../App";
import userEvent from "@testing-library/user-event";
import AddFriendAndMessage from "../AddFriendAndMessage";

describe("USER PROFILE ADD FRIENDS AND MESSAGE TEST", () => {
  const element = (
    <MemoryRouter initialIndex={0} initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<AddFriendAndMessage userId={1} />} />
      </Routes>
    </MemoryRouter>
  );
  it("should about be in the document", () => {
    render(element);
    const addFriendBtn = screen.getByRole("button", { name: "Add Friend" });
    const messageLink = screen.getByRole("link", { name: "Message" });
    expect(addFriendBtn).toBeInTheDocument();
    expect(messageLink).toBeInTheDocument();
  });
  it("should redirect user to friend chat", async () => {
    render(element);
    const messageLink = screen.getByRole("link", { name: "Message" });
    expect(messageLink.href.endsWith("1")).toBeTruthy;
  });
});
