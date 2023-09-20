export async function importLazy(importPath: string){
	const mod = await import(importPath);
	return {
		...mod,
		Component: mod.Component
	}
}
