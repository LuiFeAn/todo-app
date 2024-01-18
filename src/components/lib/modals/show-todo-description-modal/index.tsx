import { Todo } from "@/interfaces/todo"
import Modal, { ICommonGenericModalProps } from "../default-modal"

export interface IShowTodoDescriptionModal extends ICommonGenericModalProps{

    todo: Todo

}

export default function ShowTodoDescriptionModal({onCloseModal,showModal, todo}: IShowTodoDescriptionModal){

    return (
        <Modal customStyle="fixed bg-white w-[450px] top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-[0_120px_120px_100px_rgba(0,0,0,0.3)] p-[20px] h-[600px]" onCloseModal={onCloseModal} showModal={showModal}>

            <div className="absolute p-[50px] top-[100px] break-all text-wrap">

                <h1>{todo?.description}</h1>

            </div>

        </Modal>
    )

}