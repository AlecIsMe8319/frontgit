import React from 'react';
import { Card, Table } from 'antd';

const contentStyle = {
    margin: 0,
    height: '100px',
    color: '#fff',
    lineHeight: '100px',
    textAlign: 'center',
    background: '#364d79',
};
const columns = [
    {
        title: 'Index',
        width: 50,
        dataIndex: 'index',
        key: 'index',
        fixed: 'left',
    },
    {
        title: 'Full Name',
        width: 150,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
    },
    {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width: 150,
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        // render: () => <button onClick="action()">action</button>,
        // render: () => <a>action</a>

    },
];
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        index: i,
        key: i,
        name: `恋爱家教 Edward ${i}`,
        age: Math.floor(Math.random(100) * 100),
        address: `London Park no. ${i}`,
    });
}

const Done = () => {

    return (
        <div>
            <h3 style={contentStyle}>已办事项</h3>
            <Card title="已办事项" bordered={false} style={{ width: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{
                        x: 1500,
                        y: 300,
                    }}
                />
            </Card>
        </div>
    );
};

export default Done;