import type { LanguageType } from "#src/locales";
import type { ButtonProps, MenuProps } from "antd";

import { BasicButton } from "#src/components";
import { useLanguage } from "#src/hooks";
import { getLanguageItems } from "#src/layout/widgets/preferences/blocks/general/utils";

import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

export function LanguageButton({ ...restProps }: ButtonProps) {
	const { language, setLanguage } = useLanguage();

	const items: MenuProps["items"] = getLanguageItems();

	const onClick: MenuProps["onClick"] = ({ key }) => {
		setLanguage(key as LanguageType);
	};

	return (
		<Dropdown
			menu={{
				items,
				onClick,
				selectable: true,
				selectedKeys: [language],
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
