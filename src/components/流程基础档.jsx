/* 填入流程名称 */
import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import IdContext from "../../utils/IdContext";
import "../../styles/flow.css";
import SubmitAPI from "../../api/SubmitAPI";


function FXXX() { /* 填入流程前端代号 */
    const [isSubmit, setIsSubmit] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const tgId = useContext(IdContext);
    const apiId = ""; /* 填入Api名称 */
    const { register, handleSubmit } = useForm({
        defaultValues: {
            tgId: tgId,
        }
    });

    async function onSubmit(data) {
        setIsSubmit(true);
        try {
            const result = await SubmitAPI(data, apiId);
            console.log("return from FXXX " + result); /* 填入流程前端代号 */
            setSubmitMessage(result);
        } catch (error) {
            console.error("Error in onSubmit:", error);
            setSubmitMessage("发生未知错误。");
        }
    };

    return (
        /* 填入流程设定 */
        <form onSubmit={handleSubmit(onSubmit)} >


        </form>

    )
}


export default FXXX; /* 填入流程前端代号 */