import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { TranslationOutlined } from "@ant-design/icons";

import type { LanguageType } from "#src/locales";
import { useLanguage } from "#src/hooks";

export default function LanguageMenu() {
	const { language, setLanguage } = useLanguage();

	const items: MenuProps["items"] = [
		{
			label: "简体中文",
			key: "zh-CN",
		},
		{
			label: "English",
			key: "en",
		},
	];

	const onClick: MenuProps["onClick"] = ({ key }) => {
		setLanguage(key as LanguageType);
	};

	return (
		<Dropdown
			menu={{
				items,
				onClick,
				selectable: true,
				defaultSelectedKeys: [language],
			}}
			placement="bottom"
		>
			<TranslationOutlined style={{ fontSize: 18, cursor: "pointer" }} />
		</Dropdown>
	);
}
