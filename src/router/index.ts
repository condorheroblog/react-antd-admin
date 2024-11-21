/**
 *
 * 当 getBlocker 支持异步请求路由匹配逻辑（注意现在 getBlocker 不支持异步所以无法使用）：
 * https://mermaid.live/edit#pako:eNp1VF1rE0EU_SvDPPiUVJP6FKVgiWghlpIqgrt9mGYnm8HsTtidaEspVEVMrW1S24oBYxtLPvAlWihFbOuf6Ww2_8LZnSSdhDQQ2Ln3zLnnnnt312CGGhgmYDZPX2dyyGHgaVK3gfgtMnGKafx8g7e2lkA0OgNm6UpM02Fs6pa97Bbu8W-_eG3DOyr7l3v8faN7sSuO4P6yA27PxPsY77Tst0q82vZbx973ikxODwhKH_jmiV__1G1v9fYuvZ2GDpdk9aBUWDNNiww7czZhaYyMVc0ZPffhYyjlZppSpnlHf_yzTnf_9wg8SAkk8L52wguPqYUXkIknYXilGWKe5wjDKeIyTRJ2qxe8ss23D2RnV5dbvPkW5KlJbNCrn_ZqP_olFVPjI6YKwRkmiyWpJex1gkBU9hk1qCWZY1NgHr0iJmJ44DBIEfvl0LFRHsWBWZylDn6IMrm-edcBcVVVlwpkBw5osoGCeAxEgm71L7848EoV_vEwZH6E2TM3MDxL45q_c8bLX7r7ba90dvWv7r3p9CWpqIDGbzV5eZd3zv3Sz4kCVeevo2PTVBXPuaFmdULDJiRiMFQQJidUlLDhXFWqPrsmFkSEpAlL43h1g-bxyk3yBpA0zeMF7FjEdQkV1Mcb3mHDb332N0-82rtetTJcURWnqgq6uXtnWhN_OaGbLqiqYARaIomIIV72teCGDlkOW1iHCfFo4Cwq5pkOIzJlYdcV1A_yxLQlwiFmTuR1e11QoSKji6t2BiaYU8QRKPbKzMFEFuVdcSoWDLGlSYJMB1nDKDYIo84T-bkJvzoRWED2C0oHmPX_HFHAvg
 *
 * 当前路由匹配逻辑：
 * https://mermaid.live/edit#pako:eNqFVO9P00AY_lcu98FPG7rhp2lIJDNKMgkZGhNbPhzrrb249pb2phBCghjjcMKGgHGJCJPAFr9MSQgxAv4zXNv9F15722h1xCZN7t73eZ_3eX_klmCBahhmYLFEXxYMZDPwOKtaQHyzTNxSCj9b4e3aHEgmJ8AkXUgpKkyN3bDmnfId_vk7311x9-v-xRZ_c-idb4oruDtvg5sT6T7GPan77Spvdvz2gfulIZ3jA4LqW7527Lfee51ab-vC3ThU4ZzMHqQKc-ZphWF7yiIsj5G2qNjxex_-FyqMfGoQhnPEYYp_2vW2f3jNc95Y5-s7UsTlRY0frYIS1YkFeq2T3u7XPtkwEAgewBtHId2UkwugivupK0xe8xc_3xkZIABhwDReYNIfaWg61lAhtsCk9iw1RWvtwJCUNSY1akqpqTEwjV4QHTE86C7IEev5sFtxnkjfJnGR2vg-Khj9xl0ZRGhUXVjcDNKxIjtSFsdAJJCVutUGf7cXMj_A7IkTNLtI04q_ccrrH73tjls9vfzdcl91-5KiqIDGbx_x-ibvnvnVbyMFRgd5ZY1PMiq4P4_oiK6K-AcyGEpE1vXaH1ITByxAso5W-h-mSI15Spni7v-Uaxjb2MAVlTdMPQo0KDNPS3gG2yZxHELFQh6suHuHfvuDv3bs7r7uNRvD0caRUY4gx-1b44r45aivC4huM0xAUzgR0cSLsRREqJAZ2MQqzIijhouoUmIqTEiXiR1HUN8rEd2SCJvohvCr1rKgQhVGZxetAswwu4ITUCyobsBMEZUccauUNbHuWYJ0G5lDK9YIo_Yj-WaFT1cClpH1jNIBZvkPz1flJg
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

import { createBrowserRouter } from "react-router-dom";

import { routerAfterEach, routerBeforeEach, routerInitReady } from "./router-global-hooks";
import { routes } from "./routes";

export const router = createBrowserRouter(
	routes,
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
