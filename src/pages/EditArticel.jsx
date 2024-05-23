import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../utils/config/axiosConfig";

const { Option } = Select;

function EditArticel() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);

    const fetchArticle = async () => {
        try {
            const response = await API.get(`article/${id}`);
            setArticle(response.data);
        } catch (error) {
            console.error("Error fetching article:", error);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await API.put(`article/${id}`, values);
            message.success("Article updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error updating article:", error);
            message.error("Failed to update article. Please try again later.");
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSave = (status) => {
        form.setFieldsValue({ status });
        form.submit();
    };
    return (
        <div className="p-4">
            <h1>Edit Article</h1>
            {article && (
                <Form
                    form={form}
                    name="edit-article-form"
                    initialValues={{
                        title: article.title,
                        content: article.content,
                        category: article.category,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input the title!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: "Please input the content!",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Please select the category!",
                            },
                        ]}
                    >
                        <Select>
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
                        <Button onClick={handleCancel} className="me-2">
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={() => handleSave("publish")}
                            className="me-2"
                        >
                            Publish
                        </Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={() => handleSave("draft")}
                        >
                            Save as Draft
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
}

export default EditArticel;
