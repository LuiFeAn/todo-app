
export interface ICommonGenericModalProps {

    showModal: boolean,
    onCloseModal: () => void,

}

interface IModalProps extends ICommonGenericModalProps {

    title?: string
    customStyle?: string;
    description?: string,
    children?: React.ReactNode

}

export default function Modal({ 
    children,
    customStyle, 
    title,
    showModal,
    onCloseModal,
}: IModalProps){

    if( !showModal ){

        return null;

    }

    return (
        <div className="absolute h-screen backdrop-blur-[2px] w-screen z-50 text-black font-bold">

           <div className={`${ customStyle ? customStyle : 'fixed bg-white w-[450px] top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-[0_120px_120px_100px_rgba(0,0,0,0.3)] p-[20px] max-sm:w-[320px] max-sm:h-auto ${customStyle}'}`}>

                 <div className="w-[100%] text-end">

                   <p onClick={onCloseModal} className="text-4xl select-none p-[20px] cursor-pointer m[50px]">X</p>

                </div>

                <h3 className="text-center w-[100%] p-[30px]">{title}</h3>

                <div className="flex flex-col gap-[50px] items-center h-[100%]">

                    {children}

                </div>

           </div>

        </div>
    )

}