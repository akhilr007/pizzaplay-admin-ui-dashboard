import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoginPage } from "./login";

describe("Login Page", () => {
    it("should render with required fields", () => {
        render(<LoginPage />);

        // getBy : throws error
        // findBy : async
        // queryBy : null
        expect(
            screen.getByText("Sign in", { selector: "div" })
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Sign in" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("checkbox", { name: "Remember Me" })
        ).toBeInTheDocument();
        expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    });
});
