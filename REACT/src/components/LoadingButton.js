const LoadingButton = ({ loading = false }) => {
	if (!loading) return null;
	return (
		<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
			<span className="sr-only">Loading...</span>
		</span>
	);
};

export default LoadingButton;
