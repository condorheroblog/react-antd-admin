import type { dependencies, devDependencies } from "#package.json";

declare global {
	const __APP_INFO__: {
		pkg: {
			name: string;
			version: string;
			dependencies: typeof dependencies;
			devDependencies: typeof devDependencies;
		};
		lastBuildTime: string;
	};
}
