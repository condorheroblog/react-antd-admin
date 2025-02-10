import { FollowSystemIcon, MoonIcon } from "#src/icons";
import { NumberInputSpinner } from "#src/layout/widgets/preferences/number-input-spinner";
import { usePreferencesStore } from "#src/store";

import { useTranslation } from "react-i18next";
import { SwitchItem } from "../../switch-item";

export function Sidebar() {
	const {
		sidebarEnable,
		sidebarCollapsed,
		sidebarWidth,
		setPreferences,
		sideCollapsedWidth,
		sidebarTheme,
		firstColumnWidthInTwoColumnNavigation,
	} = usePreferencesStore();
	const { t } = useTranslation();

	const sidebarPreset = [
		{
			label: t("preferences.sidebar.enable"),
			name: "sidebarEnable",
			value: sidebarEnable,
			disabled: false,
		},
		{
			label: t("preferences.sidebar.collapsed"),
			name: "sidebarCollapsed",
			value: sidebarCollapsed,
			disabled: !sidebarEnable,
		},
	] as const;

	const handleChange = (name: string, value: unknown) => {
		setPreferences(name, value);
	};

	return (
		<>
			{
				sidebarPreset.map((item) => {
					return (
						<SwitchItem
							key={item.name}
							name={item.name}
							checked={item.value}
							onChange={handleChange}
							children={item.label}
							disabled={item.disabled}
						/>
					);
				})
			}
			<SwitchItem
				name="sidebarTheme"
				checked={sidebarTheme === "light"}
				onChange={(name, value) => setPreferences(name, value ? "light" : "dark")}
				children={t("preferences.sidebar.sidebarTheme")}
				disabled={!sidebarEnable}
				unCheckedChildren={<FollowSystemIcon />}
				checkedChildren={<MoonIcon />}
			/>
			<NumberInputSpinner
				min={40}
				max={80}
				name="sideCollapsedWidth"
				value={sideCollapsedWidth}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.sidebar.collapsedWidth")}
			</NumberInputSpinner>
			<NumberInputSpinner
				min={180}
				max={320}
				name="sidebarWidth"
				value={sidebarWidth}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.sidebar.width")}
			</NumberInputSpinner>
			<NumberInputSpinner
				min={50}
				max={250}
				name="firstColumnWidthInTwoColumnNavigation"
				value={firstColumnWidthInTwoColumnNavigation}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.sidebar.firstColumnWidthInTwoColumnNavigation")}
			</NumberInputSpinner>
		</>
	);
}
