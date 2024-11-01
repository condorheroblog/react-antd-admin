import { useAnimationStore } from "#src/store";
import { cn } from "#src/utils";

import { useTranslation } from "react-i18next";
import { SwitchItem } from "../../switch-item";

const transitionPreset = [
	"fade",
	"fade-slide",
	"fade-up",
	"fade-down",
	"fade-zoom",
];

export function Animation() {
	const transitionEnable = useAnimationStore(state => state.transitionEnable);
	const transitionLoading = useAnimationStore(state => state.transitionLoading);
	const transitionProgress = useAnimationStore(state => state.transitionProgress);
	const transitionName = useAnimationStore(state => state.transitionName);
	const setAnimation = useAnimationStore(state => state.setAnimation);
	const { t } = useTranslation();

	function handleClick(value: string) {
		setAnimation("transitionName", value);
	}

	return (
		<>
			<SwitchItem
				name="transitionProgress"
				checked={transitionProgress}
				onChange={(name, value) => setAnimation(name, value)}
			>
				{t("preferences.animation.progress")}
			</SwitchItem>
			<SwitchItem
				name="transitionLoading"
				checked={transitionLoading}
				onChange={(name, value) => setAnimation(name, value)}
			>
				{t("preferences.animation.loading")}
			</SwitchItem>
			<SwitchItem
				name="transitionEnable"
				checked={transitionEnable}
				onChange={(name, value) => setAnimation(name, value)}
			>
				{t("preferences.animation.transition")}
			</SwitchItem>
			<ul
				className="flex justify-between flex-wrap gap-x-3 gap-y-5 list-none px-0"
			>
				{
					transitionPreset.map(item => (
						<li
							key={item}
							onClick={() => handleClick(item)}
							className={cn(
								"relative p-2 outline outline-1 outline-gray-300 cursor-pointer rounded-md",
								"before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:rounded-sm before:opacity-0 before:outline before:outline-2 before:outline-transparent",
								item === transitionName ? "" : "before:transition-all before:duration-300",
								item === transitionName ? "" : "before:hover:outline-blue-600 before:hover:left-0 before:hover:top-0 before:hover:h-full before:hover:w-full before:hover:p-1 before:hover:opacity-100",
								{ "outline-2 outline-blue-600": item === transitionName },
							)}
						>
							<div
								className={cn(
									"bg-gray-100 h-10 w-12 rounded-md text-xs flex items-center justify-center text-center",
									{
										"fade-slide": item === "fade-slide",
										"fade": item === "fade",
										"fade-up": item === "fade-up",
										"fade-down": item === "fade-down",
										"fade-zoom": item === "fade-zoom",
									},
								)}
							>
								<span className="scale-75 text-opacity-75">{item}</span>
							</div>
						</li>
					))
				}
			</ul>
		</>
	);
}
