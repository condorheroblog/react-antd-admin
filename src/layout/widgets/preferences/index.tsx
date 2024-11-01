import { ThemeSwitch } from "#src/layout/layout-header/components/theme-switch.js";
import { useGlobalStore } from "#src/store";
import { SettingOutlined } from "@ant-design/icons";
import { Divider, Drawer } from "antd";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Animation, PreferencesLayout, Tabbar } from "./blocks";

export function Preferences() {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const { isMobile } = useGlobalStore();

	return (
		<>
			<div
				role="menuitem"
				tabIndex={-1}
				onClick={() => setIsOpen(true)}
				onKeyDown={() => { }}
				className="text-lg"
			>
				<SettingOutlined />
			</div>
			<Drawer
				title={t("common.preferences.title")}
				placement="right"
				onClose={() => {
					setIsOpen(false);
				}}
				{...(isMobile
					? {
						width: "clamp(210px, 56vw, 220px)",
					}
					: {})}
				open={isOpen}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Divider>{t("common.preferences.theme")}</Divider>
					<ThemeSwitch />
					<Divider>{t("preferences.layout.title")}</Divider>
					<PreferencesLayout />
					<Divider>{t("preferences.tabbar.title")}</Divider>
					<Tabbar />
					<Divider>{t("preferences.animation.title")}</Divider>
					<Animation />
				</div>
			</Drawer>
		</>
	);
}
