import { useEffect, useState } from "react";
import { Tabs, Table, Button, Pagination, message } from "antd";
import { API } from "../utils/config/axiosConfig";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

function Dashboard() {
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState("publish");
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [articles, setArticles] = useState([]);

    const fetchDataArticles = async () => {
        try {
            const resp = await API.get(
                `article?limit=${limit}&offset=${offset}&status=${selectedTab}`
            );
            const data = resp.data.data;
            setTotal(resp.data.total);
            setArticles(data);
        } catch (error) {
            console.log("err: ", error);
        }
    };

    useEffect(() => {
        fetchDataArticles();
    }, [limit, offset, selectedTab]);

    const columns = [
        {
            title: "No.",
            dataIndex: "number",
            key: "number",
            render: (_text, _record, index) => offset + index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Button
                        onClick={() => editArticle(record)}
                        className="me-2"
                    >
                        Edit
                    </Button>
                    {selectedTab === "publish" && (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => moveToDraft(record)}
                                className="me-2"
                            >
                                Draft
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => moveToTrash(record)}
                                className="me-2"
                            >
                                Trash
                            </Button>
                        </span>
                    )}
                    {selectedTab === "draft" && (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => moveToPublish(record)}
                                className="me-2"
                            >
                                Publish
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => moveToTrash(record)}
                                className="me-2"
                            >
                                Trash
                            </Button>
                        </span>
                    )}
                    {selectedTab === "trash" && (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => moveToPublish(record)}
                                className="me-2"
                            >
                                Publish
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => deletePermanent(record)}
                                className="me-2"
                            >
                                Delete Permanent
                            </Button>
                        </span>
                    )}
                </span>
            ),
        },
    ];

    const editArticle = (record) => {
        navigate(`edit-article/${record.id}`)
    };

    const moveToTrash = async (record) => {
        let idRec = record.id;
        console.log("idRec Trash: ", idRec);
        try {
            const resp = await API.put(`article/${idRec}`, { status: "trash" });
            if (resp.status === 200) {
                message.success("Article moved to trash successfully!");
                fetchDataArticles();
            }
        } catch (error) {
            console.error("Error moving article to trash:", error);
            message.error("Failed to move article to trash.");
        }
    };

    const moveToPublish = async (record) => {
        let idRec = record.id;
        console.log("idRec Publish: ", idRec);
        try {
            const resp = await API.put(`article/${idRec}`, {
                status: "publish",
            });
            if (resp.status === 200) {
                message.success("Article moved to publish successfully!");

                fetchDataArticles();
            }
        } catch (error) {
            console.error("Error moving article to publish:", error);
            message.error("Failed to move article to publish.");
        }
    };

    const moveToDraft = async (record) => {
        let idRec = record.id;
        console.log("idRec Draft: ", idRec);
        try {
            const resp = await API.put(`article/${idRec}`, {
                status: "draft",
            });
            if (resp.status === 200) {
                message.success("Article moved to draft successfully!");

                fetchDataArticles();
            }
        } catch (error) {
            console.error("Error moving article to draft:", error);
            message.error("Failed to move article to draft.");
        }
    };

    const deletePermanent = async (record) => {
        let idRec = record.id;
        console.log("idRec Delete: ", idRec);
        try {
            const resp = await API.delete(`article/${idRec}`);
            if (resp.status === 200) {
                message.success("Article deleted successfully!");

                fetchDataArticles();
            }
        } catch (error) {
            console.error("Error deleted article:", error);
            message.error("Failed deleted article.");
        }
    };

    const handleTabChange = (key) => {
        if (key !== selectedTab) {
            setSelectedTab(key);
            setOffset(0);
        }
    };

    const handlePaginationChange = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };

    const handleAddArticle = (e) => {
        e.preventDefault();
        navigate("add-article");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>
            <div>
                <Button type="primary" onClick={handleAddArticle}>
                    Add Article
                </Button>
            </div>
            <Tabs defaultActiveKey="published" onChange={handleTabChange}>
                <TabPane tab="Published" key="publish">
                    <Table
                        dataSource={articles}
                        columns={columns}
                        pagination={false}
                    />
                </TabPane>
                <TabPane tab="Drafts" key="draft">
                    <Table
                        dataSource={articles}
                        columns={columns}
                        pagination={false}
                    />
                </TabPane>
                <TabPane tab="Trashed" key="trash">
                    <Table
                        dataSource={articles}
                        columns={columns}
                        pagination={false}
                    />
                </TabPane>
            </Tabs>
            <Pagination
                current={offset / limit + 1}
                pageSize={limit}
                total={total}
                onChange={handlePaginationChange}
                showSizeChanger
                onShowSizeChange={handlePaginationChange}
                className="my-4 float-end"
            />
        </div>
    );
}

export default Dashboard;
