import Image from 'next/image';
import todoIcon from '../../app/assets/todo-icon.svg';

export default function Header(){

    return (
        <div className="bg-white text-black p-[100px] text-3xl font-bold select-none">

            <div className='flex items-center justify-center'>

                <h1 className='text-center'>Todo Do List</h1>

                <Image
                    src={todoIcon}
                    alt="Todo icon"
                    width={50} 
                    height={50}
                />

            </div>

        </div>
    )

}