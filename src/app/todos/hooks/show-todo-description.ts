import { Todo } from "@/interfaces/todo";
import { useState } from "react";


export default function useShowTodoDescription(){

    const [ showDescription, setShowDescription ] = useState(false);

    const [ todo, setTodo ] = useState<Todo>();

    function handleOpenDescription(todo: Todo){

        setTodo(todo);

        setShowDescription(true);

    }

    function handleCloseDescription(){

        setShowDescription(false);

    }

    return {
        showDescription:{
            getter: showDescription,
            setter: setShowDescription
        },
        todo:{
            getter: todo,
            setter: setTodo,
        },
        handleOpenDescription,
        handleCloseDescription
    }

}