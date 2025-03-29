import type { NavigationType } from "#src/store/preferences/types";
import { MixedNavigationIcon, SideNavigationIcon, TopNavigationIcon, TwoColumnNavigationIcon } from "#src/icons";
import {
	MIXED_NAVIGATION,
	SIDE_NAVIGATION,
	TOP_NAVIGATION,
	TWO_COLUMN_NAVIGATION,
} from "#src/layout/widgets/preferences/blocks/layout/constants";
import { usePreferencesStore } from "#src/store";
import { cn } from "#src/utils";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

export function PreferencesLayout() {
	const navigationStyle = usePreferencesStore(state => state.navigationStyle);
	const setPreferences = usePreferencesStore(state => state.setPreferences);
	const { t } = useTranslation();

	const navigationPreset = [
		{
			name: t("preferences.layout.sideNavigation"),
			tip: t("preferences.layout.sideNavigationTip"),
			icon: <SideNavigationIcon className="text-[4rem] en-US:text-[9rem]" />,
			type: SIDE_NAVIGATION,
		},
		{
			name: t("preferences.layout.topNavigation"),
			tip: t("preferences.layout.topNavigationTip"),
			icon: <TopNavigationIcon className="text-[4rem] en-US:text-[9rem]" />,
			type: TOP_NAVIGATION,
		},
		{
			name: t("preferences.layout.twoColumnNavigation"),
			tip: t("preferences.layout.twoColumnNavigationTip"),
			icon: <TwoColumnNavigationIcon className="text-[4rem] en-US:text-[9rem]" />,
			type: TWO_COLUMN_NAVIGATION,
		},
		{
			name: t("preferences.layout.mixedNavigation"),
			tip: t("preferences.layout.mixedNavigationTip"),
			icon: <MixedNavigationIcon className="text-[4rem] en-US:text-[9rem]" />,
			type: MIXED_NAVIGATION,
		},
	] as const;

	function handleClick(value: NavigationType) {
		setPreferences("navigationStyle", value);
	}

	return (
		<>
			<ul
				className="w-full flex flex-wrap justify-between gap-1 en-US:gap-y-3 px-0 list-none"
			>
				{
					navigationPreset.map(item => (
						<li
							key={item.type}
							onClick={() => handleClick(item.type)}
						>
							<dl className="mb-0">
								<dd
									className={cn(
										"relative p-1 outline outline-1 outline-gray-300 dark:outline-gray-700 rounded-md cursor-pointer",
										"before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:rounded-sm before:opacity-0 before:outline before:outline-2 before:outline-transparent",
										item.type === navigationStyle ? "" : "before:transition-all before:duration-300",
										item.type === navigationStyle ? "" : "before:hover:outline-blue-600 dark:before:hover:outline-blue-700 before:hover:left-0 before:hover:top-0 before:hover:h-full before:hover:w-full before:hover:p-1 before:hover:opacity-100",
										{ "outline-2 outline-blue-600 dark:outline-blue-700": item.type === navigationStyle },
									)}
								>
									{item.icon}
								</dd>

								<dt className="mt-2.5 flex gap-1 justify-center text-xs opacity-90">
									<span className="">{item.name}</span>
									<Tooltip title={item.tip} placement="bottom">
										<QuestionCircleOutlined className="cursor-help" />
									</Tooltip>
								</dt>
							</dl>
						</li>
					))
				}
			</ul>
		</>
	);
}
