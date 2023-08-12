import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const getInitialTodoList = () => {
    const localTodoList = localStorage.getItem('TODOLIST');
    if(localTodoList){
        return JSON.parse(localTodoList);
    } else{
        localStorage.setItem('TODOLIST', JSON.stringify([]));
        return [];
    }
}

const initialValue = {
    filterStatus: 'all',
    todoList: getInitialTodoList(),
}



export const todoSlice = createSlice({
    name: "todo",
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = JSON.parse(localStorage.getItem('TODOLIST'));
            if(todoList){
                todoList.push({
                    ...action.payload,
                })

                localStorage.setItem('TODOLIST', JSON.stringify(todoList));
            } else{
                localStorage.setItem("TODOLIST", JSON.stringify({ ...action.payload }))
            }
        },

        deleteTodo: (state, action) => {
            const todoList = JSON.parse(localStorage.getItem('TODOLIST'));
            if(todoList){
                todoList.forEach((todo, index) => {
                    if(todo.id === action.payload){
                        todoList.splice(index, 1);
                        toast.success('Task Deleted Successfully!');
                    }
                    localStorage.setItem('TODOLIST',JSON.stringify(todoList));
                    state.todoList = todoList;
                })
            }
        },

        updateTodo: (state, action) => {
            const todoList = JSON.parse(localStorage.getItem('TODOLIST'));
            if(todoList){
                todoList.forEach( (todo) => {
                    if(todo.id === action.payload.id){
                        todo.toDo = action.payload.toDo;
                        todo.status = action.payload.status;
                    }
                })
            }
            localStorage.setItem('TODOLIST', JSON.stringify(todoList));
            state.todoList = todoList;
        },

        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    }
})


export const { addTodo, deleteTodo, updateTodo, updateFilterStatus }  = todoSlice.actions;
export default todoSlice.reducer;