/**
 *
 * 当 getBlocker 支持异步请求路由匹配逻辑（注意现在 getBlocker 不支持异步所以无法使用）：
 * https://mermaid.live/edit#pako:eNp1VF1PE0EU_SuTefCpRQs-VUMiwSgJEgIaE3d5GLrT7cTuTrM7VQghQY2xWKFFPmITEZDQEmNSxJDGSPHPMNvtv3B2Z7dMsW6yycy959577rkzswQz1MAwDbN5-jKTQw4Dj8d1G4hvloldSuPnK7xRngPJ5CgYowspTYepoRv2vFu4wz-f8N0Vb7_iX2zyt0ed9obYgrvzDrg5OhxhvLOK3yjx2rHfOPS-VKVzJE5QesdXT_2DD53jcnfzwls_0uGcrB6UCmvO0CLDzoRN2AxGxqLm9O8j-DWUEjlDKdO8_V9-q9nZ-tEHD1wCCbxPzTDgIbXwNDLxIAyv1kPMhDtJTWJrIkaYOrXfvL0dJVVkG-6TTVDKMJlunFpCQCcwJGUnSYNaUpXUEJhCL4iJGI41BJPEft7TpD-P0uMYzlIH30eZXCTPlUGEquxC8kGPWj5YgYJYBiSB7MQrVfn7vTDzA8yeuIGkWTqs-estXtnpbB17pdblnwPvVTOipKKCNH6jzisbvHnul74NJKhqe2W9Ni-VcSS4OqfQEKKjLvpme-VVY3rD1fzWT7_9nZdOuvWd7sFZFBW7gUQPpt2fOj4SigaDhfqnkTjyaY4wPElcpskOOrU2r67xtW05_8uLMq-_BrJHQbW7-zVi2wsEao9TeIEN8sflesNX9VXYR1PI42nsWMR1CRXn_HDF2zvyGx_91VNv9023Vu1dIRWnlgkq3L41oolfnq__Bai8YQJawomIIR6jpSBChyyHLazDtFgaOIuKeabDhHRZ2HVF6nt5YtoS4RAzJ_y6vSxSoSKjs4t2BqaZU8QJKG6FmYPpLMq7YlcsGOKOjRNkOsjqWbFBGHUeyecwfBUTsIDsZ5TGmOW_NfsFew
 *
 * 当前路由匹配逻辑：
 * https://mermaid.live/edit#pako:eNqFVF1PE0EU_SuTefCpRQs-VUMiwSgJElI0Ju7yMHSn24ndnWZ3qhBCghpjEaFFPmITEZDQEmNSxJDGSPHPMNvtv3B2Z9tOscQmTWbuPffcc-7OzCJMUwPDJMzk6Mt0FjkMPB7XbSB-M0zsEho_X-a11VkQj4-CMTqf0HSYGLphz7n5O_zzCd9d9vZL_sUmf3vUam6ILbg754Cbo8MRxjsr-bUirxz7tUPvS1kmRzoExXd85dQ_-NA6Xm1vXnjrRzqcld2DVmHPFC0w7EzYhKUwMhY0p38fwa-gwsoJd5KaxNa8T3VerrYqv3lzO4IrDof7HIrqNJNk49QSXp0gEJdN4wa1pIHEEJhCL4iJGO7YBZPEft6V38-jGBnDGerg-yidjZz0AqJUVReKn0Ym1nLBCuTFMhAJpBOvWObv90LmB5g9cQP3GTqs-esNXtppbR17xcblnwPvVT2SpKICGr9W5aUNXj_3i98GClQn24uqo1XlRqGAWQz8qq7rZYVVYRO1FDykFg7N-42ffvM7L560qzvtg7OoqpMGEj1Y-n_6K6ZTlDLN2__lN-qtrR99ZypIDVQ2CCTOWQjqmYo-Xpf4n2F1Sp5mCcOTxGWaxLYqTV5e42vb8oBdXqzy6msg2cQc2rtfI5ndQqDKnMLzbFC-T2HPxqBv0YGmaA5PY8cirkuouE6Hy97ekV_76K-certv2pVyd14qTmUI-ty-NaKJvzzG1xWo6mEMWiKJiCGep8WgQocsiy2sw6RYGjiDCjmmw5hMWdh1BfW9HDFtiXCImRV53V4SVKjA6MyCnYZJ5hRwDIrLZ2ZhMoNyrtgV8oa4yuMEmQ6yulFsEEadR_KBDN_JGMwj-xmlHczSXxu_Ebw
 *
 * 1. 初次进入应用触发 routerInitReady 函数
 * 2. routerInitReady 函数的跳转逻辑一定在请求完用户信息后执行，防止异步逻辑进入 getBlocker
 * 3. 为了让异步路由生效 routerInitReady 中会执行路由替换，所以 getBlocker 中不需要进行 nextLocation.pathname  === currentLocation.pathname 的判断，否则替换会失效
 * 4. 执行路由替换之后，权限验证逻辑只需要在 getBlocker 维护一份即可
 *
 *
 * 用户点击登录获取用户信息，可以防止在 getBlocker 中执行异步路由匹配逻辑
 *
 *
 */

import type { AppRouteRecordRaw } from "./types";

import { createBrowserRouter } from "react-router-dom";
import { routerAfterEach, routerBeforeEach, routerInitReady } from "./router-global-hooks";
import { addIdToRoutes, getInitReactRoutes } from "./utils";

const modules = import.meta.glob<
	Record<string, { default: AppRouteRecordRaw[] }>
>("./modules/**/*.ts", { eager: true });

export const routeModuleList = Object.keys(modules).reduce<AppRouteRecordRaw[]>(
	(list, key) => {
		const mod = modules[key].default ?? {};
		const modList = Array.isArray(mod) ? [...mod] : [mod];
		return [...list, ...addIdToRoutes(modList)];
	},
	[],
);

export const router = createBrowserRouter(
	getInitReactRoutes(routeModuleList),
	{
		basename: import.meta.env.BASE_URL,
	},
);

export async function setupRouter() {
	// router beforeEach
	router.getBlocker("beforeEach", routerBeforeEach(router));
	// router afterEach
	router.subscribe(routerAfterEach);

	await routerInitReady(router);
}

export default router;
