import { useFormik } from 'formik';
import * as yup from 'yup';
import { todoAPI } from '@/services/todo-api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import passwordValidation from '@/utils/password-validation';
import { FormEvent, FormEventHandler } from 'react';

export default function useRegisterUserModalState(closeModal: () => void){

    const registerUserSchema = yup.object().shape({
        username: yup.string().required("Informe seu nome completo").min(1).max(150),
        email: yup.string().required("Informe seu email").email("Por favor, informe um email válido"),
        password: yup.string().required("Informe uma senha").test("password","Sua senha deve possuir no mínimo 8 caracteres, uma letra maíscula e um número",value => passwordValidation(value))
    });

    const userRegisterForm = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:''
        },
        validateOnBlur:false,
        validationSchema: registerUserSchema,
        async onSubmit(values) {


            const promise = todoAPI.post('/users',{
                ...values    
            });

            toast.promise(promise,{
                success:{
                    render(props) {
                        closeModal();
                        return 'Registrado com sucesso !'
                    },
                },
                error:{
                    render({ data }) {
                        
                        if( data instanceof AxiosError ){

                            return data.response?.data.message;
                            
                        }

                    },
                },
                pending:'Aguarde ! estamos registrando você =)'
            })

        },
    });

    function submitForm(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        userRegisterForm.submitForm();

    }

    return {
        userForm:{
            getter: userRegisterForm
        },
        submitForm
    }

}