import type { FormInitialValues } from "#src/pages/login";
import { request } from "#src/utils";

interface ExpectedReturnValue {
	code: number;
	result: { token: string };
	message:string;
	type:string;
}
export function fetchLogin(data: FormInitialValues) {
	return (request.url("/api/login").post(data)) as Promise<ExpectedReturnValue>;
}
