"use client"

import useRedefinePassword from "./hooks/use-redefine-password-form"
import InputLabel from "@/components/input-label"
import DefaultButton from "@/components/lib/buttons/default-button"
import DefaultInput from "@/components/lib/inputs/default-input"

export default function Redefine(props: any){

    const { redefinePasswordForm, submitForm } = useRedefinePassword({
        jwt: props.payload.payload.jwt
    });

    return (
       <main>

             <form onSubmit={submitForm} className="w-[100%] flex flex-col gap-[10px] justify-center items-center">

            <InputLabel error={redefinePasswordForm.getter.errors.password}>
            
                <DefaultInput { ...redefinePasswordForm.getter.getFieldProps("password")} type="password" placeholder="Nova senha"/>

            </InputLabel>

            <DefaultButton content="Redefinir"/>

        </form>

       </main>
    )

}