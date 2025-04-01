import { usePreferencesStore } from "#src/store";

import { useTranslation } from "react-i18next";

import { TextInput } from "../../text-input";
import { SwitchItem } from "../../switch-item";

export function PreferencesFooter() {
	const { t } = useTranslation();
	const {
		enableFooter,
		fixedFooter, companyName, companyWebsite, copyrightDate, ICPNumber
		, ICPLink, setPreferences,
	} = usePreferencesStore();

	return (
		<>
			<SwitchItem
				name="enableFooter"
				checked={enableFooter}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.showFooter")}
			</SwitchItem>

			<SwitchItem
				name="fixedFooter"
				checked={fixedFooter}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.fixedFooter")}
			</SwitchItem>

			<TextInput
				name="companyName"
				value={companyName}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.companyName")}
			</TextInput>

			<TextInput
				name="companyWebsite"
				value={companyWebsite}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.companyWebsite")}
			</TextInput>

			<TextInput
				name="copyrightDate"
				value={copyrightDate}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.copyrightDate")}
			</TextInput>

			<TextInput
				name="ICPNumber"
				value={ICPNumber}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.ICPNumber")}
			</TextInput>
			<TextInput
				name="ICPLink"
				value={ICPLink}
				onChange={(name, value) => setPreferences(name, value)}
			>
				{t("preferences.footer.ICPLink")}
			</TextInput>
		</>
	);
}
