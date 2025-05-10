import { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { TaskType } from "../TaskType";
import axios from "axios";
import { API_URL } from "@/utils";
import { SquarePen, Trash2 } from "lucide-react";

export interface TaskProps {
    task: TaskType;
    fetchTasks: () => Promise<void>;
}
export const Task: React.FC<TaskProps> = ({ task, fetchTasks }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<TaskType | null>(null);

    const handleDeleteTask = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/${id}`)
            await fetchTasks()
        } catch (error) {
            console.log(error)
        }
        console.log(`delete ${id}`)
    }

    const handleEdit = (item: TaskType) => {
        setIsDialogOpen(true)
        setItemToUpdate(item)

    }

    const handleCheckmark = async () => {

        try {
            await axios.put(API_URL, {
                name, completed: !itemToUpdate?.completed
            })

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col gap-4 m-3">
            {
                <div className="flex gap-4 items-center" key={task._id}>
                    {/* <span>{idx + 1}</span> */}
                    <input type="checkbox" name={task.name} id={task._id} checked={task.completed} onClick={() => {
                        handleCheckmark()
                    }}
                    />
                    <span className={`w-[150px] ${task.completed ? 'line-through' : ''}`}>{task.name}</span>
                    <Trash2 size={36} color="#f62235" className="cursor-pointer duration-400" onClick={() => handleDeleteTask(task._id)} />
                    <SquarePen size={36} color="#387aff" className="cursor-pointer duration-400" onClick={() => handleEdit(task)} />
                </div>
            }

            {isDialogOpen && <UpdateTaskForm
                fetchTasks={fetchTasks}
                task={task}
                setIsDialogOpen={setIsDialogOpen} />}
        </div>
    )
}
