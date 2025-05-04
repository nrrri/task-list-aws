import { Button } from "@/components/ui/button"
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
        <div className=''>
            <h1 className="text-2xl">My Task List</h1>
            <div className="flex flex-row gap-2 align-middle">
                <input type="text" placeholder='Type' className='block border-b-[#d7d7d7] p-1 rounded-md border-[2px] focus:border-b-blue-500' value={newTask} onKeyDown={(event) => event.key === 'Enter' && addNewTask()} onChange={(e) => { setNewTask(e.target.value) }} />
                <Button disabled={!newTask.length} variant={"outline"} onClick={addNewTask}>Add<CirclePlus /></Button>
            </div>
        </div >
    )
}
