import { PlusOutlined } from "@ant-design/icons";
import { Form, message, Space, Typography, Upload, UploadProps } from "antd";
import { useState } from "react";

export const ProductImage = () => {
    const [imageUrl, setImageUrl] = useState<string | null>();

    const uploadConfig: UploadProps = {
        name: "file",
        multiple: false,
        showUploadList: false,
        beforeUpload: (file) => {
            const isJpgOrPng =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpeg";
            if (!isJpgOrPng) {
                message.error("You can only upload JPG/PNG/JPEG file!");
            }

            const isLt500K = file.size / 1024 < 500;
            if (!isLt500K) {
                message.error("Image must be smaller than 500KB!");
            }

            setImageUrl(URL.createObjectURL(file));
            return false;
        }
    };

    return (
        <Form.Item
            label=""
            name="image"
            rules={[
                {
                    required: true,
                    message: "Please upload a products image"
                }
            ]}
        >
            <Upload listType="picture-card" {...uploadConfig}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                ) : (
                    <Space direction="vertical">
                        <PlusOutlined />
                        <Typography.Text>Upload</Typography.Text>
                    </Space>
                )}
            </Upload>
        </Form.Item>
    );
};
