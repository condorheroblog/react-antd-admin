import { usePreferencesStore } from "#src/store";

import { useTranslation } from "react-i18next";

import { SelectItem } from "../../select-item";
import { SwitchItem } from "../../switch-item";
import { getLanguageItems } from "./utils";

export function General() {
	const { t } = useTranslation();
	const {
		language,
		enableCheckUpdates,
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
				name="enableCheckUpdates"
				checked={enableCheckUpdates}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.general.enableCheckUpdate")}
			</SwitchItem>
		</>
	);
}
