import { InputHTMLAttributes } from "react"

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}    

export default function DefaultInput(props: DefaultInputProps){
    
    return (
        <input {...props} className="border-[3.3px] border-sky-600 rounded-md p-[15px] w-[370px] font-bold max-sm:w-[240px]"/>
    )

}