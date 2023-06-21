import React from 'react';
import { ArrowLeftOutlined, BulbOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';


export default function Done() {

    return (
        <div className="Content" id="Content">
            <div id="Content-Header">
                <div className="icon" id="Content-Header-Arrow">
                    <Link to="/">
                        <ArrowLeftOutlined />
                    </Link>
                </div>
                <div id="Content-Header-Title">
                    <h3>已辦事項</h3>
                </div>
                <div className="icon" id="Content-Header-Bulb">
                    <BulbOutlined />
                </div>
            </div>
            <div id="Content-Body">
                施工中
            </div>
        </div >
    );
};
