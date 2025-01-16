import type { TreeDataNode } from "antd";

import { BasicButton, BasicContent } from "#src/components";
import { getAllExpandedKeys } from "#src/utils";

import { MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Tag, Tree } from "antd";
import { useState } from "react";

const treeData: TreeDataNode[] = [
	{
		title: "parent 1",
		key: "0-0",
		children: [
			{
				title: "parent 1-0",
				key: "0-0-0",
				disabled: true,
				children: [
					{
						title: "leaf",
						key: "0-0-0-0",
						disableCheckbox: true,
					},
					{
						title: "leaf",
						key: "0-0-0-1",
					},
				],
			},
			{
				title: "parent 1-1",
				key: "0-0-1",
				children: [{ title: <span style={{ color: "#1677ff" }}>sss</span>, key: "0-0-1-0" }],
			},
		],
	},
];
export default function Menu() {
	const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
	const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
	return (
		<BasicContent className="h-full">
			<Card
				className="h-full [&_.ant-card-body]:h-full"
			>
				<div
					className="relative h-full w-full overflow-hidden border-r-[1px] border-r-gray-200 pr-5 lg:w-4/12"
				>
					<div className="flex gap-3 mb-4">
						<Input
							placeholder="搜索"
							className="flex-1"
							prefix={<SearchOutlined />}
						/>
						<Radio.Group
							onChange={(e) => {
								const value = e.target.value;
								if (value === "expand") {
									setExpandedKeys(getAllExpandedKeys(treeData, "key"));
								}
								else {
									setExpandedKeys([]);
								}
							}}
						>
							<Radio.Button value="expand">展开</Radio.Button>
							<Radio.Button value="collapse">折叠</Radio.Button>
						</Radio.Group>
					</div>
					<div className="flex flex-col gap-y-1">
						<Tree
							className="[&_.ant-tree-treenode-selected_.tree-actions]:flex"
							blockNode
							expandedKeys={expandedKeys}
							onExpand={(keys) => {
								setExpandedKeys(keys);
							}}
							selectedKeys={selectedKeys}
							onSelect={(keys) => {
								// console.log("onSelect", keys);
								setSelectedKeys(keys);
							}}
							titleRender={(node: any) => (
								<div className="group flex justify-between items-center">
									<span>{node.title}</span>
									<div className="tree-actions hidden group-hover:flex items-center gap-0.5">
										<Tag color="processing" className="mr-0 h-fit text-xs">菜单</Tag>
										<div>
											<BasicButton color="primary" variant="text" size="small" icon={<PlusCircleOutlined />} />
											<BasicButton danger type="text" size="small" icon={<MinusCircleOutlined />} />
										</div>
									</div>
								</div>
							)}
							// onSelect={onSelect}
							treeData={treeData}
						/>
					</div>

				</div>
			</Card>
		</BasicContent>
	);
}
