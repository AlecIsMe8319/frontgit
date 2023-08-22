import React, { useState } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
function Create() {
    function getItem(label, key, children, type) {
        return {
            key,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('人事管理类', 'sub1', [
            getItem('01.请假申请流程', '709'),
            getItem('02.加班申请流程', '323'),
        ]),
        getItem('财务管理类', 'sub2', [

        ]),
        getItem('市场采购类', 'sub3', [

        ]),
        getItem('运营业务流程', 'sub4', [
            getItem('01.申请测试金', '799'),
            getItem('02.申请冻结/解冻用户', '810'),
            getItem('03.申请调整玩家场馆限红', '819'),
        ]),
    ];

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

    const [openKeys, setOpenKeys] = useState(['sub4']);
    const navigate = useNavigate();
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const onClickPage = ({ key }) => {
        navigate("/f" + key);

    }
    return (
        <div id="create">
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={onClickPage}
                items={items}
            />
        </div>
    );
};
export default Create;