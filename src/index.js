import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NoPage from "./pages/nopage";
import TestMoney from "./pages/testmoney/testmoney";
import Todo from './pages/todo';
import Done from './pages/done';
import Leave from './pages/leave/leave';
import ToDoTestMoney from './pages/testmoney/todo-testmoney';
import ToDoLeave from './pages/leave/todo-leave';
import ToDoOverTime from './pages/overtime/todo-overtime';

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                    {/* 待辦已辦 */}
                    <Route path="todo" element={<Todo />} />
                    <Route path="done" element={<Done />} />

                    {/* 新建流程 */}
                    <Route path="testmoney" element={<TestMoney />} />
                    <Route path="leave" element={<Leave />} />

                    {/* 審批流程 */}
                    <Route path="todo/323" element={<ToDoOverTime />} />
                    <Route path="todo/709" element={<ToDoLeave />} />
                    <Route path="todo/799" element={<ToDoTestMoney />} />
                    {/* </Route> */}

                    {/* 測試開發用 */}
                    <Route path="todo/todotestmoney" element={<ToDoTestMoney />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);