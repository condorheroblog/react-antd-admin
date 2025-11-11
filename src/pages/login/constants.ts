import { createElement } from "react";

import { CodeLogin } from "./components/code-login";
import { ForgotPassword } from "./components/forgot-password";
import { PasswordLogin } from "./components/password-login";
import { RegisterPassword } from "./components/register-password";

export const FORM_COMPONENT_MAP = {
	login: createElement(PasswordLogin),
	register: createElement(RegisterPassword),
	forgotPassword: createElement(ForgotPassword),
	codeLogin: createElement(CodeLogin),
};
