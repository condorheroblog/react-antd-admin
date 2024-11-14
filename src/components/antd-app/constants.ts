// CSS 变量前缀
export const prefix = "oo";
// 基础色
export const colors = [
	"blue",
	"purple",
	"cyan",
	"green",
	"magenta",
	"pink",
	"red",
	"orange",
	"yellow",
	"volcano",
	"geekblue",
	"gold",
	"lime",
];
// 品牌色
export const brandColors = [
	"colorPrimary",
	"colorPrimaryBg",
	"colorPrimaryBgHover",
	"colorPrimaryBorder",
	"colorPrimaryBorderHover",
	"colorPrimaryHover",
	"colorPrimaryActive",
	"colorPrimaryTextHover",
	"colorPrimaryText",
	"colorPrimaryTextActive",
];
// 成功色
export const successColors = [
	"colorSuccess",
	"colorSuccessBg",
	"colorSuccessBgHover",
	"colorSuccessBorder",
	"colorSuccessBorderHover",
	"colorSuccessHover",
	"colorSuccessActive",
	"colorSuccessTextHover",
	"colorSuccessText",
	"colorSuccessTextActive",
];
// 警告色
export const warningColors = [
	"colorWarning",
	"colorWarningBg",
	"colorWarningBgHover",
	"colorWarningBorder",
	"colorWarningBorderHover",
	"colorWarningHover",
	"colorWarningActive",
	"colorWarningTextHover",
	"colorWarningText",
	"colorWarningTextActive",
];
// 错误色
export const errorColors = [
	"colorError",
	"colorErrorBg",
	"colorErrorBgHover",
	"colorErrorBorder",
	"colorErrorBorderHover",
	"colorErrorHover",
	"colorErrorActive",
	"colorErrorTextHover",
	"colorErrorText",
	"colorErrorTextActive",
];
// 信息色
export const infoColors = [
	"colorInfo",
	"colorInfoBg",
	"colorInfoBgHover",
	"colorInfoBorder",
	"colorInfoBorderHover",
	"colorInfoHover",
	"colorInfoActive",
	"colorInfoTextHover",
	"colorInfoText",
	"colorInfoTextActive",
];
// 功能性色
export const functionalColors = [
	...successColors,
	...warningColors,
	...errorColors,
	...infoColors,
];
// 中性色
export const neutralColors = [
	"colorText",
	"colorTextSecondary",
	"colorTextTertiary",
	"colorTextQuaternary",
	// 组件容器背景色
	"colorBgContainer",
	"colorBgElevated",
	// 布局背景色
	"colorBgLayout",

	"colorBgSpotlight",
	"colorBgMask",
	// 边框色
	"colorBorder",
	"colorBorderSecondary",
	// 填充色
	"colorFill",
	"colorFillSecondary",
	"colorFillTertiary",
	"colorFillQuaternary",
];
export const productLevelColorSystem = [
	...brandColors,
	...functionalColors,
];
export const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const colorVariantsCount = 10;

// ['blue', 'blue-1', 'blue-2', ……, 'blue-10', 'purple',……]
export const colorPalettes = colors.flatMap(color =>
	[color, ...Array.from({ length: colorVariantsCount }, (_, i) => `${color}-${i + 1}`)],
);
