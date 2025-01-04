import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FriendsAndLogout from "../FriendsAndLogout";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../../../../App";
import userEvent from "@testing-library/user-event";

describe("USER PROFILE SHOW FRIENDS AND LOGOUT TEST", () => {
  const mockedSetUser = vi.fn();
  const mockedOnShowModel = vi.fn();
  const App = function () {
    const [user, setUser] = [null, mockedSetUser];
    const value = { user, setUser };
    return (
      <AppContext.Provider value={value}>
        <FriendsAndLogout onShowModel={mockedOnShowModel} />
      </AppContext.Provider>
    );
  };
  const client = userEvent.setup();
  const element = (
    <MemoryRouter initialIndex={0} initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<App />} />
        <Route path="/auth/login" element={<div>Logout Success</div>} />
      </Routes>
    </MemoryRouter>
  );
  it("should about be in the document", () => {
    render(element);
    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    const friendsBtn = screen.getByRole("button", { name: "Friends" });
    expect(logoutBtn).toBeInTheDocument();
    expect(friendsBtn).toBeInTheDocument();
  });
  it("should redirect user to login page", async () => {
    render(element);
    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    await client.click(logoutBtn);
    expect(screen.getByText(/Logout Success/)).toBeInTheDocument();
  });
  it("should show friends list", async () => {
    render(element);
    const friendsBtn = screen.getByRole("button", { name: "Friends" });
    await client.click(friendsBtn);
    expect(mockedOnShowModel).toHaveBeenCalled();
  });
});
