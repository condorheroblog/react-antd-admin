import type { LanguageType } from "#src/locales";
import type { ButtonProps, MenuProps } from "antd";

import { BasicButton } from "#src/components";
import { useLanguage } from "#src/hooks";

import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export function LanguageButton({ ...restProps }: ButtonProps) {
	const { language, setLanguage } = useLanguage();

	const items: MenuProps["items"] = [
		{
			label: "简体中文",
			key: "zh-CN",
		},
		{
			label: "English",
			key: "en-US",
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
			trigger={["click"]}
			arrow={false}
			placement="bottom"
		>
			<BasicButton
				type="text"
				{...restProps}
			>
				<TranslationOutlined />
			</BasicButton>
		</Dropdown>
	);
}
