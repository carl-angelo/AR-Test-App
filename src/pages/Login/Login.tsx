import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
	useFetchTokenMutation,
	useLoginUserMutation,
} from "../../services/login";
import { appId, appSecret } from "../../constants";
import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import Password from "../../components/Password";
import Error from "../../components/Error";
import { useDispatch } from "react-redux";
import { clearError } from "../../slices/error";

const Login: React.FC<EmptyObject> = () => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [
		loginUser,
		{
			data: loginResponse,
			isSuccess: isLoginApiSuccess,
			isLoading: isLoginMutationLoading,
		},
	] = useLoginUserMutation();
	const [
		fetchToken,
		{
			data: fetchTokenResponse,
			isLoading: isFetchLoading,
			isSuccess: isFetchTokenSuccess,
		},
	] = useFetchTokenMutation();
	const navigate = useNavigate();
	const { auth } = useAuth();
	const dispatch = useDispatch();

	const handleLogin = useCallback(() => {
		dispatch(clearError());
		loginUser({
			username,
			password,
		});
	}, [username, password]);

	const handleFetchToken = useCallback(() => {
		if (isLoginApiSuccess && loginResponse?.authCode && appId && appSecret) {
			fetchToken({
				authCode: loginResponse.authCode,
				appId,
				appSecret,
			});
		}
	}, [isLoginApiSuccess, loginResponse, appId, appSecret]);

	useEffect(() => {
		handleFetchToken();
	}, [isLoginApiSuccess, loginResponse]);

	useEffect(() => {
		if (isFetchTokenSuccess && fetchTokenResponse) {
			navigate("/");
		}
	}, [fetchTokenResponse, isFetchTokenSuccess]);

	if (auth) {
		return <Navigate to={"/"} replace />;
	}

	return (
		<>
			<Loading loading={isFetchLoading} />
			<div className="login-container">
				<Error inline />
				<div className="login-wrapper">
					<h2>Login</h2>
					<div className="fieldset flex-col">
						<label htmlFor="username"> Username </label>
						<input
							type="text"
							name="username"
							id="username"
							data-testid="login-username"
							disabled={isLoginMutationLoading}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setUserName(event.target.value)
							}
						/>
					</div>
					<div className="fieldset flex-col">
						<label htmlFor="password"> Password </label>
						<Password
							dataTestId="login-password"
							value={password}
							isDisabled={isLoginMutationLoading}
							onChange={(value) => setPassword(value)}
						/>
					</div>
					<div className="fieldset">
						<button
							type="submit"
							name="submit"
							data-testid="login-button"
							className="button button-primary"
							disabled={isLoginMutationLoading}
							onClick={() => handleLogin()}
						>
							{isLoginMutationLoading ? "Loading...." : "Login"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
