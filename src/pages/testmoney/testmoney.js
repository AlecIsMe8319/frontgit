import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestMoney = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    function createPost() {
        setLoading(true);
        const testtype = document.getElementById("testtype").value;
        const testaccount = document.getElementById("testaccount").value;
        const price = document.getElementById("amount").value;
        const note = document.getElementById("note").value;
        let data = JSON.stringify({
            //me
            // "tgId": "5173339107",

            //pie
            "tgId": "1026209521",
            "account": testaccount,
            "price": price,
            "remark": note,
            "type": testtype
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8082/api/workflow/create_test_money',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                setLoading(false);
                console.log(JSON.stringify(response.data));
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }

    return (
        <div className="content" >
            {loading ? (
                "Loading"
            ) : (
                <Form form={form} >
                    <div >
                        <Link to="/">
                            <LeftOutlined />
                        </Link>
                    </div>
                    <Form.Item label="申请测式金类别">
                        <select id="testtype" name="testtype">
                            <option value=" "></option>
                            <option value="0">彩票测试金</option>
                            <option value="1">三方场馆测试金</option>
                        </select>
                    </Form.Item>
                    <Form.Item label="試玩帳號">
                        <input type="text" id="testaccount" name="testaccount" />
                    </Form.Item>
                    <Form.Item label="金額">
                        <input type="text" id="amount" name="amount" />
                    </Form.Item>
                    <Form.Item label="備註">
                        <input type="text" id="note" name="note" />
                    </Form.Item>
                    <div >
                        <button onClick={createPost}>Submit</button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default TestMoney;
