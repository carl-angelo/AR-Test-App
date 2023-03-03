import React, { useState } from "react";
import { ReactComponent as VisibilityNoneIcon } from "../assets/icons/visibility_off.svg";
import { ReactComponent as VisibilityIcon } from "../assets/icons/visibility.svg";

interface Props {
	value: string;
	dataTestId: string;
	isDisabled: boolean;
	onChange: (param: string) => void;
}

const Password: React.FC<Props> = ({
	value,
	dataTestId,
	isDisabled,
	onChange,
}) => {
	const [show, setShow] = useState(false);

	return (
		<div className="password-input-wrapper">
			<input
				type={show ? "text" : "password"}
				name="password"
				id="password"
				data-testid={dataTestId}
				value={value}
				disabled={isDisabled}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					onChange(event.target.value)
				}
			/>
			<button
				type="button"
				aria-label="show-hide-password"
				onClick={() => setShow(!show)}
			>
				{show ? <VisibilityIcon /> : <VisibilityNoneIcon />}
			</button>
		</div>
	);
};

export default Password;
