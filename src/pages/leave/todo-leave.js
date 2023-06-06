import React from "react";
import { Form } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
// import axios from 'axios';

const TodoLeave = () => {
    const [form] = Form.useForm();
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
                <div>
                    Leave
                </div>
            </Form >
        </div>
    );
};
export default TodoLeave;