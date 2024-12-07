import type { TreeDataNode } from "antd";

import { BasicButton, BasicContent } from "#src/components";

import { MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, Input, Radio, Tag, Tree } from "antd";

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
	return (
		<BasicContent className="h-full">
			<Card
				className="h-full [&_.ant-card-body]:h-full"
			>
				<div
					className="relative h-full w-full overflow-hidden border-r-[1px] border-r-gray-200 b-r-solid pr-5 lg:w-4/12"
				>
					<div className="flex gap-3 mb-2">
						<Input
							placeholder="搜索"
							className="flex-1"
							prefix={<SearchOutlined />}
						/>
						<Radio.Group defaultValue="a">
							<Radio.Button value="a">展开</Radio.Button>
							<Radio.Button value="d">折叠</Radio.Button>
						</Radio.Group>
					</div>
					<div className="flex flex-col gap-y-1">
						<Tree
							blockNode
							defaultExpandedKeys={["0-0-0", "0-0-1"]}
							defaultSelectedKeys={["0-0-0", "0-0-1"]}
							titleRender={(node: any) => (
								<div className="group flex justify-between items-center">
									<span>{node.title}</span>
									<div className="invisible group-hover:visible flex items-center gap-0.5">
										<Tag color="processing" className="mr-0 h-fit text-xs">菜单</Tag>
										<BasicButton color="primary" variant="text" size="middle" icon={<PlusCircleOutlined />} />
										<BasicButton danger type="text" size="middle" icon={<MinusCircleOutlined />} />
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
