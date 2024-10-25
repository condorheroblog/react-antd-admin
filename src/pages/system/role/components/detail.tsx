import {
	DrawerForm,
	ProFormRadio,
	ProFormText,
	ProFormTextArea,
} from "@ant-design/pro-components";
import { Form, message } from "antd";

interface DetailProps {
	children: React.ReactNode
	title: React.ReactNode
}

export function Detail({ children, title }: DetailProps) {
	const [form] = Form.useForm<{ name: string, company: string }>();

	return (
		<DrawerForm<{
			name: string
			company: string
		}>
			title={title}
			resize={{
				onResize() {
					// console.log('resize!');
				},
				maxWidth: window.innerWidth * 0.8,
				minWidth: 500,
			}}
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 24 }}
			layout="horizontal"
			form={form}
			trigger={<div className="trigger">{children}</div>}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: true,
			}}
			submitTimeout={2000}
			onFinish={async () => {
				// console.log(values.name);
				message.success("提交成功");
				// 不返回不会关闭弹框
				return true;
			}}
			initialValues={{
				status: "1",
			}}
		>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
						message: "请输入角色名称!",
					},
				]}
				width="md"
				name="name"
				label="角色名称"
				tooltip="最长为 24 位"
				placeholder="请输入角色名称"
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
						message: "请输入角色标识!",
					},
				]}
				width="md"
				name="code"
				label="角色标识"
				placeholder="请输入角色标识"
			/>

			<ProFormRadio.Group
				name="status"
				label="角色状态"
				radioType="button"
				options={[
					{
						label: "启用",
						value: "1",
					},
					{
						label: "停用",
						value: "0",
					},
				]}
			/>

			<ProFormTextArea
				allowClear
				width="md"
				name="remark"
				label="备注"
				placeholder="请输入备注"
			/>

		</DrawerForm>
	);
};
