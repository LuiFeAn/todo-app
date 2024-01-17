import { useState } from "react";


export default function useTodoTypeHandler(){

    const [ todoType, setTodoType ] = useState<"required" | "notRequired">('required');

    function handleToRequired(){

        setTodoType('required');

    }

    function handleToNotRequired(){

        setTodoType('notRequired');

    }

    return {
        todoType:{
            getter: todoType,
            setter: setTodoType
        },
        toRequiredHandler: handleToRequired,
        toNotRequiredHandler: handleToNotRequired
    }

}