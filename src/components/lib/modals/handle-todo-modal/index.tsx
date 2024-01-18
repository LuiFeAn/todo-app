import DefaultButton from "../../buttons/default-button"
import DefaultInput from "../../inputs/default-input"
import Modal, { ICommonGenericModalProps } from "../default-modal"
import DefaultTextArea from "../../textarea"
import InputLabel from "@/components/input-label"
import useHandleTodo from "./hooks/use-handle-todo"
import { Todo } from "@/interfaces/todo"
import { useEffect } from "react"

interface IHandleTodoModalProps extends ICommonGenericModalProps{

    actionType?: 'notRequired' | 'required',
    obtainTodos: () => Promise<void>,
    selectedTodo: Todo | undefined
}


export default function HandleTodoModal({ 
    onCloseModal,
    showModal,
    obtainTodos,
    selectedTodo,
    actionType = 'required'
}: IHandleTodoModalProps){

    const { todoForm, sendForm } = useHandleTodo({
        actionType,
        obtainTodos,
        closeModal: onCloseModal,
        selectedTodo,
    });

    return (
        <Modal showModal={showModal} onCloseModal={onCloseModal}>

        <h1 className="">{ actionType === "required" ? "Adicionar tarefa" : "Atualizar tarefa"}</h1>

        <form onSubmit={sendForm} className="flex flex-col items-center justify-center pb-[100px]
         gap-5">

            <InputLabel error={todoForm.getter.errors.title}>

            <DefaultInput { ...todoForm.getter.getFieldProps('title') } placeholder="Título"
            />

                
            </InputLabel>

            <DefaultTextArea { ...todoForm.getter.getFieldProps("description")}  placeholder="Digite alguma coisa..."/>

            <p>Data de conclusão:</p>

           <InputLabel error={todoForm.getter.errors.mustBeCompletedIn}>

            
            <DefaultInput { ...todoForm.getter.getFieldProps('mustBeCompletedIn')} type="date"

            />

           </InputLabel>

           <p>Prioridade:</p>

            <div className="w-[100%]">

                <label>

                    <select { ...todoForm.getter.getFieldProps('priority')} className="w-[100%] h-[50px] text-center">

                    <option data-value="High">
                        Alta
                    </option>

                    
                    <option data-value="Medium">
                        Média
                    </option>

                    
                    <option data-value="Low">
                        Baixa
                    </option>

                </select>

                </label>

            </div>

            <DefaultButton disabled={!todoForm.getter.isValid} content={actionType === "required" ? "Adicionar tarefa" : "Atualizar tarefa"}/>

        </form>

    </Modal>
    )

}