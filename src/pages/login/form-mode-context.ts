import { createContext } from "react";

export type FormComponentMapType = "login" | "register" | "forgotPassword" | "codeLogin";

export const FormModeContext = createContext<{
	formMode: FormComponentMapType
	setFormMode: React.Dispatch<React.SetStateAction<FormComponentMapType>>
}>({
	formMode: "login",
	setFormMode: () => { },
});
