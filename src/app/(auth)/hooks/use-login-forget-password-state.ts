import { useState } from "react";
import { todoAPI } from "@/services/todo-api";
import { toast } from "react-toastify";

export default function useLoginForgetPasswordState(){

    async function handleForgetPassword(){

        const promise = todoAPI.post('/forget-password');

        await toast.promise(promise,{
            success:'Email de redefinição de senha enviado com sucesso',
            error:'Não foi possível enviar email',
            pending:'Aguarde...'
        });

    }

    return {
        forgetPasswordHandler: handleForgetPassword
    }

}