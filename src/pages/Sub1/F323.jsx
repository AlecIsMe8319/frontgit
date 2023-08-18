/* 加班申請流程 */
import React, { useState } from "react";
import { CloseOutlined } from '@ant-design/icons';


function F323({ openFlowPage }) {

    /*使flow頁面XX按鈕開始 */
    const [flowPage] = useState("create");
    function closeButtonClick() {
        openFlowPage(flowPage);
    }
    /*使flow頁面XX按鈕結束 */

    return (
        <div>
            <div>
                <button className="closeButton" onClick={closeButtonClick}>
                    <CloseOutlined />
                </button>

                加班申請流程
            </div>

        </div>

    );
}

export default F323;