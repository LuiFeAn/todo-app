import * as yup from 'yup';
import { todoAPI } from '@/services/todo-api';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Todo } from '@/interfaces/todo';
import moment from 'moment';

interface IUseHandleTodoProps {

    actionType: "required" | "notRequired",
    closeModal: () => void,
    obtainTodos: () => Promise<void>,
    selectedTodo: Todo | undefined,

}

export default function useHandleTodo({
    actionType,
    closeModal,
    obtainTodos,
    selectedTodo,
}: IUseHandleTodoProps){

    const [ currentRequestTodo, setCurrentRequestTodo ] = useState<Todo>();

    const todoSchema = yup.object().shape({
        title: yup.string()[actionType]("Informe o título da tarefa").min(1).max(100),
        description: yup.string().notRequired().max(5000),
        mustBeCompletedIn: yup.date()[actionType]("Informe a data de conclusão da tarefa"),
        priority: yup.string()[actionType]("Informe o grau de prioridade da tarefa")
    });

    const todoForm = useFormik({
        initialValues:{
            title:"",
            description:'',
            mustBeCompletedIn:'',
            priority:''
        },
        validationSchema: todoSchema,
        onSubmit(values) {

            const httpVerb = actionType === "required" ? "post" : "patch"

            const requestSucessMessage = actionType === "required" ? "Tarefa criada" : "Tarefa atualizada";

            const requestErrorMessage = actionType === "required" ? "Não foi possível criar esta tarefa" : "Não foi possível atualizar esta tarefa";

            const requestPendingMessage = actionType === "required" ? "Criando tarefa" : "Atualizando tarefa"

            let uri = '/todos';
            
            if( httpVerb === 'patch' ){

                uri += `/${selectedTodo?.id}`

            }

            const priorityTranslations: Record<string, string> = {
                Alta: "High",
                Média: "Medium",
                Baixa: "Low",
              };
              
              if (priorityTranslations.hasOwnProperty(values.priority)) {
                values.priority = priorityTranslations[values.priority];
              }

            const promise = todoAPI[httpVerb](uri,{
                ...values,
            },);

            toast.promise(promise,{
                success:{
                    async render(props) {

                        closeModal();

                        setAllFieldsToFalsy();

                        await obtainTodos();
                        
                        return requestSucessMessage;

                    },
                },
                error:{
                    render({ data }) {
                        
                        if( data instanceof AxiosError ){
                            return data.response?.data.message;
                        }

                        return requestErrorMessage;

                    },
                },
                pending:requestPendingMessage
            })

        },
    });


    function setAllFieldsToFalsy(){

        todoForm.setFieldValue('title','');

        todoForm.setFieldValue('description','');

        todoForm.setFieldValue('mustBeCompletedIn','');

        todoForm.setFieldValue('priority','');
    }

    async function obtainCurrentTodo(){

        if( selectedTodo?.id ){

            try{

                const request = await todoAPI.get<Todo>(`/todos/${selectedTodo?.id}`);

                const { data } = request;
                
                todoForm.setFieldValue('title',data.title);

                todoForm.setFieldValue('description',data.description)

                todoForm.setFieldValue('mustBeCompletedIn',moment(data.mustBeCompletedIn).format('YYYY-MM-DD'));
        
                todoForm.setFieldValue('priority',data.priority);
                

                setCurrentRequestTodo(data);

            }catch(err){
                
                toast.error("Não foi possível obter informações referentes a esta tarefa");

            }finally{


            }

        }

    }

    useEffect( () => {

        setAllFieldsToFalsy();

    },[actionType]);


    useEffect( () => {

        if( actionType === "notRequired" ){

            obtainCurrentTodo();

        }

    },[selectedTodo]);

    function sendForm(event: FormEvent<HTMLFormElement>){   
        
        event.preventDefault();

        todoForm.submitForm();

    }


    return {
        todoForm:{
            getter: todoForm,
        },
        sendForm
    }

}