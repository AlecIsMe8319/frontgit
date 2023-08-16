// import React, { useState, useEffect, useContext } from "react";
// import { LoadingOutlined } from "@ant-design/icons";
// import { useNavigate } from 'react-router-dom';
// import { Table, Card } from 'antd';
// import axios from "axios";
// import IdContext from "../utils/IdContext";

// function Todo() {
//     const [todoList, setTodoList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isMoreData, setIsMoreData] = useState(true);
//     const [isTrigger, setIsTrigger] = useState(false);  // 後續api開關 false則不可call todoapi ，頁面下滑到底時則更新為true。call api結束後更改回false
//     const [page, setPage] = useState(1);
//     const [prePage, setPrePage] = useState(2);
//     const tgId = useContext(IdContext);
//     let navigate = useNavigate();

//     // 實作更新api回傳資料
//     async function doCallTodoApi() {
//         let config = {
//             method: 'post',
//             url: 'http://127.0.0.1:8082/api/workflow/getTodoList',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: JSON.stringify({
//                 "tgId": tgId,
//                 "page": page
//             })
//         };
//         try {
//             const response = await axios.request(config);
//             const resultJson = response.data.result;
//             setTodoList(prevState => [
//                 ...prevState,
//                 ...resultJson.map(row => ({
//                     number: row.number,
//                     requestname: row.requestname,
//                     requestid: row.requestid,
//                     key: row.id,
//                     id: row.id,
//                     nodeid: row.nodeid,
//                     workflowid: row.workflowid,
//                 }))
//             ]);
//         } catch (error) {
//             alert(error);
//         }
//     }


//     // 純檢查page加一支api回傳內容是否為空
//     async function doCheckTodoApi() {
//         let config = {
//             method: 'post',
//             url: 'http://127.0.0.1:8082/api/workflow/getTodoList',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: JSON.stringify({
//                 "tgId": tgId,
//                 "page": prePage
//             })
//         };
//         try {
//             const response = await axios.request(config);
//             const resultJson = response.data.result;
//             if (resultJson.length > 0) {
//                 setIsMoreData(true);
//             } else {
//                 setIsMoreData(false);
//             }
//         } catch (error) {
//             alert(error);
//         }
//     }

//     const columns = [
//         {
//             title: "no",
//             dataIndex: "id",
//             key: "id"
//         },
//         {
//             title: "流程名稱",
//             dataIndex: "requestname",
//             key: "requestname"
//         },
//         {
//             title: "流程編號",
//             dataIndex: "number",
//             key: "number"
//         },
//         {
//             title: "流程ID",
//             dataIndex: "requestid",
//             key: "requestid"
//         },
//     ];

//     //preload
//     useEffect(() => {
//         if (loading) {
//             doCallTodoApi().then(() => {
//                 setLoading(false);
//                 doCheckTodoApi();
//             });
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     //載入更多資料
//     useEffect(() => {
//         if (isTrigger) {
//             console.log("get more data");
//             doCallTodoApi();
//             doCheckTodoApi();
//             setIsTrigger(false);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isTrigger]);

//     useEffect(() => {
//         const handleScroll = () => {
//             // 判斷畫面是否到底
//             if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isTrigger && isMoreData) {
//                 console.log("triggered get more data");
//                 setIsTrigger(true);
//                 setPage(prevPage1 => prevPage1 + 1);
//                 setPrePage(prevPage2 => prevPage2 + 1);
//             }
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isTrigger]);

//     return (
//         <div className="Content" id="Content">
//             <div id="Content-Body">
//                 {loading ? (
//                     <Card loading={true} />
//                 ) : (
//                     <Table
//                         dataSource={todoList}
//                         columns={columns}
//                         pagination={false}
//                         onRow={(record) => {
//                             return {
//                                 onClick: () => {
//                                     navigate('/todo/' + record.workflowid, { state: { record: record } });
//                                 }
//                             };
//                         }}
//                     />
//                 )}
//             </div>
//             <div id="Content-Foot">
//                 {isMoreData ? (
//                     <LoadingOutlined />
//                 ) : (
//                     <h5>已無更多資料</h5>
//                 )}
//             </div>
//         </div>
//     );
// };

function Todo() {
    return (
        <div>
            Todo
        </div>
    );
}


export default Todo;