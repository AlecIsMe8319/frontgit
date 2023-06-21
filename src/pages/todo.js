import React, { useState, useEffect, useContext } from "react";
import { ArrowLeftOutlined, BulbOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { Table, Card } from 'antd';
import axios from "axios";
import { IdContext } from "..";

export default function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMoreData, setLoadingMoreData] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isTriggerEvent, setIsTriggerEvent] = useState(false);

    const [page, setPage] = useState(1);
    const tgId = useContext(IdContext);
    let navigate = useNavigate();

    function doCallTodoApi() {
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8082/api/workflow/getTodoList',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "tgId": tgId,
                "page": page
            })
        };
        return axios.request(config)
            .then((response) => {
                const resultJson = response.data.result;
                setTodoList(prevState => [
                    ...prevState,
                    ...resultJson.map(row => ({
                        number: row.number,
                        requestname: row.requestname,
                        requestid: row.requestid,
                        key: row.id,
                        id: row.id,
                        nodeid: row.nodeid,
                        workflowid: row.workflowid,
                    }))
                ]);
            })
            .catch((error) => {
                alert(error);
            });
    }

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
            dataIndex: "number",
            key: "number"
        },
        {
            title: "流程ID",
            dataIndex: "requestid",
            key: "requestid"
        },
    ];

    window.addEventListener("scroll", function () {
        var contentFoot = document.getElementById('Content-Foot');
        if (isElementInViewport(contentFoot)) {
            if (!isTriggerEvent) {
                setIsTriggerEvent(true);
                setPage(prevPage => prevPage + 1);
            }
        }
    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    useEffect(() => {
        if (loading) {
            doCallTodoApi().then(() => {
                if (page < 3) {
                    console.log("++")
                    setPage(prevPage => prevPage + 1);
                } else {
                    setLoading(false);
                }
            });
        }
    }, [page])

    return (
        <div className="Content" id="Content">
            <div id="Content-Header">
                <div className="icon" id="Content-Header-Arrow">
                    <Link to="/">
                        <ArrowLeftOutlined />
                    </Link>
                </div>
                <div id="Content-Header-Title">
                    <h3>待辦事項</h3>
                </div>
                <div className="icon" id="Content-Header-Bulb">
                    <BulbOutlined />
                </div>
            </div>
            <div id="Content-Body">
                {loading ? (
                    <Card loading={true} />
                ) : (
                    <Table
                        dataSource={todoList}
                        columns={columns}
                        pagination={false}
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
            <div id="Content-Foot">
                {loadingMoreData ? (
                    <LoadingOutlined />
                ) : (
                    <h5>已無更多資料</h5>
                )}
            </div>
        </div>
    );
};
