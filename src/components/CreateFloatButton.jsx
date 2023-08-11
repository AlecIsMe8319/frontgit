import React from 'react';
import { FloatButton } from 'antd';
import { FileTextOutlined, HomeOutlined } from '@ant-design/icons';


function CreateFloatButton({ onPageOpen }) {

    function doCallTodo() {
        onPageOpen("todo");
    }
    function doCallDone() {
        onPageOpen("done");
    }
    function doCallPortal() {
        onPageOpen("portal");
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
                icon={<HomeOutlined />}
                description="Home"
                shape="square"
                onClick={doCallPortal}>
            </FloatButton>
        </FloatButton.Group>
    )

}

export default CreateFloatButton;