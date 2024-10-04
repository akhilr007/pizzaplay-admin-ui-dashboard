import { Modal, Typography } from "antd";

interface DeleteModalProps {
    isModalVisible: boolean;
    handleDelete: () => void;
    handleCancel: () => void;
    name: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    isModalVisible,
    handleCancel,
    handleDelete,
    name
}) => {
    return (
        <Modal
            title={
                <Typography.Title level={4}>Confirm Deletion</Typography.Title>
            }
            open={isModalVisible}
            onOk={handleDelete}
            onCancel={handleCancel}
            okText="Yes, Delete"
            cancelText="Cancel"
            width={800}
            centered
            bodyStyle={{
                fontSize: "18px",
                padding: "24px"
            }}
            okButtonProps={{
                danger: true,
                size: "large"
            }}
            cancelButtonProps={{
                size: "large"
            }}
        >
            <Typography.Paragraph style={{ fontSize: "18px" }}>
                Are you sure you want to delete this {name}? This action cannot
                be undone.
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary" style={{ fontSize: "16px" }}>
                All associated data will be permanently removed from the system.
            </Typography.Paragraph>
        </Modal>
    );
};
