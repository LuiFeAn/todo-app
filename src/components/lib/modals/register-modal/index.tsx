import useRegisterUserModalState from "./hooks/register-modal-state";
import DefaultInput from "../../inputs/default-input";
import Modal from "../default-modal"
import { ICommonGenericModalProps } from '../default-modal';
import DefaultButton from "../../buttons/default-button";
import InputLabel from "@/components/input-label";

interface IRegisterModalProps extends ICommonGenericModalProps{

}

export default function RegisterModal({ 
        onCloseModal, 
        showModal 
    }: IRegisterModalProps){

    const { userForm, submitForm } = useRegisterUserModalState(onCloseModal);

    return (
        <Modal showModal={showModal}  onCloseModal={onCloseModal} title="REGISTRE-SE">

           <form className="flex flex-col gap-[50px] items-center h-[100%]" onSubmit={submitForm}>

            
                <InputLabel error={userForm.getter.errors.username}>

                  <DefaultInput { ...userForm.getter.getFieldProps('username')} placeholder="Nome completo"/>

                </InputLabel>

                <InputLabel error={userForm.getter.errors.email}>
                
                  <DefaultInput { ...userForm.getter.getFieldProps('email')} placeholder="Email"/>

                </InputLabel>

                <InputLabel error={userForm.getter.errors.password}>

                  <DefaultInput { ...userForm.getter.getFieldProps('password')} 
                    type="password" placeholder="Senha"
                  />
                
                </InputLabel>

                <DefaultButton disabled={!userForm.getter.isValid} type="submit" content="Registrar !"/>

           </form>

        </Modal>
    )

}