import { UploadOutlined } from "@ant-design/icons";

import { Avatar, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

interface FormAvatarItemProps {
	value?: string
	onChange?: (value: any) => void
}

export function FormAvatarItem({ value, onChange }: FormAvatarItemProps) {
	// const { t } = useTranslation();

	// const onSelect: TreeProps["onSelect"] = (selectedKeys) => {
	// 	onChange?.(selectedKeys);
	// };

	return (
		<>
			<div className="flex items-center gap-5">
				<Avatar size={100} src={value} />
				<ImgCrop
					rotationSlider
					aspectSlider
					showReset
					showGrid
					cropShape="rect"
				>
					<Upload
						accept="image/*"
						showUploadList={false}
						name="file"
						action={`${import.meta.env.VITE_API_BASE_URL}/upload`}
						headers={{
							authorization: "authorization-text",
						}}
						onChange={(info) => {
							// if (info.file.status !== 'uploading') {
							// 	console.log(info.file, info.fileList);
							// }
							if (info.file.status === "done") {
								window.$message?.success(`${info.file.name} file uploaded successfully`);
								onChange?.(info.file.response?.result);
							}
							else if (info.file.status === "error") {
								window.$message?.error(`${info.file.name} file upload failed.`);
							}
						}}
					>
						<Button icon={<UploadOutlined />}>
							更换头像
						</Button>
					</Upload>
				</ImgCrop>
			</div>
		</>
	);
}
