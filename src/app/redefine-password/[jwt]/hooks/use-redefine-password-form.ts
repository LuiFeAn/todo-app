import passwordValidation from '@/utils/password-validation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormEvent, FormEventHandler } from 'react';
import { todoAPI } from '@/services/todo-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export interface IUseRedefinePassword {

    jwt: string
    
}

export default function useRedefinePassword({
    jwt
}: IUseRedefinePassword){

    const router = useRouter();

    const redefinePasswordSchema = yup.object().shape({
        password: yup.string().required("Informe a nova senha").test("password","Sua senha deve possuir no mínimo 8 caracteres, uma letra maíscula e um número",passwordValidation)
    });

    const redefinePasswordForm = useFormik({
        initialValues:{
            password:''
        },
        validationSchema: redefinePasswordSchema,
        validateOnMount:true,
        onSubmit(values) {
            
            const promise = todoAPI.post('redefine-password',{
                ...values
            },{
                headers:{
                    "Authorization":`Bearer ${jwt}`
                }
            });
            
            toast.promise(promise,{
                success:{
                    render(props) {

                        router.push('/')

                        return 'Senha redefinida com sucesso !'
                    },
                },
                pending:"Redefinindo senha...",
                error:"Não foi possível redefinir sua senha"
            })

        },
    });

    function submitForm(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        redefinePasswordForm.submitForm();

    }

    return {
        submitForm,
        redefinePasswordForm:{
            getter: redefinePasswordForm
        }
    }

}