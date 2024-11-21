import { colorPaletteNumbers, colors, neutralColorPalettes, neutralColors, productLevelColorSystem } from "#src/components/antd-app/constants";
import { hexToRGB } from "#src/components/antd-app/utils";

/**
 * @zh 使用 antd 的颜色变量覆盖 tailwind.css 中的颜色变量。
 * @en Override the color variables in tailwind.css with antd's color variables.
 */
function createColorPalettes() {
	const colorPaletteVar: Record<string, string> = {
		transparent: "transparent",
		inherit: "inherit",
		current: "currentColor",
		white: "rgb(255 255 255)",
		black: "rgb(0 0 0)",
	};

	/**
	 * @zh 基础色板
	 * @en Base color palette
	 * @see https://ant.design/docs/spec/colors#base-color-palettes
	 */
	colors.forEach((color) => {
		colorPaletteNumbers.forEach((number, index) => {
			const colorCount = index === 0 ? "" : `-${index}`;
			colorPaletteVar[`${color}-${number}`] = `rgb(var(--oo-${color}${colorCount}))`;
		});
	});

	/**
	 * @zh 中性色板
	 * @en Neutral color palette
	 * @see https://ant.design/docs/spec/colors#neutral-color-palette
	 */
	colorPaletteNumbers.forEach((number, index) => {
		const rgb = hexToRGB(neutralColorPalettes[index]);
		colorPaletteVar[`gray-${number}`] = `rgb(${rgb})`;
	});

	/**
	 * @zh 产品级颜色系统
	 * @en Product level color system
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

export const getColorPalettes = createColorPalettes();
