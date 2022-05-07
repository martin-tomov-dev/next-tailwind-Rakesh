import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../lib/cognito/CognitoClient", () => {
  return {
      getCognitoInstance: () => {}
  };
});

jest.mock("next/router", () => {
    return {
        useRouter: () => ({
            push() {

            }
        })
    }
})

beforeEach(() => {
  render(<Home />);
});

describe("Home", () => {
  it("renders home", () => {
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders login view", async () => {
    const loginBtn = screen.getByText("LOGIN");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      const headerText = screen.getByText("Welcome Back");
      expect(headerText).toBeInTheDocument();
    });
  });

  it("continue button is enabled after fields are filled", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/First Name */), "Phoebe");
    await user.type(screen.getByPlaceholderText(/Last Name */), "Buffet");
    await user.type(
      screen.getByPlaceholderText(/Email */),
      "phoebe.buffet@smellycat.com"
    );
    const continueBtn = screen.getByText("CONTINUE").closest("button");
    expect(continueBtn).not.toHaveClass("cursor-not-allowed");
  });

  it("login button is enabled after fields are filled", async () => {
    const loginBtn = screen.getByText("LOGIN");
    fireEvent.click(loginBtn);

    await waitFor(async () => {
      const user = userEvent.setup();
      await user.type(
        screen.getByPlaceholderText(/Email/),
        "phoebe.buffet@smellycat.com"
      );
      await user.type(screen.getByPlaceholderText("Password"), "treesareleafy");
      const continueBtn = screen.getByRole("button");
      expect(continueBtn).not.toHaveClass("cursor-not-allowed");
    });
  });
});
