import React from 'react';
import { FloatButton } from 'antd';
import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';


function CreateFloatButton({ onPageOpen }) {

    function doCallTodo() {
        onPageOpen("todo");
    }
    function doCallDone() {
        onPageOpen("done");
    }
    function doCallCreate() {
        onPageOpen("create");
    }
    return (
        <FloatButton.Group>
            <FloatButton
                icon={<FileTextOutlined />}
                description="Todo"
                shape="square"
                badge={{ count: 12 }}
                onClick={doCallTodo}>
            </FloatButton>
            <FloatButton
                icon={<FileTextOutlined />}
                description="Done"
                shape="square"
                badge={{
                    color: "blue"
                }}
                onClick={doCallDone}>
            </FloatButton>
            <FloatButton
                icon={<PlusOutlined />}
                description="Create"
                shape="square"
                onClick={doCallCreate}>
            </FloatButton>
        </FloatButton.Group>
    )

}

export default CreateFloatButton;