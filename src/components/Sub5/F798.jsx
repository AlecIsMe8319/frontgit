/* 结算异常通报流程 */
import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import IdContext from "../../utils/IdContext";
import "../../styles/flow.css";
import SubmitAPI from "../../api/SubmitAPI";

function F798() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const tgId = useContext(IdContext);
    const apiId = "create_f798";
    const { register, handleSubmit } = useForm({
        defaultValues: {
            tgId: tgId,
        }
    });

    // Function call onSubmit that use formData to pass params and able to transfer multifile within react-form-hook
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
            <h1>结算异常通报流程</h1>
            <label htmlFor="abnormalkind">异常类别</label>
            <select id="abnormalkind" {...register("abnormalkind")} disabled={isSubmit}>
                <option value=" "> </option>
                <option value="1">充值异常</option>
                <option value="2">提现异常</option>
                <option value="3">渠道掉单(JS)</option>
                <option value="4">其他异常</option>
                <option value="5">结算判定特殊状况</option>
            </select>

            <label htmlFor="lcnpt">平台名称</label>
            <input id="lcnpt" placeholder="平台名称" {...register("lcnpt")} disabled={isSubmit} />

            <label htmlFor="customerapplydate">客户申请日期</label>
            <input id="customerapplydate" placeholder="客户申请日期" type="date" {...register("customerapplydate")} disabled={isSubmit} />

            <label htmlFor="customerid">用户名</label>
            <input id="customerid" placeholder="用户名" {...register("customerid")} disabled={isSubmit} />

            <label htmlFor="customername">付款人姓名</label>
            <input id="customername" placeholder="付款人姓名" {...register("customername")} disabled={isSubmit} />

            <label htmlFor="howtopay">付款方式</label>
            <select id="howtopay" {...register("howtopay")} disabled={isSubmit}>
                <option value=" "> </option>
                <option value="0">银行卡/支付宝/微信</option>
                <option value="1">虚拟货币</option>
            </select>

            <label htmlFor="hash">订单号</label>
            <input id="hash" placeholder="订单号" {...register("hash")} disabled={isSubmit} />

            <label htmlFor="hashCode">哈希码</label>
            <input id="hashCode" placeholder="哈希码"{...register("hashCode")} disabled={isSubmit} />

            <label htmlFor="coinType">币别</label>
            <select id="coinType" {...register("coinType")} disabled={isSubmit}>
                <option value=" "> </option>
                <option value="1">比索(PHP)</option>
                <option value="2">人民币(CNY)</option>
                <option value="3">台币(NTD)</option>
                <option value="4">美金(USD)</option>
                <option value="11">泰达币(USDT)</option>
            </select>

            <label htmlFor="amount">金额</label>
            <input id="amount" placeholder="金额" {...register("amount")} disabled={isSubmit} />

            <label htmlFor="attachment1" >附件/视频上传</label>
            <input id="attachment1" type="file" multiple {...register("attachment1")} disabled={isSubmit} />

            <label htmlFor="note">补充说明</label>
            <input id="note" placeholder="补充说明" {...register("note")} disabled={isSubmit} />

            <div id="submitmessage">
                {submitMessage}
            </div>
            <input type="submit" disabled={isSubmit} />

        </form>

    )
}


export default F798;