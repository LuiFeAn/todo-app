import { todoAPI } from "@/services/todo-api";
import { toast } from "react-toastify";

export interface IUseDeleteTodoRequest {

    getUserTodos: () => Promise<void>

}

export default function useDeleteTodoRequest({
    getUserTodos,
}: IUseDeleteTodoRequest){

    async function handleDeleteTodo(todoId: string){

        const promise = todoAPI.delete(`/todos/${todoId}`);

        await toast.promise(promise,{
            success:{
                render(props) {
                    
                    getUserTodos();

                    window.scrollTo({
                        top:0,
                        behavior:'smooth'
                    })

                    return 'Tarefa deletada com sucesso'

                },
            },
            pending:'Deletando tarefa...',
            error:'Não foi possível deletar esta tarefa'
        });

    }

    return {
        deleteTodoHandler: handleDeleteTodo,
    }

}