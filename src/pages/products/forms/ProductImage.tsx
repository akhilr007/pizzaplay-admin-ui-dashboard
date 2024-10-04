import { PlusOutlined } from "@ant-design/icons";
import { Form, message, Space, Typography, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";

interface ProductImageProps {
    initialImage?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ initialImage }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(
        initialImage || null
    );
    let objectUrl: string | null = null;

    useEffect(() => {
        // Update imageUrl when initialImage prop changes
        if (initialImage) {
            setImageUrl(initialImage);
        }
        return () => {
            // Revoke object URL when component unmounts or a new file is uploaded
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [initialImage, objectUrl]);

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
                return Upload.LIST_IGNORE;
            }

            const isLt500K = file.size / 1024 < 500;
            if (!isLt500K) {
                message.error("Image must be smaller than 500KB!");
                return Upload.LIST_IGNORE;
            }

            // Revoke the previous object URL to prevent memory leaks
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }

            // Create a new object URL for the file
            objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl);
            return false; // Prevent automatic upload
        }
    };

    return (
        <Form.Item
            valuePropName="avatar"
            label=""
            name="image"
            rules={[
                {
                    required: true,
                    message: "Please upload a product image"
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
