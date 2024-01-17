import { todoAPI } from "@/services/todo-api";
import { toast } from "react-toastify";

export interface IUseUpdateTodoRequest {

    getUserTodos: () => Promise<void>

}

export default function useConcludeTodoRequest({
    getUserTodos,
}: IUseUpdateTodoRequest){


    async function handleConcludeTodo(todoId: string){

        const promise = todoAPI.patch(`/todos/${todoId}`,{
            finishedIn: new Date()
        });

        await toast.promise(promise,{
            success:{
                render(props) {
                    getUserTodos()
                    return 'Tarefa concluida com sucesso'
                },
            },
            error:'Não foi possível concluir esta tarefa',
            pending:'Concluindo tarefa...'
        });

    }

    return {
        concludeTodoHandler: handleConcludeTodo,
    }


}