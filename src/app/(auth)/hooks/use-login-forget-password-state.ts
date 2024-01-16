import { todoAPI } from "@/services/todo-api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface IHandleForgetPasswordState {
    email: string       
}

export default function useLoginForgetPasswordState({
    email
}: IHandleForgetPasswordState){

    async function handleForgetPassword(){

        const promise = todoAPI.post('/forget-password',{
            email
        });

        await toast.promise(promise,{
            success:'Email de redefinição de senha enviado. Por favor, consulte seu email',
            error:{
                render({data}){

                    if( data instanceof AxiosError ){

                        return 'Verifique se seu email está correto'
                    }

                    return 'Não foi possível realizar esta requisição'

                }
            },
            pending:'Aguarde...'
        });

    }

    return {
        forgetPasswordHandler: handleForgetPassword
    }

}