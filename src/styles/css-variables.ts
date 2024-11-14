import { colorPaletteNumbers, colors, neutralColors, productLevelColorSystem } from "#src/components/antd-app/constants";

/**
 * @zh 使用 antd 的颜色变量覆盖 tailwind.css 中的颜色变量。
 * @en Override the color variables in tailwind.css with antd's color variables.
 */
function createColorPaletteVars() {
	const colorPaletteVar: any = {};

	/**
	 * @zh 基础色板
	 * @en Base color palette
	 */
	colors.forEach((color) => {
		colorPaletteNumbers.forEach((number, index) => {
			const colorCount = index === 0 ? "" : `-${index}`;
			colorPaletteVar[`${color}-${number}`] = `rgb(var(--oo-${color}${colorCount}))`;
		});
	});

	/**
	 * @zh 产品级色板
	 * @en Product level color palette
	 */
	productLevelColorSystem.forEach((key) => {
		const keyName = key.replace("color", "");
		const camelCaseName = keyName.charAt(0).toLowerCase() + keyName.slice(1);
		colorPaletteVar[camelCaseName] = `rgb(var(--oo-${key}))`;
	});

	/**
	 * @zh 中性色
	 * @en Neutrals
	 */
	neutralColors.forEach((key) => {
		// 让这个 key 直接是带 rgb 函数的颜色值
		colorPaletteVar[key] = `var(--oo-${key})`;
	});
	return colorPaletteVar;
}

export const colorPaletteVars = createColorPaletteVars();
