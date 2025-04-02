import { ArrowDownOutlined, ArrowUpOutlined, EnterOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import { useTranslation } from "react-i18next";

interface SearchFooterProps {
	searchItems: number
}

export function SearchFooter({ searchItems }: SearchFooterProps) {
	const { t } = useTranslation();
	return (
		<>
			<Divider className="mt-2 my-0" />
			<div className="px-4 py-2 flex items-center justify-between text-xs">
				<div className="flex items-center">
					<span
						className="flex items-center justify-center p-1 h-5 rounded-md bg-[#F3F4F5] dark:bg-[#26313C]"
					>
						<ArrowUpOutlined />
					</span>
					<span
						className="flex items-center justify-center p-1 h-5 rounded-md bg-[#F3F4F5] dark:bg-[#26313C] ml-2"
					>
						<ArrowDownOutlined />
					</span>
					<span className="ml-2">{t("widgets.search.navigate")}</span>
					<span
						className="flex items-center justify-center p-1 h-5 rounded-md bg-[#F3F4F5] dark:bg-[#26313C] ml-2"
					>
						ESC
					</span>
					<span className="ml-2">{t("widgets.search.close")}</span>
					<span
						className="flex items-center justify-center p-1 h-5 rounded-md bg-[#F3F4F5] dark:bg-[#26313C] ml-2"
					>
						<EnterOutlined />
					</span>
					<span className="ml-2">{t("widgets.search.select")}</span>
				</div>
				<span>
					{t("widgets.search.total", {
						total: searchItems,
					})}
				</span>
			</div>
		</>
	);
}
