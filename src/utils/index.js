export const replaceSpace = (value) => {
	console.log(value);
	return value.replace(/ /g, '-');
};

export const maxLength = (length) => (value, prevValue) => {
	if (value.length > length) {
		return prevValue.replace(/[/\\]/g, '');
	}
	return value.replace(/[/\\]/g, '');
};
