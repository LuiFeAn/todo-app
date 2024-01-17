import { useState } from "react";


export default function useAddTodoRequest(){

    const [ showTodoAddModal, setShowTodoAddModal ] = useState(false);

    function handleShowAddModal(){

        setShowTodoAddModal(true);

    }

    function handleCloseShowModal(){

        setShowTodoAddModal(false);

    }

    return {
        handleShowAddModal,
        handleCloseShowModal,
        showTodoModal:{
            getter: showTodoAddModal,
            setter: setShowTodoAddModal,
        }
    }
    

}