import { $t } from "#src/locales";
import { usePreferencesStore } from "#src/store";

import { useTranslation } from "react-i18next";

import { SelectItem } from "../select-item";
import { SwitchItem } from "../switch-item";

const styleItems = [
	{
		label: $t("preferences.tabbar.styleType.chrome"),
		value: "chrome",
	},
	{
		label: $t("preferences.tabbar.styleType.plain"),
		value: "plain",
	},
	{
		label: $t("preferences.tabbar.styleType.card"),
		value: "card",
	},

	{
		label: $t("preferences.tabbar.styleType.brisk"),
		value: "brisk",
	},
];

export function Tabbar() {
	const { t, i18n } = useTranslation();
	const {
		tabbarEnable,
		tabbarShowIcon,
		tabbarPersist,
		tabbarDraggable,
		tabbarStyleType,
		tabbarShowMore,
		tabbarShowMaximize,
		setPreferences,
	} = usePreferencesStore();

	return (
		<>
			<SwitchItem
				name="tabbarEnable"
				checked={tabbarEnable}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.tabbar.enable")}
			</SwitchItem>
			<SwitchItem
				name="tabbarPersist"
				checked={tabbarPersist}
				disabled={!tabbarEnable}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.tabbar.persist")}
			</SwitchItem>
			<SwitchItem
				name="tabbarDraggable"
				checked={tabbarDraggable}
				disabled={!tabbarEnable}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.tabbar.draggable")}
			</SwitchItem>
			<SwitchItem
				name="tabbarShowIcon"
				checked={tabbarShowIcon}
				disabled={!tabbarEnable}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.tabbar.icon")}
			</SwitchItem>
			<SwitchItem
				name="tabbarShowMore"
				checked={tabbarShowMore}
				disabled={!tabbarEnable}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.tabbar.showMore")}
			</SwitchItem>
			<SwitchItem
				name="tabbarShowMaximize"
				checked={tabbarShowMaximize}
				disabled={!tabbarEnable}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.tabbar.showMaximize")}
			</SwitchItem>
			<SelectItem
				key={i18n.language}
				name="tabbarStyleType"
				value={tabbarStyleType}
				disabled={!tabbarEnable}
				items={styleItems}
			>
				{$t("preferences.tabbar.styleType.title")}
			</SelectItem>

		</>
	);
}
