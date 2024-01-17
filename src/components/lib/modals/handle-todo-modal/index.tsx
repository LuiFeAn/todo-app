import DefaultButton from "../../buttons/default-button"
import DefaultInput from "../../inputs/default-input"
import Modal, { ICommonGenericModalProps } from "../default-modal"
import DefaultTextArea from "../../textarea"
import InputLabel from "@/components/input-label"
import useHandleTodo from "./hooks/use-handle-todo"

interface IHandleTodoModalProps extends ICommonGenericModalProps{

    actionType?: 'notRequired' | 'required'
}


export default function HandleTodoModal({ 
    onCloseModal,
    showModal,
    actionType = 'required'
}: IHandleTodoModalProps){

    const { todoForm } = useHandleTodo(actionType)

    return (
        <Modal showModal={showModal} onCloseModal={onCloseModal}>

        <h1 className="">Adicionar Tarefa</h1>

        <form className="flex flex-col items-center justify-center
         gap-10">

            <InputLabel error={todoForm.getter.errors.title}>

            <DefaultInput { ...todoForm.getter.getFieldProps('title')} placeholder="Título"/>

                
            </InputLabel>

            <DefaultTextArea placeholder="Digite alguma coisa..."/>

           <InputLabel error={todoForm.getter.errors.mustBeCompletedIn}>

            <DefaultInput { ...todoForm.getter.getFieldProps('mustBeCompletedIn')} type="date"/>

           </InputLabel>


            <div className="w-[100%]">

                <p className="text-red-600">Prioridade</p>

                <br/>
                
                <select className="w-[100%] h-[50px] text-center">

                    <option>
                        Alta
                    </option>

                    
                    <option>
                        Média
                    </option>

                    
                    <option>
                        Baixa
                    </option>

                </select>

            </div>

            <DefaultButton content="Adicionar"/>

        </form>

    </Modal>
    )

}