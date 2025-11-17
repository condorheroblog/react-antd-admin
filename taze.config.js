import { defineConfig } from "taze";

export default defineConfig({
	// ignore packages from bumping
	exclude: [
		"react",
		"react-dom",
		"@types/react",
		"@types/react-dom",
		"@ant-design/icons",
	],
	// recursively check all subdirectories
	recursive: true,
	// fetch latest package info from registry without cache
	force: true,
	// write to package.json
	write: true,
	// run `npm install` or `yarn install` right after bumping
	install: true,
});
