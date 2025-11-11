import type { MenuItemType } from "#src/layout/layout-menu/types";
import type { InputRef } from "antd";

import { Scrollbar } from "#src/components/scrollbar";
import { useDeviceType } from "#src/hooks/use-device-type";
import { useAccessStore } from "#src/store/access";
import { isString } from "#src/utils/is";

import { SearchOutlined } from "@ant-design/icons";
import { useDebounceFn, useKeyPress, useLocalStorageState } from "ahooks";
import { Divider, Empty, Input, Modal } from "antd";
import { match } from "pinyin-pro";
import { isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { SearchFooter } from "./components/search-footer";
import { SearchPanel } from "./components/search-panel";

/**
 * @zh 偏平化可跳转的菜单项
 * @en Flat menu item that can be jumped
 */
function transformMenuToFlatMenu(menus: MenuItemType[], flatMap: MenuItemType[] = []) {
	if (menus && menus.length === 0)
		return [];
	return menus.reduce((acc, cur) => {
		if (!cur.children) {
			acc.push(cur);
		}
		if (cur.children && cur.children.length > 0) {
			transformMenuToFlatMenu(cur.children, flatMap);
		}
		return acc;
	}, flatMap);
}

const searchHistoryLocalStorageKey = `__search-history-${location.hostname}__`;

export function GlobalSearch() {
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const { isMobile } = useDeviceType();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");
	const [activeKey, setActiveKey] = useState("");
	const [resultOptions, setResultOptions] = useState<MenuItemType[]>([]);
	const { t } = useTranslation();
	const inputRef = useRef<InputRef>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const [searchHistory = [], setSearchHistory] = useLocalStorageState<string[]>(searchHistoryLocalStorageKey, {
		defaultValue: [],
	});

	const searchMenuList = useMemo(() => transformMenuToFlatMenu(wholeMenus), [wholeMenus]);

	function onClose() {
		setOpen(false);
	}

	function handleClose() {
		onClose();
		setResultOptions([]);
		setKeyword("");
		setActiveKey("");
	}

	/**
	 * @zh 将指定索引的元素滚动到视图中
	 * @en Scroll the specified index element into view
	 */
	function scrollSelectedIntoView(index: number) {
		if (listRef.current) {
			const item = listRef.current.children[index] as HTMLElement;
			item?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}

	/**
	 * @zh 从搜索历史中移除指定的记录
	 * @en Remove the specified record from search history
	 */
	function removeHistoryItem(key: string) {
		setSearchHistory(prev => prev!.filter(item => item !== key));
	}

	function getActivePathIndex() {
		return resultOptions.findIndex(item => item.key === activeKey);
	}

	function handleKeyPress(direction: 1 | -1) {
		const { length } = resultOptions;
		if (length === 0)
			return;

		const index = getActivePathIndex();
		if (index === -1)
			return;

		const activeIndex = (index + direction + length) % length; // 确保 index 在范围内循环
		const activeNameKey = resultOptions[activeIndex].key;

		setActiveKey(activeNameKey);
		scrollSelectedIntoView(activeIndex);
	}

	const { run: setSearch } = useDebounceFn((e) => {
		const inputValue = e.target.value?.trim()?.toLocaleLowerCase();
		if (!inputValue) {
			setResultOptions([]);
			setActiveKey("");
			return;
		}
		const matchRoutes = searchMenuList.filter((menuItem) => {
			let labelText = "";
			if (isValidElement(menuItem.label)) {
				labelText = menuItem.label.props.children;
			}
			if (isString(menuItem.label)) {
				labelText = menuItem.label;
			}
			const translatedLowerCaseLabel = t(labelText)?.toLocaleLowerCase();
			const containsInputValue = translatedLowerCaseLabel?.includes(inputValue);

			return containsInputValue || match(translatedLowerCaseLabel, inputValue);
		});
		const activeName = matchRoutes[0]?.key ?? "";
		setActiveKey(activeName);
		setResultOptions(matchRoutes);
	}, { wait: 100 });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value?.trim();
		setKeyword(inputValue);
	};

	/** key up */
	function handleUp() {
		handleKeyPress(-1); // 方向 -1 表示向上
	}

	/** key down */
	function handleDown() {
		handleKeyPress(1); // 方向 1 表示向下
	}

	/**
	 * @zh 快捷键打开搜索面板
	 * @en Shortcut key to open the search panel
	 */
	useKeyPress(["meta.K"], () => {
		if (!open) {
			setOpen(true);
		}
	});

	/** key enter */
	function handleEnter(isExternalLink?: boolean) {
		if (resultOptions.length === 0 || activeKey === "")
			return;
		if (!searchHistory?.includes(activeKey)) {
			setSearchHistory([...(searchHistory ?? []), activeKey]);
		}
		handleClose();
		if (isExternalLink) {
			window.open(activeKey);
		}
		else {
			navigate(activeKey);
		}
	}

	useKeyPress("Escape", handleClose);
	useKeyPress("Enter", () => handleEnter());
	useKeyPress("uparrow", handleUp);
	useKeyPress("downarrow", handleDown);

	useEffect(() => {
		if (!keyword.length && Array.isArray(searchHistory)) {
			setResultOptions(searchMenuList.filter(item => searchHistory?.includes(item.key)));
		}
	}, [keyword, searchHistory]);

	return (
		<>
			<div
				onClick={() => setOpen(open => !open)}
				className="group flex justify-center items-center gap-2 md:bg-colorBgLayout px-3 py-1.5 rounded-full cursor-pointer text-colorTextSecondary hover:text-colorText md:mr-2.5"
			>
				<SearchOutlined />
				<span className="hidden text-xs duration-300 md:block">
					{t("common.search")}
				</span>
				<span className="bg-colorBgContainer relative hidden rounded-sm rounded-r-xl px-1.5 py-1 text-xs leading-none group-hover:opacity-100 md:block">
					&#x2318;
					<kbd>K</kbd>
				</span>
			</div>

			<Modal
				open={open}
				onCancel={() => handleClose()}
				afterOpenChange={(open) => {
					if (open) {
						inputRef.current?.focus();
					}
				}}
				keyboard
				title={(
					<div>
						<Input
							ref={inputRef}
							value={keyword}
							onChange={handleChange}
							onInput={setSearch}
							variant="outlined"
							placeholder={t("widgets.search.placeholder")}
							allowClear
							autoFocus
							prefix={<SearchOutlined />}
							className="mx-4 w-4/5 md:w-[88%] mt-4"
						/>
						<Divider className="my-4" />
					</div>
				)}
				footer={isMobile ? null : <SearchFooter searchItems={resultOptions.length} />}
				style={isMobile ? { margin: 0, maxWidth: "100%", top: 0, paddingBottom: 0 } : undefined}
				styles={{
					body: {
						flexGrow: "1",
						overflow: "hidden",
					},
					content: {
						padding: 0,
						height: isMobile ? "100vh" : undefined,
						display: isMobile ? "flex" : "block",
						flexDirection: isMobile ? "column" : "row",
					},
				}}
				width={isMobile ? "100%" : 580}
			>
				<Scrollbar style={{
					maxHeight: isMobile ? "100%" : "450px",
				}}
				>
					<ul
						className="px-4 pb-4 md:pb-0"
						ref={listRef}
					>
						{resultOptions.length === 0
							? (
								<Empty
									className="my-8"
									styles={{ image: { height: 40 } }}
									image={keyword.length ? <SearchOutlined className="text-colorTextTertiary" style={{ fontSize: 40 }} /> : Empty.PRESENTED_IMAGE_SIMPLE}
									description={keyword.length ? `${t("widgets.search.noResults")} ${JSON.stringify(keyword)}` : t("widgets.search.noRecent")}
								>
								</Empty>
							)
							: (
								resultOptions.map(item => (
									<SearchPanel
										key={item.key}
										active={item.key === activeKey}
										enter={handleEnter}
										removeHistoryItem={removeHistoryItem}
										setActiveKey={setActiveKey}
										menuItem={item}
										showCloseButton={keyword.length === 0}
									/>
								))
							)}
					</ul>
				</Scrollbar>
			</Modal>
		</>
	);
}
