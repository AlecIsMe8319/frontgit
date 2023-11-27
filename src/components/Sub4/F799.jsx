/* 申请测试金 */
import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import IdContext from "../../utils/IdContext";
import "../../styles/flow.css";
import SubmitAPI from "../../api/SubmitAPI";

function F799() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const tgId = useContext(IdContext);
    const apiId = "create_test_money";
    const { register, handleSubmit } = useForm({
        defaultValues: {
            tgId: tgId,
        }
    });

    const onSubmit = async (formData) => {
        setIsSubmit(true);
        setSubmitMessage("正在提交...");
        try {
            let response = await SubmitAPI(formData, apiId);
            setSubmitMessage(response);
        } catch (error) {
            setSubmitMessage("提交失败: " + (error.response?.data?.message || error.message));
        }
        setIsSubmit(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <h1>申请测试金</h1>
            <label htmlFor="type">申请测式金类别</label>
            <select id="type" {...register("type")} disabled={isSubmit}>
                <option value=" "> </option>
                <option value="0">彩票测试金</option>
                <option value="1">三方场馆测试金</option>
            </select>

            <label htmlFor="account">試玩帳號</label>
            <input id="account" placeholder="試玩帳號" {...register("account")} disabled={isSubmit} />

            <label htmlFor="price">金額</label>
            <input id="price" placeholder="金額" {...register("price")} disabled={isSubmit} />

            <label htmlFor="remark">備註</label>
            <input id="remark" placeholder="備註" {...register("remark")} disabled={isSubmit} />

            <label htmlFor="expected_total">預計累計金額</label>
            <input id="expected_total" placeholder="預計累計金額" disabled={true} />
            <div id="submitmessage">
                {submitMessage}
            </div>
            <input type="submit" disabled={isSubmit} />

        </form>

    )
}


export default F799;