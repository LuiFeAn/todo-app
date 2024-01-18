
import { useState } from "react";
import { Todo } from "@/interfaces/todo";

export default function useSelectedTodo(){

    const [ selectedTodo, setSelecteTodo ] = useState<Todo>()

    return {
        selectedTodo:{
            getter: selectedTodo,
            setter: setSelecteTodo
        }
    }

}