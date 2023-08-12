import { useDispatch } from "react-redux"
import { deleteTodo, updateTodo } from "../reducers.js/todoReducer";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md"



const todosVariants = {
    hidden: { opacity: 0, y: 20,},
    visible: {
        opacity: 1,
        y: 0,
    }
}

export default function Todo({todo, title, status, time}){
    const [updateModal, setUpdateModal] = useState(false);
    // const [isCompleted, setIsCompleted] = useState(todo.status === 'Completed' ? true : false);

    const dispatch = useDispatch();
    function handleDelete(){
        dispatch(deleteTodo(todo.id));
        //todo.id is the action.payload that gets set sent to the reducer.
    };

    function handleEdit(){
        setUpdateModal(true);    
    }

    // function handleCompleted(e){
    //     console.log(status, isCompleted);
    //     setIsCompleted(!isCompleted);
    //     console.log(status, isCompleted);
    //     dispatch(updateTodo({
    //         ...todo,
    //         status: isCompleted ? "Not Completed" : "Completed",
    //     }))
    //     console.log(status, isCompleted);
    // }




    return(
        <div>
            <motion.div className=" bg-white drop-shadow-md py-3 px-4 tab:px-6 rounded-md my-4 relative" variants={todosVariants}>
                <div className={`w-2 h-[100%] ${status === 'Completed' ? 'bg-green-800' : 'bg-blue-800'} absolute top-0 left-0 rounded-l-md`}></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="ml-0 tab:ml-3">
                            <p className={` text-base tab:text-xl font-medium ${status === 'Completed' ? 'text-green-800 line-through' : 'text-black'}`}>{title}</p>
                            <p className=" text-gray-600 font-medium text-sm tab:text-xl">{time}</p>
                        </div>
                    </div>
                    <div className="hidden tab:block ml-4">
                        <button className=" bg-blue-800 text-white px-6 py-1 rounded-md text-[16px] hover:scale-105 transition duration-75 ease-in-out" onClick={handleEdit}>Edit</button>
                        <button className=" bg-red-600 text-white px-3 py-1 rounded-md text-[16px] ml-3 hover:scale-105 transition duration-75 ease-in-out" onClick={handleDelete}>Delete</button>
                    </div>
                    <div className="flex items-center justify-center tab:hidden ">
                        <div onClick={handleEdit} className=" p-[4px] cursor-pointer"><FaEdit className=" text-blue-600 text-lg"/></div>
                        <div onClick={handleDelete} className=" p-[4px] ml-3 cursor-pointer"><MdDeleteForever className=" text-red-600 text-xl"/></div>
                    </div>
                </div>
            </motion.div>
            <TodoForm type={'Update'} modalOpen={updateModal} setModalOpen={setUpdateModal} todo={todo} />
        </div>
    )
}