import { useEffect, useMemo } from "react";

export interface UseCssVarOptions {
	initialValue?: string
}

export interface UseCssVarProps {
	name: `--${string}`
	root?: HTMLElement
	options?: UseCssVarOptions
}

export interface CssVarControls {
	set: (value: string) => void
	get: () => string
	remove: () => void
}

const defaultRoot = typeof document !== "undefined" ? document.body : undefined;

/**
 * @see https://soorria.com/snippets/use-css-var-react
 */
export function useCssVar(
	name: `--${string}`,
	root = defaultRoot!,
	options: UseCssVarOptions = {},
): CssVarControls {
	const controls: CssVarControls = useMemo(
		() => ({
			set: value => root.style.setProperty(name, value),
			get: () => root.style.getPropertyValue(name),
			remove: () => root.style.removeProperty(name),
		}),
		[name, root],
	);

	useEffect(() => {
		if (options?.initialValue) {
			controls.set(options.initialValue);
		}
	}, [options?.initialValue]);

	useEffect(() => {
		return () => controls.remove();
	}, [controls]);

	return controls;
}
