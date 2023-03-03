import { useSelector } from "react-redux";
import {
	ErrorInterface,
	GlobalStateInterface,
} from "../interfaces/global-state-interface";

interface ErrorHook {
	error: ErrorInterface | null;
}

export const useError = (): ErrorHook => {
	const error = useSelector(
		(state: GlobalStateInterface) => state.error.content
	);

	return {
		error,
	};
};
