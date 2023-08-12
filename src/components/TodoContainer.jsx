import Todo from "./Todo";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { format } from "date-fns";
import { motion } from "framer-motion";

const todoContainerVariants = {
    hidden: { opacity : 0},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2,
        },
    }
}

const containerChildrenVariants = {
    hidden: { opacity: 0, y: 20,},
    visible: {
        opacity: 1,
        y: 0,
    }
}


export default function TodoContainer(){

    const todoList = useSelector((state) => state.todo.todoList);
    const sortedTodoList = [...todoList];
    sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

    const filterStatus = useSelector( (state) => state.todo.filterStatus);

    const filteredTodoList = sortedTodoList.filter( (todo) => { 
        if( filterStatus === 'all'){
            return true;
        }

        return todo.status === filterStatus;
     })

    return(
        <motion.div className=" bg-gray-300 md:w-[70%] lg:w-[60%] w-full mx-auto p-5 rounded-md mt-8 overflow-y-auto max-h-[500px]" variants={todoContainerVariants} initial='hidden' animate='visible'>
            
           {
             filteredTodoList.length !== 0 ? filteredTodoList.map(todo => {
                return(
                    <Todo key={todo.id} todo={todo} title={todo.toDo} status={todo.status} time={format( new Date(todo.time), 'p,  dd,MM,yyyy' )} />
                )
               }) :  <motion.h1 className="text-3xl font-bold text-center text-purple-900" variants={containerChildrenVariants}>Set Tasks and Crush Those Goals💪</motion.h1>
           }
        </motion.div>
    )
}