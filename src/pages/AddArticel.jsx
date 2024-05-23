import { Form, Input, Button, Select, message } from "antd";
import { API } from "../utils/config/axiosConfig";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const AddArticel = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const resp = await API.post("article", values);
            console.log("Resp Save: ", resp)
            message.success("Article saved successfully!");
            form.resetFields();
            navigate("/");
        } catch (error) {
            console.error("Error saving article:", error);
            message.error("Failed to save article.");
        }
    };

    const handleSave = (status) => {
        form.setFieldsValue({ status });
        form.submit();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/")
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Article</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        { required: true, message: "Please enter the title" },
                    ]}
                >
                    <Input placeholder="Enter the title" />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                        { required: true, message: "Please enter the content" },
                    ]}
                >
                    <TextArea rows={4} placeholder="Enter the content" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        { required: true, message: "Please select a category" },
                    ]}
                >
                    <Select placeholder="Select a category">
                        <Option value="Technology">Technology</Option>
                        <Option value="Health">Health</Option>
                        <Option value="Finance">Finance</Option>
                        <Option value="Natural">Natural</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="status" style={{ display: "none" }}>
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item>
                    <div className="flex space-x-2">
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => handleSave("publish")}
                        >
                            Publish
                        </Button>
                        <Button onClick={() => handleSave("draft")}>
                            Save as Draft
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddArticel;
