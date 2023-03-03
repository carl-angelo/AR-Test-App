import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Login from "../Login";
import { Provider } from "react-redux";
import { store } from "../../../core/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockAccount = {
	username: "test",
	password: "test",
};

const loginMock = jest.fn();

const renderLogin = () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

describe("Login Page", () => {
	beforeEach(() => {
		renderLogin();
	});

	it("should render Login Page", async () => {
		expect(await screen.findAllByText("Login")).toBeDefined();
		expect(await screen.findAllByLabelText("Username")).toBeDefined();
		expect(await screen.findAllByLabelText("Password")).toBeDefined();
	});

	it("should get login information", async () => {
		const username = screen.getByTestId("login-username");
		const password = screen.getByTestId("login-password");

		userEvent.type(username, mockAccount.username);
		userEvent.type(password, mockAccount.password);

		expect(username).toHaveValue(mockAccount.username);
		expect(password).toHaveValue(mockAccount.password);
	});

	it("should trigger the login button", async () => {
		const button = await screen.findByTestId("login-button");

		expect(button).toBeDefined();
		button.onclick = loginMock;
		fireEvent.click(button);
		expect(loginMock).toHaveBeenCalledTimes(1);
	});
});
