import { useState } from "react";
import TodoForm from "./TodoForm";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../reducers.js/todoReducer";


export default function Header(){
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useSelector( (state) => state.todo.filterStatus);


    const dispatch = useDispatch();

    function updateFilter(e){
        dispatch(updateFilterStatus(e.target.value))   
    }


    return (
      <div>
        <div className="flex align-center justify-between md:w-[70%] lg:w-[60%] m-auto mt-[20px] w-full">
          <button
            className="bg-[#b403b4] text-white tab:w-[150px] w-[100px] text-[14px] p-3 rounded-md tab:text-[20px] hover:bg-[#8b028b] duration-[0.25s] hover:scale-105 transition ease-in-out"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Task
          </button>
          <select
            className="outline-none mobile:w-[120px] tab:w-[170px] md:w-[240px] bg-[#ebe9e9] px-2 py-3 tab:text-[20px] rounded-md cursor-pointer w-[100px] text-[14px]"
            value={filterStatus}
            onChange={updateFilter}
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Inompleted</option>
          </select>
        </div>
        <TodoForm
          type={"Add"}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    );
}