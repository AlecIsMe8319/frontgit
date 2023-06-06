import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Table } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ToDoOverTime() {
    const upperLeavel = useLocation().state.record;
    const [form] = Form.useForm();
    const [rejectList, setRejectList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [doConfirmVisable, setDoConfirmVisable] = useState(false);
    const [doRejectVisable, setDoRejectVisable] = useState(false);
    const [state] = useState({
        processnumber: upperLeavel.processnumber,
        requestname: upperLeavel.requestname,
        requestid: upperLeavel.requestid,
    });

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        type: "radio",
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const rejectColumns = [
        {
            title: '節點名稱',
            dataIndex: 'nodename',
            key: 'nodename',
        },
        {
            title: '操作者',
            dataIndex: 'lastname',
            key: 'lastname',
            render: (_, record) => record.user.map((user) => user.lastname).join(', '),
        },
    ];

    const data = [
        {
            "nodename": "創建",
            "key": "0",
            "user": [
                {
                    "userid": "29",
                    "lastname": "Rogers"
                }
            ]
        },
        {
            "nodename": "項目負責人",
            "key": "1",
            "user": [
                {
                    "userid": "1381",
                    "lastname": "OA_OP3"
                },
                {
                    "userid": "1411",
                    "lastname": "OAteam"
                },
                {
                    "userid": "2153",
                    "lastname": "OA_OP4"
                },
            ]
        }
    ]

    function doConfirm() {
        setDoConfirmVisable(true);
    }
    function handleConfirmOk() {
        setDoConfirmVisable(false);
    }

    function handleConfirmCancel() {
        setDoConfirmVisable(false);
    }
    function doReject() {
        setDoRejectVisable(true);
    }

    function handleRejectOk() {
        setDoRejectVisable(false);
    }

    function handleRejectCancel() {
        setDoRejectVisable(false);
    }

    useEffect(() => {
        //暫時，調欄位資料api開放後改為放api
        document.getElementById("requestname").value = state.requestname;
        document.getElementById("processnumber").value = state.processnumber;

        // 退回api
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8082/api/workflow/getRejectList',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "tgId": "5173339107",
                "requestId": state.requestid,
            })
        };
        axios.request(config)
            .then((response) => {
                const resultId = response.data.result;
                setRejectList(
                    resultId.map(row => ({
                        tonodeid: row.tonodeid,
                    })))
            })
            .catch((error) => {
                alert(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="content">
            <div>
                <Link to="/todo">
                    <LeftOutlined />
                </Link>
            </div>
            <Form form={form}>
                <Form.Item label="流程標題">
                    <input type="text" id="requestname" name="requestname" disabled />
                </Form.Item>
                <Form.Item label="流程編號">
                    <input type="text" id="processnumber" name="processnumber" disabled />
                </Form.Item>
                加班待辦
                <div>
                    <Button onClick={doConfirm}>批准</Button>
                    <Button onClick={doReject}>退回</Button>
                </div>
                <div>
                    <Modal
                        open={doConfirmVisable}
                        title="批准"
                        onOk={handleConfirmOk}
                        onCancel={handleConfirmCancel}
                        footer={[
                            <Button key="back" onClick={handleConfirmCancel}>
                                Return
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleConfirmOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        是否批准通過
                    </Modal>
                    <Modal
                        open={doRejectVisable}
                        title="退回"
                        onOk={handleRejectOk}
                        onCancel={handleRejectCancel}
                        footer={[
                            <Button key="back" onClick={handleRejectCancel}>
                                Return
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleRejectOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Table
                            rowSelection={rowSelection}
                            columns={rejectColumns}
                            dataSource={data}
                        />
                    </Modal>
                </div>
            </Form>

        </div>
    );
};
