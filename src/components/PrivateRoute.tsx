import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
	children: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
	const { auth, userToken } = useAuth();

	if (!auth && !userToken) {
		return <Navigate to={"/login"} replace />;
	}

	return children;
};

export default PrivateRoute;
