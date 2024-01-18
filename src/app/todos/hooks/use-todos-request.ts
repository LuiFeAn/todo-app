import { todoAPI } from "@/services/todo-api";
import { Todo } from "@/interfaces/todo";
import { useEffect, useState } from "react";
import useLoading from "@/app/hooks/use-loading";

export default function useTodosRequest(){

    
    const { loading, setLoading } = useLoading();

    const [ todos, setTodos ] = useState<Todo[]>([]);

    async function getUserTodos(){
        
        try{

           setLoading(true);

           const response = await todoAPI.get("/todos",{
            params:{
                page:0,
                quanty:10,
            }
           });

           setTodos(response.data.todoList);

        }catch(err){

        }finally{

            setLoading(false);

        }

    }

    useEffect(() => {

        getUserTodos();

    },[]);

    return {
        userTodos:{
            getter: todos,
            setter: setTodos,
            handler: getUserTodos
        },
        loading:{
            getter: loading,
            setter: setLoading,
        }
    }

}