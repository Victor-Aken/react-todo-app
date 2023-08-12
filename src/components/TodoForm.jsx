import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../reducers.js/todoReducer";
import { v4 as uuid} from "uuid";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";



const todoModalVariants = {
    hidden: { 
        opacity: 0, 
        transform: 'scale(1.2)',
    },
    visible: {
        opacity: 1, 
        transform: 'scale(1)',
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
        position: 'fixed',
        top: '50%',
        left: '50%',
        translateX: '-50%',
    },
    exit: {
        opacity: 0,
        transform: 'scale(0.9)',
    }
}


export default function TodoForm({type, modalOpen, setModalOpen, todo}) {
    const [toDo, setToDo] = useState("");
    const [status, setStatus] = useState("Not Completed");

    const dispatch = useDispatch();

    useEffect(() =>{
        if(type == 'Update' && todo){
            setToDo(todo.toDo);
            setStatus(todo.status);
        } else{
            setToDo("");
            setStatus("Not Completed");
        }
    }, [modalOpen, type, todo])



    function handleSubmit(e){
        e.preventDefault();

        if(toDo && status){
            if(type == 'Add'){

                dispatch(
                    addTodo({
                       id: uuid(),
                       toDo,
                       status,
                       time: new Date().toLocaleString(),
                    })
                  
                )
    
                toast.success('Task Added Sucessfully!');
                setModalOpen(false);
                setToDo("");
            } else{
               if(todo.toDo !== toDo || todo.status !== status){
                    dispatch(updateTodo({
                        ...todo,
                        toDo,
                        status,
                    }))

                    toast.success('Task Updated Successfully!');
                    setModalOpen(false);
                     setToDo("");

               } else{
                 toast.error('No Changes Made!');
               }
            }
            
        } else{
            toast.error('Please add a Title to your Task!')
        }
    }

  return (
    <AnimatePresence>
        {modalOpen && (
            <>
                <motion.div initial={{opacity: 0,}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-overlay" onClick={() => {setModalOpen(false)}} ></motion.div>
                <form className=" w-[300px] tab:w-[400px] xl:w-[30%] h-[320px] bg-white rounded-lg drop-shadow-md p-6 z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"  onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="text-3xl">{type == 'Update' ? 'Update' : 'Add'} Task</h1>
                    <label htmlFor="title" className="block my-3"> 
                        <p className="text-xl">Title</p>
                        <input type="text" className="w-full h-[40px] outline-none rounded-md pl-2 text-[18px] focus:border-violet-400  focus:ring-violet-400 ease-in duration-300 transition-colors border-2" value={toDo}  onChange={(e) => { setToDo(e.target.value)}} />
                    </label>
                    <label htmlFor="status" className="block my-3">
                    <p className="text-xl">Status</p>
                        <select className="w-full h-[40px] outline-none rounded-md pl-2 text-[18px]"value={status} onChange={(e) => { setStatus(e.target.value)}}>
                            <option value='Not Completed'>Not Completed</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </label>
                    <div className="mt-6">
                        <button type="submit" className="bg-[#b403b4] text-white py-2 px-8 rounded-md text-[18px] hover:bg-[#8b028b] duration-[0.25s] hover:scale-105 transition ease-in-out">{type == 'Update' ? 'Update' : 'Add'}</button>

                        <button type="button" className=" bg-gray-400 text-gray-900 hover:text-gray-950 py-2 px-7 rounded-md text-[18px] hover:bg-gray-500 duration-[0.25s] hover:scale-105 transition ease-in-out ml-3" onClick={() => {setModalOpen(false), setToDo("")}}>Cancel</button>
                    </div>
                </form>   
            </>
        )}
    </AnimatePresence>
  )
}
