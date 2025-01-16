import type { TFunction } from "i18next";

export function getYesNoOptions(t: TFunction<"translation", undefined>) {
	return [
		{
			label: t("common.yes"),
			value: 1,
		},
		{
			label: t("common.no"),
			value: 0,
		},
	];
}

export function getBooleanOptions(t: TFunction<"translation", undefined>) {
	return [
		{
			label: t("common.yes"),
			value: true,
		},
		{
			label: t("common.no"),
			value: false,
		},
	];
}
