import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import AuthForm from "./AuthForm";
import { Provider } from "react-redux";
import store from "../../store/redux";

describe("AuthForm Component", () => {
  test("renders login form", () => {
    render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    //expect(screen.getByRole("button", { name: "Login", within: screen.getByRole("form") })).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Your Email")).toBeInTheDocument();
    expect(screen.getByText("Your Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText("Create new account")).toBeInTheDocument();
  });

  test('switches to signup when "Create new account" button is clicked', () => {
    render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    fireEvent.click(screen.getByText("Create new account"));
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
  

});

