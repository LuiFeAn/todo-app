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
import useShowTodoDescription from "./hooks/show-todo-description"
import ShowTodoDescriptionModal from "@/components/lib/modals/show-todo-description-modal"
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import useLogout from "./hooks/use-logout"
import Link from "next/link"


export default function TodosHomePage(){

    const { handleLogout } = useLogout();

    const { userTodos, loading, search, handleButtonSearch, allPages, allTodosCount, currentPage } = useTodosRequest();

    const { deleteTodoHandler } = useDeleteTodoRequest({
        getUserTodos: userTodos.handler,
    });

    const { concludeTodoHandler } = useConcludeTodoRequest({
        getUserTodos: userTodos.handler
    });

    const { handleShowAddModal, handleCloseShowModal, showTodoModal } = useAddTodoRequest();

    const { toNotRequiredHandler, toRequiredHandler, todoType } = useTodoTypeHandler();

    const { selectedTodo } = useSelectedTodo();

    const { handleCloseDescription, handleOpenDescription, showDescription, todo } = useShowTodoDescription();

    return (
        <div className="w-[100%] pb-[50px]">

            <div className="absolute top-[20px] left-[20px]">

                <Link href="/" onClick={handleLogout} className="font-bold cursor-pointer">SAIR</Link>

            </div>

           <form onSubmit={handleButtonSearch} className="w-[100%] flex items-center justify-center gap-[20px] flex-col">

                <label>

                    <p className="font-bold">Pesquisa</p>

                    <br/>
                        
                    <DefaultInput onChange={search.handler} placeholder="Procurar lista"/>


                </label>
               
                <DefaultButton content="Pesquisar"/>


           </form>

           <div className="fixed cursor-pointer top-10 right-3">

               <Image onClick={ () => {

                    toRequiredHandler();
                    
                    handleShowAddModal();

               }} src={addIcon} width={50} height={80} alt="add-icon"></Image>

           </div>

           <ShowTodoDescriptionModal
                todo={todo.getter!}
                onCloseModal={handleCloseDescription}
                showModal={showDescription.getter}
           />

           <HandleTodoModal selectedTodo={selectedTodo.getter} obtainTodos={userTodos.handler} actionType={todoType.getter} onCloseModal={handleCloseShowModal} showModal={showTodoModal.getter}/>

           { !showTodoModal.getter && (

                <div className="w-[100%] flex-col justify-center items-center text-center p-[30px]">


                { loading.getter && (
                    <div className="w-[100%] flex items-center justify-center h-[50%]">
                        
                        <ThreeDots
                        visible={true}
                        height="120"
                        width="120"
                        color="#4977f5"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />

                    </div>
                )}


                { !loading.getter && userTodos.getter.length === 0 && (
                    <h1 className="pt-[120px] font-bold">Nenhum lista encontrada</h1>
                )}

                { !loading.getter && userTodos.getter.length > 0 && userTodos.getter.map( todo => (
                    <div className="w-[100%] max-sm:w-[100%] font-bold flex items-center justify-between mt-[20px] gap-[10px]" key={todo.id}>

                        <div className="flex justify-start items-center gap-3">

                            <div className={`w-[15px] h-[15px] rounded-full bg-${todo.color}-400 `}>

                            </div>


                            <h3 onClick={ () => handleOpenDescription(todo)} className={`text-start  truncate whitespace-nowrap w-64 cursor-pointer ${
                                todo.finishedIn ? 'line-through' : ''
                            } text-wrap`}>{(todo.title.toUpperCase().length >= 15 ? `${todo.title.slice(0,14)}...` : todo.title).toUpperCase()}</h3>

                        </div>

                        <div className="flex cursor-pointer items-center justify-end gap-[10px] break-words">

                                { !todo.finishedIn && (
                                    <Image onClick={ () => concludeTodoHandler(todo.id)} className="cursor-pointer" src={conclusionIcon} alt="conclusion-icon" width={35} height={35}/>
                                ) }

                                { !todo.finishedIn && (
                                    <Image onClick={ () => {
                                    
                                        toNotRequiredHandler()

                                        selectedTodo.setter(todo);
                                    
                                        handleShowAddModal();
                                    }} className="cursor-pointer" src={editIcon} alt="edit-icon" width={42} height={42}/>
                                ) }

                                <Image onClick={ () => deleteTodoHandler(todo.id)}className="cursor-pointer" src={deleteIcon} alt="delete-icon" width={35} height={35}/>

                        </div>

                        

                    </div>
                )) }

                </div>

           )}

          { userTodos.getter.length > 0 && (
             <ResponsivePagination
                current={currentPage.getter}
                total={allPages.getter}
                onPageChange={ page => {

                    currentPage.setter(page);

                } }
            />
          )}
        
        </div>
    )

}