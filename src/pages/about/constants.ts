const { dependencies, devDependencies } = __APP_INFO__.pkg;

export const dependenciesItems = Object.keys(dependencies).map((dep) => {
	const value = dependencies[dep as keyof typeof dependencies];
	return {
		key: dep,
		label: dep,
		children: value,
	};
});

export const devDependenciesItems = Object.keys(devDependencies).map((dep) => {
	const value = devDependencies[dep as keyof typeof devDependencies];
	return {
		key: dep,
		label: dep,
		children: value,
	};
});
