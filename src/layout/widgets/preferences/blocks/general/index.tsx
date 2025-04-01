import { usePreferencesStore } from "#src/store";

import { useTranslation } from "react-i18next";

import { SelectItem } from "../../select-item";
import { SwitchItem } from "../../switch-item";
import { TextInput } from "../../text-input";
import { getLanguageItems } from "./utils";

export function General() {
	const { t } = useTranslation();
	const {
		language,
		enableDynamicTitle,
		watermark,
		watermarkContent,
		enableCheckUpdates,
		enableBackTopButton,
		setPreferences,
	} = usePreferencesStore();

	return (
		<>
			<SelectItem
				name="language"
				value={language}
				items={getLanguageItems()}
			>
				{t("preferences.general.language")}
			</SelectItem>

			<SwitchItem
				name="enableDynamicTitle"
				checked={enableDynamicTitle}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.general.dynamicTitle")}
			</SwitchItem>

			<SwitchItem
				name="enableCheckUpdates"
				checked={enableCheckUpdates}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.general.enableCheckUpdate")}
			</SwitchItem>

			<SwitchItem
				name="enableBackTopButton"
				checked={enableBackTopButton}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.general.enableBackTopButton")}
			</SwitchItem>

			<SwitchItem
				name="watermark"
				checked={watermark}
				onChange={(name, value) => setPreferences(name, value)}
				tooltip={t("preferences.general.watermarkTip")}
			>
				{t("preferences.general.watermark")}
			</SwitchItem>

			<TextInput
				name="watermarkContent"
				value={watermarkContent}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.general.watermarkContent")}
			</TextInput>
		</>
	);
}
