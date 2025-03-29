import { BasicContent, FormAvatarItem } from "#src/components";
import { useUserStore } from "#src/store";

import {
	ProForm,
	ProFormDigit,
	ProFormText,
	ProFormTextArea,
} from "@ant-design/pro-components";
import { Form, Input } from "antd";

export default function Profile() {
	const currentUser = useUserStore();
	const getAvatarURL = () => {
		if (currentUser) {
			if (currentUser.avatar) {
				return currentUser.avatar;
			}
			const url = "https://avatar.vercel.sh/blur.svg?text=2";
			return url;
		}
		return "";
	};

	const handleFinish = async () => {
		window.$message?.success("更新基本信息成功");
	};

	return (
		<BasicContent className="max-w-md ml-10">
			<h3>我的资料</h3>
			<ProForm
				layout="vertical"
				onFinish={handleFinish}
				initialValues={{
					...currentUser,
					avatar: getAvatarURL(),
				}}
				requiredMark
			>
				<Form.Item
					name="avatar"
					label="头像"
					rules={[
						{
							required: true,
							message: "请输入您的昵称!",
						},
					]}
				>
					<FormAvatarItem />
				</Form.Item>
				<ProFormText
					name="username"
					label="用户名"
					rules={[
						{
							required: true,
							message: "请输入您的用户名!",
						},
					]}
				/>
				<ProFormText
					name="email"
					label="邮箱"
					rules={[
						{
							required: true,
							message: "请输入您的邮箱!",
						},
					]}
				/>
				<ProFormDigit
					name="phoneNumber"
					label="联系电话"
					rules={[
						{
							required: true,
							message: "请输入您的联系电话!",
						},
					]}
				>
					<Input type="tel" allowClear />
				</ProFormDigit>
				<ProFormTextArea
					allowClear
					name="description"
					label="个人简介"
					placeholder="个人简介"
				/>
			</ProForm>
		</BasicContent>
	);
};
