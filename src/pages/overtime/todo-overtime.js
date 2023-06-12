import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Table } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ToDoOverTime() {
    let navigate = useNavigate();
    const [state] = useState({
        processnumber: useLocation().state.record.processnumber,
        requestname: useLocation().state.record.requestname,
        requestid: useLocation().state.record.requestid,
    });
    const [form] = Form.useForm();
    const [rejectList, setRejectList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [doConfirmVisible, setDoConfirmVisible] = useState(false);
    const [doRejectVisible, setDoRejectVisible] = useState(false);
    const [doApiCall, setDoApiCall] = useState(false);
    const rejectColumns = [
        {
            title: '節點名稱',
            dataIndex: 'tonodename',
            key: 'tonodename',
        },
        {
            title: '操作者',
            dataIndex: 'tousername',
            key: 'tousername',
        },
    ];

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        type: "radio",
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function doConfirm() {
        setDoConfirmVisible(true);
    }

    function handleConfirmOk() {
        setDoConfirmVisible(false);
    }

    function handleConfirmCancel() {
        setDoConfirmVisible(false);
    }

    function doReject() {
        setDoRejectVisible(true);
    }

    const handleRejectOk = async () => {
        const rejectConfig = {
            method: 'post',
            url: 'http://127.0.0.1:8082/api/workflow/doReject',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "tgId": "5173339107",
                "requestId": state.requestid,
                "workflowid": rejectList[selectedRowKeys[0]].workflowid,
                "nownodeid": rejectList[selectedRowKeys[0]].nownodeid,
                "tonodeid": rejectList[selectedRowKeys[0]].tonodeid,
                "tonodename": rejectList[selectedRowKeys[0]].tonodename,
                "receivedate": rejectList[selectedRowKeys[0]].receivedate,
                "receivetime": rejectList[selectedRowKeys[0]].receivetime,
            })
        }
        await axios.request(rejectConfig)
            .then((rejectResponse) => {
                console.log(JSON.stringify(rejectResponse.data.result));
            })
            .catch((error) => {
                alert(error);
            });
        navigate('/todo/');
    }

    function handleRejectCancel() {
        setDoRejectVisible(false);
        setSelectedRowKeys([]);
    }

    const fetchData = async () => {
        const config = {
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
        await axios.request(config)
            .then((response) => {
                const rawdata = response.data.result;
                const newData = rawdata.map((item, index) => {
                    return {
                        ...item,
                        key: index
                    };
                });
                setRejectList(newData);
            })
            .catch((error) => {
                alert(error);
            });
        setDoApiCall(true);
    }

    useEffect(() => {
        document.getElementById("requestname").value = state.requestname;
        document.getElementById("processnumber").value = state.processnumber;
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doApiCall])

    return (
        <div className="content">
            <div>
                <Link to="/todo">
                    <LeftOutlined />
                </Link>
            </div>
            <Form form={form} className="form-container">
                <Form.Item label="流程標題">
                    <input type="text" id="requestname" name="requestname" disabled />
                </Form.Item>
                <Form.Item label="流程編號">
                    <input type="text" id="processnumber" name="processnumber" disabled />
                </Form.Item>
                <div className="overtime-todo">
                    <Button onClick={doConfirm} className="action-button">批准</Button>
                    <Button onClick={doReject} className="action-button">退回</Button>
                </div>
                <div>
                    <Modal
                        open={doConfirmVisible}
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
                        open={doRejectVisible}
                        title="退回"
                        onOk={handleRejectOk}
                        onCancel={handleRejectCancel}
                        footer={[
                            <Button key="back" onClick={handleRejectCancel}>
                                Return
                            </Button>,
                            <Button key="submit" type="primary" id="rejectSubmit" onClick={handleRejectOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Table
                            rowSelection={rowSelection}
                            columns={rejectColumns}
                            dataSource={rejectList}
                        />
                    </Modal>
                </div>
            </Form>
        </div>
    );
}