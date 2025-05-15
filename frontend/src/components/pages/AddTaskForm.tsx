import { CirclePlus } from 'lucide-react';
import { useState } from "react";
import { TaskType } from '../TaskType';

export interface AddTaskFormProps {
    setAllTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ setAllTasks }) => {
    const [newTask, setNewTask] = useState<string>('');

    const addNewTask = () => {
        const createId = new Date();
        console.log('add new task')
        if (newTask) {
            setAllTasks(prev => [...prev, {
                id: createId.toISOString(),
                name: newTask,
                completed: false
            }])
        }
        setNewTask('')
    }

    return (
        <div className="border-b-2 border-orange-400 w-[400px] justify-center" >
            <h1 className="text-3xl pb-3 text-center font-bold">My Task</h1>
            <div className="flex flex-row gap-1 align-middle py-4 px-8 pt-0 items-center">
                <input type="text" placeholder='Add new task' className='block border-b-[#d7d7d7] p-1 pl-3 rounded-xl border-[2px] focus:border-b-blue-500 grow' value={newTask} onKeyDown={(event) => event.key === 'Enter' && addNewTask()} onChange={(e) => { setNewTask(e.target.value) }} />
                <CirclePlus size={38} strokeWidth={1.25} color={`${newTask ? '#555' : '#d7d7d7'} `} className={`duration-400 ${newTask ? 'cursor-pointer' : ''}`} onClick={addNewTask} />
            </div>
        </div >
    )
}
