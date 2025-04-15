import type { TabItemProps } from "#src/store";
import type { DragEndEvent } from "@dnd-kit/core";
import type { MenuProps, TabsProps } from "antd";
import { useTabsStore } from "#src/store";
import { closestCenter, DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Dropdown } from "antd";
import { cloneElement } from "react";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLElement> {
	"data-node-key": string
	"children": React.ReactElement
}

export function DraggableTabNode({ className, children, ...props }: DraggableTabPaneProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: props["data-node-key"],
		// transition: null,
	});

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Translate.toString({ x: transform?.x || 0, y: 0, scaleX: 1, scaleY: 1 }),
		transition,
		cursor: isDragging ? "move" : "pointer",
	};

	return cloneElement(children, {
		ref: setNodeRef,
		...props,
		style,
		className,
		...attributes,
		...listeners,
		// draggable: "true",
	});
}
interface DraggableTabBarProps {
	tabBarProps: Parameters<Required<TabsProps>["renderTabBar"]>[0]
	DefaultTabBar: Parameters<Required<TabsProps>["renderTabBar"]>[1]
	tabItems: TabItemProps[]
	items: (tabKey: string) => MenuProps["items"]
	onClickMenu: (menuKey: string, nodeKey: string) => void
}

export function DraggableTabBar({ tabBarProps, DefaultTabBar, tabItems, items, onClickMenu }: DraggableTabBarProps) {
	// activationConstraint 设置拖拽传感器，激活条件为指针移动至少 5 像素
	const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 5 } });
	const changeTabOrder = useTabsStore(state => state.changeTabOrder);

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			changeTabOrder(active?.data?.current?.sortable?.index, over?.data?.current?.sortable?.index);
		}
	};

	return (
		<DndContext
			sensors={[sensor]}
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
		>
			<SortableContext
				items={tabItems.map(i => i.key)}
				strategy={horizontalListSortingStrategy}
			>
				<DefaultTabBar {...tabBarProps}>
					{(node) => {
						return (
							<Dropdown
								key={node.key}
								menu={{
									items: items(node.key!),
									onClick: ({ key: menuKey }) => onClickMenu(menuKey, node.key!),
								}}
								trigger={["contextMenu"]}
							>
								{tabItems.some(tabItem => tabItem.key === node.key && tabItem.draggable === false) ? node : <DraggableTabNode {...node.props}>{node}</DraggableTabNode>}
							</Dropdown>
						);
					}}
				</DefaultTabBar>
			</SortableContext>
		</DndContext>
	);
}
