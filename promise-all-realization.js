let promiseAll = (promisArray) => {
	let results = [];
	let completed = 0;
	return new Promise((resolve, reject) => {
		promisArray.forEach((promise, index) => {
			promise
				.then((value) => {
					results[index] = value;
					completed += 1;
					if (completed === promisArray.length) {
						resolve(results);
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	});
};
