interface Bar<A> {
	[key: string]: A;
}

type FileModule = Bar<FileModule>;
type FileParams = Record<string, FileModule>;

export const getZhCnLang = () => {
	const langFiles = import.meta.glob<FileParams>("./zh-CN/**/*.json", {
		import: "default",
		eager: true,
	});
	const result = handleFileList(langFiles);
	return result;
};

export const getEnUsLang = () => {
	const langFiles = import.meta.glob<FileParams>("./en-US/**/*.json", {
		import: "default",
		eager: true,
	});
	const result = handleFileList(langFiles);
	return result;
};

export const handleFileList = (files: FileParams) => {
	const result: FileModule = {};

	for (const key in files) {
		const data = files[key];
		const fileArr = key?.split("/");
		const fileName = fileArr[fileArr?.length - 1];
		if (!fileName) continue;
		const name = fileName.split(".json")[0];
		if (name) result[name] = data;
	}

	return result;
};
