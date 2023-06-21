import React from "react";
import { Form } from "antd";
import { ArrowLeftOutlined, BulbOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const Leave = () => {
    const [form] = Form.useForm();
    return (
        <div className="Content" id="Content">
            <div id="Content-Header">
                <div className="icon" id="Content-Header-Arrow">
                    <Link to="/">
                        <ArrowLeftOutlined />
                    </Link>
                </div>
                <div id="Content-Header-Title">
                    <h3>請假</h3>
                </div>
                <div className="icon" id="Content-Header-Bulb">
                    <BulbOutlined />
                </div>

            </div>
            <div id="Content-Body">
                <Form form={form}>
                    <Form.Item label="流程標題">
                        <input type="text" id="requestname" name="requestname" />
                    </Form.Item>
                    <Form.Item label="流程編號">
                        <input type="text" id="requestname" name="requestname" />
                    </Form.Item>
                    <div>
                        Leave
                    </div>
                </Form >
            </div>
        </div>
    );
};
export default Leave;