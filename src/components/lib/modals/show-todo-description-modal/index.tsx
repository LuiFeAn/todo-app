import { Todo } from "@/interfaces/todo"
import Modal, { ICommonGenericModalProps } from "../default-modal"

export interface IShowTodoDescriptionModal extends ICommonGenericModalProps{

    todo: Todo

}

export default function ShowTodoDescriptionModal({onCloseModal,showModal, todo}: IShowTodoDescriptionModal){

    return (
        <Modal onCloseModal={onCloseModal} showModal={showModal}>

            <div className="absolute p-[50px] top-[100px] break-all text-wrap">

                <h1>{todo?.description}</h1>

            </div>

        </Modal>
    )

}