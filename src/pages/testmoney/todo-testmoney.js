import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';

export default function ToDoTestMoney() {
    const upperLeavel = useLocation().state.record;
    const [form] = Form.useForm();
    const [state] = useState({
        processnumber: upperLeavel.processnumber,
        requestname: upperLeavel.requestname,
        requestid: upperLeavel.requestid,
    });


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
                console.log(response.data.result[0].tonodeid);
            })
            .catch((error) => {
                alert(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { confirm } = Modal;
    const doConfirm = () => {

        confirm({
            title: '確認是否批准通過?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const doReject = () => {
        confirm({
            title: '確認是否退回',
            icon: <ExclamationCircleFilled />,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div className="content">
            <Form form={form}>
                <div>
                    <Link to="/todo">
                        <LeftOutlined />
                    </Link>
                </div>
                <Form.Item label="流程標題">
                    <input type="text" id="requestname" name="requestname" disabled />
                </Form.Item>
                <Form.Item label="流程編號">
                    <input type="text" id="processnumber" name="processnumber" disabled />
                </Form.Item>
                <Form.Item label="申请测式金类别" >
                    <select id="testtype" name="testtype" disabled>
                        <option value=" "></option>
                        <option value="0">彩票测试金</option>
                        <option value="1">三方场馆测试金</option>
                    </select>
                </Form.Item >
                <Form.Item label="試玩帳號">
                    <input type="text" id="testaccount" name="testaccount" disabled />
                </Form.Item>
                <Form.Item label="金額">
                    <input type="text" id="amount" name="amount" disabled />
                </Form.Item>
                <Form.Item label="備註">
                    <input type="text" id="note" name="note" disabled />
                </Form.Item>
                <div>
                    <Button onClick={doConfirm}>批准</Button>
                    <Button onClick={doReject}>退回</Button>
                </div>
            </Form>

        </div>
    );
};
