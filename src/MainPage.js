import React from "react";
import CreateFloatButton from "./components/CreateFloatButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Done from "./pages/Done";
import Todo from "./pages/Todo";
import Enter from "./pages/Enter";
import NoPage from "./pages/NoPage";
import IdContext from "./utils/IdContext";
import F323 from "./components/Sub1/F323";
import F709 from "./components/Sub1/F709";
import F799 from "./components/Sub4/F799";
import F810 from "./components/Sub4/F810";
import F819 from "./components/Sub4/F819";

function MainPage() {
    const tgId = "5173339107";
    return (
        <div className="container">
            <BrowserRouter>
                <IdContext.Provider value={tgId}>
                    <CreateFloatButton />
                    <Routes>
                        <Route path="/" element={<Enter />} />
                        <Route path="create" element={<Create />} />
                        <Route path="todo" element={<Todo />} />
                        <Route path="done" element={<Done />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="f323" element={<F323 />} />
                        <Route path="f709" element={<F709 />} />
                        <Route path="f799" element={<F799 />} />
                        <Route path="f810" element={<F810 />} />
                        <Route path="f819" element={<F819 />} />
                    </Routes>
                </IdContext.Provider>
            </BrowserRouter>
        </div>
    )
}


export default MainPage;