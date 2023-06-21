import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Modal, Table } from "antd";
import { ArrowLeftOutlined, BulbOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IdContext } from "../../index";

export default function ToDoOverTime() {
    let navigate = useNavigate();
    const [state] = useState({
        number: useLocation().state.record.number,
        requestname: useLocation().state.record.requestname,
        requestid: useLocation().state.record.requestid,
        nodeid: useLocation().state.record.nodeid,
    });
    const [form] = Form.useForm();
    const [rejectList, setRejectList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [doConfirmVisible, setDoConfirmVisible] = useState(false);
    const [doRejectVisible, setDoRejectVisible] = useState(false);
    const tgId = useContext(IdContext);
    const rejectColumns = [
        {
            title: '節點名稱',
            dataIndex: 'nodename',
            key: 'nodename',
        },
        {
            title: '操作者',
            dataIndex: 'user',
            key: 'user',
            render: (user) => {
                const names = user.map(u => u.lastname).join(', ');
                return names;
            },
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
                "tgId": tgId,
                "requestId": state.requestid,
                "workflowid": rejectList[selectedRowKeys[0]].workflowid,
                "nownodeid": state.nodeid,
                "tonodeid": rejectList[selectedRowKeys[0]].nodeid,
                "tonodename": rejectList[selectedRowKeys[0]].nodename,
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
                "tgId": tgId,
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
    }

    useEffect(() => {
        document.getElementById("requestname").value = state.requestname;
        document.getElementById("number").value = state.number;
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="Content" id="Content">
            <div id="Content-Header">
                <div className="icon" id="Content-Header-Arrow">
                    <Link to="/todo">
                        <ArrowLeftOutlined />
                    </Link>
                </div>
                <div id="Content-Header-Title">
                    <h3>加班申請流程</h3>
                </div>
                <div className="icon" id="Content-Header-Bulb">
                    <BulbOutlined />
                </div>
            </div>
            <div id="Content-Body">
                <Form form={form} className="form-container">
                    <Form.Item label="流程標題">
                        <input type="text" id="requestname" name="requestname" disabled />
                    </Form.Item>
                    <Form.Item label="流程編號">
                        <input type="text" id="number" name="number" disabled />
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
        </div>
    );
}