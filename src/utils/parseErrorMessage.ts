export const parseErrorMessage = (error: string) => {
	const match = error.match(/^(.+?) : map/);
	return match ? match[1] : error;
};
