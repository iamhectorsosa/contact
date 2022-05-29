const fetcher = async (endpoint: any, config: any) => {
	const res = await fetch(endpoint, config);
	return res.json();
};

export default fetcher;