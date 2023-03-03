import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorPageType } from "../enum";
import { useAuth } from "../hooks/useAuth";

interface Props {
	type?: ErrorPageType;
}

const ErrorPage: React.FC<Props> = ({ type = ErrorPageType.Error }) => {
	const navigate = useNavigate();
	const { auth } = useAuth();
	const redirect = () => {
		if (auth) {
			navigate("/");
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="container">
			<div className="w-full h-full mt-10 flex flex-col items-center justify-center">
				<div className="text-[70px] font-extrabold text-slate-600">
					{type === ErrorPageType.Error
						? "Something went wrong"
						: "Page not found"}
				</div>
				<button
					type="button"
					className="button bg-gray-700 text-white"
					onClick={redirect}
				>
					Go back to {auth ? "Home" : "Login"}
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
