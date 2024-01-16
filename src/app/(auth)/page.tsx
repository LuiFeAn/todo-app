"use client"
import useLoginState from "./hooks/use-login-state";
import useLoginForgetPasswordState from "./hooks/use-login-forget-password-state";
import RegisterModal from "@/components/lib/modals/register-modal";
import DefaultInput from "@/components/lib/inputs/default-input";
import DefaultButton from "@/components/lib/buttons/default-button";
import InputLabel from "@/components/input-label";

export default function LoginPage(){

    const { 
        onClickRegisterHandler, 
        onCloseRegisterHandler, 
        showModal,
        loginForm,
        submitForm,
    } = useLoginState();

    const { forgetPasswordHandler } = useLoginForgetPasswordState();

    return(
       <>

            { showModal.getter && (
                <RegisterModal showModal={showModal.getter} onCloseModal={onCloseRegisterHandler} />
            )}

            <form onSubmit={submitForm} className="w-[100%] h-[100%] flex items-center justify-center">

            <div className="flex items-center justify-center flex-col gap-[50px]">

                <InputLabel error={loginForm.getter.errors.email}>
                
                    <DefaultInput  {...loginForm.getter.getFieldProps("email")} placeholder="Email" />

                </InputLabel>
                
               <InputLabel error={loginForm.getter.errors.password}>

                    <DefaultInput {...loginForm.getter.getFieldProps("password")} placeholder="Senha" type="password"/>

               </InputLabel>

               <div className="w-[100%]">

                <span className="cursor-pointer text-gray-600" onClick={forgetPasswordHandler}><strong>Esqueci minha senha</strong></span>

               </div>

                <div className="w-[100%]">
                    

                     <DefaultButton disabled={!loginForm.getter.isValid} type="submit" content="Acessar"/>
                     

                </div>

                <span className="cursor-pointer text-center" onClick={onClickRegisterHandler}><strong className="text-center">Não possui conta ? <br/> Registre-se</strong></span>

            </div>
            
        
       </form>

       </>
    )

}