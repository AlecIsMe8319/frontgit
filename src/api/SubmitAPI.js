import axios from 'axios';

async function SubmitAPI(data, apiId) {
    let url = "http://127.0.0.1:8082/api/workflow/" + apiId;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: data
    };
    console.log("sending api");
    try {
        let response = await axios.request(config);
        return response.data.resultCode;
    } catch (error) {
        console.error("Error submitting data:", error);
        return "提交失败: " + (error.response?.data?.message || error.message);
    }
};

export default SubmitAPI;