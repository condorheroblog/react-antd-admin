import type { ThemeType } from "#src/store";

import { FollowSystemIcon, MoonIcon, SunIcon } from "#src/icons";
import { $t } from "#src/locales";
import { usePreferencesStore } from "#src/store";
import { cn } from "#src/utils";

const themePresets = [
	{
		name: $t("preferences.theme.light"),
		icon: <SunIcon className="text-xl" />,
		type: "light",
	},
	{
		name: $t("preferences.theme.dark"),
		icon: <MoonIcon className="text-xl" />,
		type: "dark",
	},
	{
		name: $t("preferences.theme.followSystem"),
		icon: <FollowSystemIcon className="text-xl" />,
		type: "auto",
	},
] as const;

export function SiteTheme() {
	const {
		theme,
		changeSiteTheme,
	} = usePreferencesStore();

	function handleClick(value: ThemeType) {
		changeSiteTheme(value);
	}

	return (
		<>
			<ul
				className="flex justify-between w-full gap-3 p-0 m-0 list-none"
			>
				{
					themePresets.map(item => (
						<li
							className="cursor-pointer"
							key={item.type}
							onClick={() => handleClick(item.type)}
						>
							<dl className="mb-0">
								<dd
									className={cn(
										"relative py-4 px-10 outline outline-1 outline-gray-300 rounded-md",
										"before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:rounded-sm before:opacity-0 before:outline before:outline-2 before:outline-transparent",
										item.type === theme ? "" : "before:transition-all before:duration-300",
										item.type === theme ? "" : "before:hover:outline-blue-600 before:hover:left-0 before:hover:top-0 before:hover:h-full before:hover:w-full before:hover:p-1 before:hover:opacity-100",
										{ "outline-2 outline-blue-600": item.type === theme },
									)}
								>
									{item.icon}
								</dd>

								<dt className="mt-2.5 flex gap-1 justify-center text-xs opacity-90">
									<span className="">{item.name}</span>
								</dt>
							</dl>
						</li>
					))
				}
			</ul>

		</>
	);
}
