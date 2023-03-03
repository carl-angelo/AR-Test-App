import React from "react";
import { useDispatch } from "react-redux";
import { useError } from "../hooks/useError";
import { clearError } from "../slices/error";

interface Props {
	inline?: boolean;
}

const Error: React.FC<Props> = ({ inline }) => {
	const error = useError();
	const dispatch = useDispatch();

	if (!error.error) {
		return null;
	}

	return (
		<div className={`error-container ${inline && "error-inline"}`}>
			<div className="error-wrapper">
				<div className="error-message">
					<span>{error.error?.code}</span> {error?.error.data.message}
				</div>
				<div className="error-close">
					<button type="button" onClick={() => dispatch(clearError())}>
						X
					</button>
				</div>
			</div>
		</div>
	);
};

export default Error;
