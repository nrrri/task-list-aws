import { CirclePlus } from 'lucide-react';
import { useState } from "react";
import { TaskType } from "../TaskType";
import axios from "axios";
import { API_URL } from "@/utils";

export interface AddTaskFormProps {
    fetchTasks: () => Promise<void>;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ fetchTasks }) => {
    const [newTask, setNewTask] = useState<string>('');

    const addNewTask = async () => {
        try {
            await axios.post<TaskType>(API_URL, {
                name: newTask,
                completed: false // as a default
            })

            await fetchTasks();
            setNewTask('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="border-b-2" >
            <h1 className="text-2xl pb-2 text-center">My Task List</h1>
            <div className="flex flex-row gap-2 align-middle py-4 px-8 pt-0 items-center">
                <input type="text" placeholder='Add new task' className='block border-b-[#d7d7d7] p-1 pl-3 rounded-xl border-[2px] focus:border-b-blue-500' value={newTask} onKeyDown={(event) => event.key === 'Enter' && addNewTask()} onChange={(e) => { setNewTask(e.target.value) }} />
                <CirclePlus size={36} strokeWidth={1.25} color={`${newTask ? '#555' : '#d7d7d7'} `} className="cursor-pointer duration-400" aria-disabled={!newTask.length} onClick={addNewTask} />
            </div>
        </div >
    )
}
