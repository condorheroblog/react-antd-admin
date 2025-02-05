import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // 窗口聚焦时是否重新获取数据
			refetchOnReconnect: false, // 网络恢复时是否重新获取数据
			retry: 0, // 重试次数
		},
		mutations: {
			retry: 0, // 重试次数
		},
	},
});

export interface TanstackQueryProps {
	children: ReactNode
}

export function TanstackQuery({ children }: TanstackQueryProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
