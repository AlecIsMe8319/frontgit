import React, { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { Table } from "antd";
import axios from "axios";

export default function Todo() {
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8082/api/workflow/getTodoList',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "tgId": "5173339107",
                "page": 0
            })
        };
        axios.request(config)
            .then((response) => {
                const resultId = response.data.result;
                setLoading(false);
                setState(
                    resultId.map(row => ({
                        key: row.id,
                        id: row.id,
                        requestname: row.requestname,
                        workflowid: row.workflowid,
                        processnumber: row.number,
                        requestid: row.requestid,
                    }))
                );
            })
            .catch((error) => {
                alert(error);
            });

    }, []);

    const columns = [
        {
            title: "no",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "流程名稱",
            dataIndex: "requestname",
            key: "requestname"
        },
        {
            title: "流程編號",
            dataIndex: "processnumber",
            key: "processnumber"
        },
    ];

    return (
        <div className="Content" >
            <div>
                <Link to="/" >
                    <LeftOutlined />
                </Link>
            </div>

            {loading ? (
                "Loading"
            ) : (
                <Table
                    dataSource={state}
                    columns={columns}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                navigate('/todo/' + record.workflowid, { state: { record: record } });
                            }
                        };
                    }}
                />
            )}

        </div>
    );
};