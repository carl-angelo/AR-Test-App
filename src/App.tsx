import React, { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./core/store";
import Header from "./components/Header";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import { ErrorPageType } from "./enum";

const Login = React.lazy(() => import("./pages/Login/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const AppRoute = () => {
	let routes = useRoutes([
		{
			path: "/",
			element: (
				<PrivateRoute>
					<>
						<Home />
						<Error />
					</>
				</PrivateRoute>
			),
			errorElement: <ErrorPage />,
		},
		{
			path: "/login",
			element: <Login />,
			errorElement: <ErrorPage />,
		},
		{
			path: "*",
			element: <ErrorPage type={ErrorPageType.NotFound} />,
		},
	]);
	return routes;
};

const App: React.FC<EmptyObject> = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Suspense fallback={<Loading loading />}>
					<Header />
					<AppRoute />
				</Suspense>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
