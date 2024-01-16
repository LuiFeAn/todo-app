import { ButtonHTMLAttributes } from "react"

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    
}

export default function DefaultButton(props: DefaultButtonProps){

    return (
        <button className={`font-bold ${
            props.disabled ? "bg-gray-400" : "bg-sky-600"
        } p-[10px] rounded-md w-[180px] text-white transition-all`}>{props.content}</button>
    )

}