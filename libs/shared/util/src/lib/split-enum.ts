export const splitEnum = (ENUM: object) => {
	return Object.values(ENUM).slice(0, Object.values(ENUM).length / 2);
};
