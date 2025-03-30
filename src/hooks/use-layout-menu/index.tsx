import type { PageLayoutType } from "#src/store/preferences/types";
import type { MenuProps } from "antd";
import type { TFunction } from "i18next";

import { LayoutCenterIcon, LayoutLeftIcon, LayoutRightIcon } from "#src/icons";
import { usePreferencesStore } from "#src/store";

import { Button, Dropdown } from "antd";
import { useTranslation } from "react-i18next";

function menuItems(t: TFunction<"translation", undefined>) {
	return [
		{
			icon: <LayoutLeftIcon />,
			label: t("authority.layout.alignLeft"),
			key: "layout-left",
		},
		{
			icon: <LayoutCenterIcon />,
			label: t("authority.layout.alignCenter"),
			key: "layout-center",
		},
		{
			icon: <LayoutRightIcon />,
			label: t("authority.layout.alignRight"),
			key: "layout-right",
		},
	];
}

export function useLayoutMenu() {
	const { t } = useTranslation();
	const pageLayout = usePreferencesStore(state => state.pageLayout);
	const setPreferences = usePreferencesStore(state => state.setPreferences);

	function setPageLayout(value: PageLayoutType) {
		setPreferences({ pageLayout: value });
	}

	const onClick: MenuProps["onClick"] = ({ key }) => {
		setPageLayout(key as PageLayoutType);
	};

	const dropdownItems = menuItems(t);

	const layoutButtonTrigger = (
		<Dropdown
			menu={{
				items: dropdownItems,
				selectable: true,

				onClick,
				selectedKeys: [pageLayout],
			}}
			trigger={["click"]}
			arrow={false}
			placement="bottom"
		>
			<Button type="text" icon={dropdownItems.find(item => item.key === pageLayout)?.icon} />
		</Dropdown>
	);

	return {
		pageLayout,
		setPageLayout,
		layoutButtonTrigger,
	};
}
