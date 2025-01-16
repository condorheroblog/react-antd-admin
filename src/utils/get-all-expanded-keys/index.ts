export function getAllExpandedKeys(data: any[], fieldName = "key"): string[] {
	return data.flatMap(item => [
		item[fieldName],
		...(item.children?.length ? getAllExpandedKeys(item.children, fieldName) : []),
	]);
}
