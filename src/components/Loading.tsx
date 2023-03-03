import React from "react";

interface Props {
	loading: boolean;
}

const Loading: React.FC<Props> = ({ loading }) => {
	if (!loading) return null;

	return (
		<div className="loading-overlay">
			<div className="loading"> LOADING ... </div>
		</div>
	);
};

export default Loading;
