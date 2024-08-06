import { useState } from "react";
import { Divider, Drawer, Switch } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ThemeSwitch } from "./theme-switch";
import { useGlobalStore } from "#src/store";

export function ProjectSettings() {
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
			>
				<SettingOutlined style={{ transform: "scale(1.3)" }} />
			</div>
			<Drawer
				title={t("common.projectSettings.title")}
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
					<Divider>{t("common.projectSettings.theme")}</Divider>
					<ThemeSwitch />
				</div>
			</Drawer>
		</>
	);
}
