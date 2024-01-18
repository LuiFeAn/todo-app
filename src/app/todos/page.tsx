"use client"

import useDeleteTodoRequest from "./hooks/delete-todo-request"
import useTodosRequest from "./hooks/use-todos-request"
import DefaultButton from "@/components/lib/buttons/default-button"
import DefaultInput from "@/components/lib/inputs/default-input"
import { MagnifyingGlass, ThreeDots } from "react-loader-spinner";
import useConcludeTodoRequest from "./hooks/conclude-todo-request"
import conclusionIcon from '../assets/conclusion.png';
import deleteIcon from '../assets/delete.jpg';
import Image from "next/image";
import addIcon from '../assets/add.png';
import editIcon from '../assets/edit.png';
import useAddTodoRequest from "./hooks/add-todo-request"
import HandleTodoModal from "@/components/lib/modals/handle-todo-modal"
import useTodoTypeHandler from "./hooks/use-todo-type-handler"
import useSelectedTodo from "./hooks/use-selected-todo"

export default function TodosHomePage(){

    const { userTodos, loading } = useTodosRequest();

    const { deleteTodoHandler } = useDeleteTodoRequest({
        getUserTodos: userTodos.handler,
    });

    const { concludeTodoHandler } = useConcludeTodoRequest({
        getUserTodos: userTodos.handler
    });

    const { handleShowAddModal, handleCloseShowModal, showTodoModal } = useAddTodoRequest();

    const { toNotRequiredHandler, toRequiredHandler, todoType } = useTodoTypeHandler();

    const { selectedTodo } = useSelectedTodo();

    return (
        <div className="w-[100%]">

           <div className="w-[100%] flex items-center justify-center gap-[20px] max-sm:flex-col">

                <DefaultInput placeholder="Pesquisar Todo"/>

                <DefaultButton content="Pesquisar"/>

           </div>

           <div className="fixed cursor-pointer top-10 right-3">

               <Image onClick={ () => {

                    toRequiredHandler();
                    
                    handleShowAddModal();

               }} src={addIcon} width={50} height={80} alt="add-icon"></Image>

           </div>

           <HandleTodoModal selectedTodo={selectedTodo.getter} obtainTodos={userTodos.handler} actionType={todoType.getter} onCloseModal={handleCloseShowModal} showModal={showTodoModal.getter}/>

           <div className="w-[100%] flex-col justify-center items-center text-center p-[30px]">


                { loading.getter && (
                    <div className="w-[100%] flex items-center justify-center h-[50%]">
                        
                        <ThreeDots
                        visible={true}
                        height="120"
                        width="120"
                        color="#4d66a9"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />

                    </div>
                )}


                { !loading.getter && userTodos.getter.length === 0 && (
                    <h1>Você não possui nenhuma tarefa no momento !</h1>
                )}

                { !loading.getter && userTodos.getter.length > 0 && userTodos.getter.map( todo => (
                    <div className="w-[100%] max-sm:w-[100%] font-bold flex items-center justify-between mt-[20px] gap-[10px]" key={todo.id}>

                        <div className="flex justify-start items-center gap-3">

                            <div className={`w-[15px] h-[15px] bg-${todo.color}-400 rounded-full `}>

                            </div>


                            <h3 className={`text-start ${
                                todo.finishedIn ? 'line-through' : ''
                            } text-wrap`}>{todo.title.toUpperCase()}</h3>

                        </div>

                        <div className="flex cursor-pointer items-center justify-center gap-[5px] break-words">

                                { !todo.finishedIn && (
                                    <Image onClick={ () => concludeTodoHandler(todo.id)} className="cursor-pointer" src={conclusionIcon} alt="conclusion-icon" width={45} height={45}/>
                                ) }

                                 { !todo.finishedIn && (
                                    <Image onClick={ () => {
                                       
                                        toNotRequiredHandler()

                                        selectedTodo.setter(todo);
                                    
                                        handleShowAddModal();
                                    }} className="cursor-pointer" src={editIcon} alt="conclusion-icon" width={45} height={45}/>
                                ) }

                                <Image onClick={ () => deleteTodoHandler(todo.id)}className="cursor-pointer" src={deleteIcon} alt="delete-icon" width={45} height={45}/>

                        </div>

                        

                    </div>
                )) }

           </div>
        
        </div>
    )

}