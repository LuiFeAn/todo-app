"use client"

import useDeleteTodoRequest from "./hooks/delete-todo-request"
import useTodosRequest from "./hooks/use-todos-request"
import DefaultButton from "@/components/lib/buttons/default-button"
import DefaultInput from "@/components/lib/inputs/default-input"
import { MagnifyingGlass } from "react-loader-spinner";
import useConcludeTodoRequest from "./hooks/conclude-todo-request"
import conclusionIcon from '../assets/conclusion.png';
import deleteIcon from '../assets/delete.jpg';
import Image from "next/image";
import addIcon from '../assets/add.png';
import editIcon from '../assets/edit.png';
import useAddTodoRequest from "./hooks/add-todo-request"
import HandleTodoModal from "@/components/lib/modals/handle-todo-modal"
import useTodoTypeHandler from "./hooks/use-todo-type-handler"

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

    return (
        <div className="w-[100%]">

           <div className="w-[100%] flex items-center justify-center gap-[20px] max-sm:flex-col">

                <DefaultInput placeholder="Pesquisar Todo"/>

                <DefaultButton content="Pesquisar"/>

           </div>

           <div className="fixed top-10 right-3">

               <Image onClick={ () => {

                    toRequiredHandler();
                    
                    handleShowAddModal();

               }} src={addIcon} width={50} height={80} alt="add-icon"></Image>

           </div>

           <HandleTodoModal actionType={todoType.getter} onCloseModal={handleCloseShowModal} showModal={showTodoModal.getter}/>

           <div className="w-[100%] flex-col justify-center items-center text-center p-[30px]">


                { loading.getter && (
                    <MagnifyingGlass
                    visible={true}
                    height="300"
                    width="300"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                    />
                )}


                { !loading.getter && userTodos.getter.length === 0 && (
                    <h1>Você não possui nenhuma tarefa no momento !</h1>
                )}

                { !loading.getter && userTodos.getter.length > 0 && userTodos.getter.map( todo => (
                    <div className="w-[100%] max-sm:w-[100%] font-bold flex items-center justify-between mt-[20px] p-[10px] gap-[20px]" key={todo.id}>

                        <h3 className={`text-start ${
                            todo.finishedIn ? 'line-through' : ''
                        } truncate`}>{todo.title}</h3>

                        <div className="flex cursor-pointer items-center justify-center gap-[15px]">

                                { !todo.finishedIn && (
                                    <Image onClick={ () => concludeTodoHandler(todo.id)} className="cursor-pointer" src={conclusionIcon} alt="conclusion-icon" width={45} height={45}/>
                                ) }

                                 { !todo.finishedIn && (
                                    <Image onClick={ () => {
                                       
                                        toNotRequiredHandler()
                                    
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