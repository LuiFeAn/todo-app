import * as yup from 'yup';
import { todoAPI } from '@/services/todo-api';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useEffect } from 'react';

export default function useHandleTodo(actionType: 'required' | 'notRequired'){

    const todoSchema = yup.object().shape({
        title: yup.string()[actionType]("Informe o título da tarefa").min(1).max(100),
        description: yup.string().notRequired().max(5000),
        mustBeCompletedIn: yup.date()[actionType]("Informe a data de conclusão da tarefa"),
        priority: yup.string()[actionType]("Informe o grau de prioridade da tarefa")
    });

    const todoForm = useFormik({
        initialValues:{
            title: '',
            description:'',
            mustBeCompletedIn:'',
            priority:''
        },
        validationSchema: todoSchema,
        onSubmit(values) {
            
            const promise = todoAPI.post('/todos',{
                ...values,
            });

            toast.promise(promise,{
                success:{
                    render(props) {

                        setAllFieldsToFalsy();
                        
                        return 'Tarefa criada';

                    },
                },
                error:'Não foi possível criar esta tarefa',
                pending:'Criando tarefa'
            })

        },
    });


    function setAllFieldsToFalsy(){

        todoForm.setFieldValue('title','');

        todoForm.setFieldValue('description','');

        todoForm.setFieldValue('mustBeCompletedIn','');

        todoForm.setFieldValue('priority','');
    }

    useEffect( () => {

        setAllFieldsToFalsy();

    },[actionType]);


    return {
        todoForm:{
            getter: todoForm,
        }
    }

}