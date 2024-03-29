import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { todoAPI } from "@/services/todo-api";
import { AxiosError } from "axios";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function useLoginState(){

    const route = useRouter();

    const loginSchema = yup.object().shape({
        email: yup.string().required("Informe seu email"),
        password: yup.string().required("Informe sua senha")
    });

    const loginForm = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validateOnBlur:false,
        validationSchema: loginSchema,
        async onSubmit(values) {

            const promise = todoAPI.post('/auth',{
                ...values
            });

            await toast.promise(promise,{
                success:{
                    render({ data }){

                        localStorage.setItem("@AUTH_TOKEN",JSON.stringify(data.data));;

                        document.cookie = `JWT=${data.data.acessToken}`;

                        route.push('/todos');

                        return `Bem-Vindo, ${data.data.user.username}`


                    },
                },
                error:{
                    render({data}) {
                        
                        if( data instanceof AxiosError ){

                            return data.response?.data.message;

                        }

                    },
                },
                pending:'Autenticando...'
            })
        
        },
    })

    const [ showRegisterModal, setShowRegisterModal ] = useState(false);

    function handleOnClickRegister(){

        setShowRegisterModal(true)

    }

    function handleCloseRegisterModal(){

        setShowRegisterModal(false);

    }

    function submitForm(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        loginForm.submitForm();

    }

    return {
        onClickRegisterHandler: handleOnClickRegister,
        onCloseRegisterHandler: handleCloseRegisterModal,
        showModal:{
            getter: showRegisterModal,
            setter: setShowRegisterModal
        },
        loginForm:{
            getter: loginForm,
        },
        submitForm
    }

}