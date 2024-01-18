import { todoAPI } from "@/services/todo-api";
import { Todo } from "@/interfaces/todo";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useLoading from "@/app/hooks/use-loading";
import { TodosWithColorProp } from "@/interfaces/todo";


export default function useTodosRequest(){

    const [ search, setSearch ] = useState('');
    
    const { loading, setLoading } = useLoading();

    const [ todos, setTodos ] = useState<TodosWithColorProp[]>([]);

    const [ currentPage, setCurrentPage ] = useState(0);

    const [ allPages, setAllPages ] = useState(0);

    const [ allTodosCount, setAllTodosCount ] = useState(0);

    async function getUserTodos(){
        
        try{

           setLoading(true);

           const response = await todoAPI.get<{
            todoList: Todo[],
            totalPages: number,
            allTodosCount: number,
           }>("/todos",{
            params:{
                page:currentPage,
                quanty:15,
                title: search,
            }
           });

           const { data:{ todoList, totalPages, allTodosCount} } = response;

            const colorMapping: Record<string, string> = {
                High: 'green',
                Medium: 'orange',
                Low: 'red',
            };
        
            const defaultColor = 'gray';
            
            const addColorToTodos: TodosWithColorProp[] = todoList.map(todo => ({
                ...todo,
                color: colorMapping[todo.priority] || defaultColor,
            }));

           setAllPages(totalPages);

           setTodos(addColorToTodos);

           setAllTodosCount(allTodosCount);


        }catch(err){

            setTodos([]);

        }finally{

            setLoading(false);

        }

    }

    useEffect(() => {

        getUserTodos();

    },[]);

    useEffect( () => {

        setTodos([]);

        getUserTodos()

    },[currentPage]);

    function handleTodoSearch(event: ChangeEvent<HTMLInputElement>){

        setSearch(event.target.value);

    }

    async function handleButtonSearch(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        await getUserTodos();

    }

    return {
        userTodos:{
            getter: todos,
            setter: setTodos,
            handler: getUserTodos
        },
        loading:{
            getter: loading,
            setter: setLoading,
        },
        search:{
            getter: search,
            setter: setSearch,
            handler: handleTodoSearch
        },
        currentPage:{
            getter: currentPage,
            setter: setCurrentPage,
        },
        allPages:{
            getter: allPages,
            setter: setAllPages
        },
        allTodosCount:{
            getter: allTodosCount,
            setter: setAllTodosCount
        },
        handleButtonSearch,
    }

}