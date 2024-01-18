import { TextareaHTMLAttributes } from "react"

interface DefaultTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    
}    


export default function DefaultTextArea(props: DefaultTextAreaProps){

    return (
        <textarea className={`border-blue-400 resize-none border-[3px] outline-blue-600 w-[100%] h-[200px] pl-[10px] pt-[10px]`} {...props}/>
    )

}