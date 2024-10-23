import { ThemeSwitch } from "#src/layout/header/components/theme-switch";
import { useGlobalStore } from "#src/store";
import { SettingOutlined } from "@ant-design/icons";
import { Divider, Drawer } from "antd";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Tabbar } from "./blocks/tabbar";

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
					<Divider>{t("preferences.tabbar.title")}</Divider>
					<Tabbar />
				</div>
			</Drawer>
		</>
	);
}
