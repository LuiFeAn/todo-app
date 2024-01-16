
interface IInputlabelProps {

    children: React.ReactNode
    error?: string

}

export default function InputLabel({ children, error }: IInputlabelProps){

    return (
        <label className="text-center">

            {children}

             <div className="text-center mt-[7px] break-words">

            { error && (
                  <span className="text-red-600">{error}</span>
            )}

            </div>

        </label>
    )

}