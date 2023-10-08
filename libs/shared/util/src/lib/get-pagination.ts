export const getPagination = (page: number, limit: number | undefined) => {
	if (!limit) {
		limit = 10;
	}
	if (!page) {
		page = 0;
	}

	return {
		take: limit,
		skip: page * limit
	};
};
