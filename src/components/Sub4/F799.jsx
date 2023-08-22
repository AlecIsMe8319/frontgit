/* 申请测试金 */
import React, { useState } from "react";
import { useForm } from 'react-hook-form';

import "../../styles/flow.css";

function F799() {

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await sleep(2000);
        if (data.username === "bill") {
            alert(JSON.stringify(data));
        } else {
            alert("There is an error");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>申请测试金</h1>
            <label htmlFor="testtype">申请测式金类别</label>
            <select {...register("testtype")}>
                <option value=" "> </option>
                <option value="0">彩票测试金</option>
                <option value="1">三方场馆测试金</option>
            </select>

            <label htmlFor="testaccount">試玩帳號</label>
            <input placeholder="試玩帳號" {...register("testaccount")} />

            <label htmlFor="amount">金額</label>
            <input placeholder="金額" {...register("amount")} />

            <label htmlFor="note">備註</label>
            <input placeholder="備註" {...register("note")} />

            <label htmlFor="expected_total">預計累計金額</label>
            <input placeholder="預計累計金額" {...register("expected_total")} />

            <input type="submit" />
        </form>

    );
}

export default F799;