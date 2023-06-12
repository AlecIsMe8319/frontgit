import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const Home = () => {
    let navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="button-container">
                <Button type="primary" onClick={() => navigate('/todo', { state: { record: 0 } })}>待辦事項</Button>
            </div>
            <div className="button-container">
                <Button type="primary" onClick={() => navigate('/testmoney', { state: { record: 0 } })}>申請測試金</Button>
            </div>
            <div className="button-container">
                <Button type="primary" onClick={() => navigate('/leave', { state: { record: 0 } })}>請假</Button>
            </div>
        </div>
    );
};

export default Home;