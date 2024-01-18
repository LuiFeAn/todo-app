
export interface ICommonGenericModalProps {

    showModal: boolean,
    onCloseModal: () => void,

}

interface IModalProps extends ICommonGenericModalProps {

    title?: string
    customStyle?: string;
    children: React.ReactNode

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
        <div className="fixed top-0 left-0 h-screen backdrop-blur-[2px] w-screen z-50 text-black font-bold flex items-center justify-center">

           <div className={`${ customStyle ? customStyle : "relative bg-white rounded-2xl w-[100%] h-[100%] shadow-[0_120px_120px_100px_rgba(0,0,0,0.3)] overflow-scroll"}`}>

                 <div className="absolute top-[20px] right-5">

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