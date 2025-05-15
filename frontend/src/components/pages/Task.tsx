import { useEffect, useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { TaskType } from "../TaskType";
import { SquarePen, Trash2 } from "lucide-react";

export interface TaskProps {
    task: TaskType;
    setAllTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}
export const Task: React.FC<TaskProps> = ({ task, setAllTasks }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [itemToUpdate, setItemToUpdate] = useState<TaskType>(task);

    const handleDeleteTask = (id: string) => {
        console.log(`delete ${id}`)
    }

    const handleEdit = (item: TaskType) => {
        setIsDialogOpen(true)
        setItemToUpdate(item)

    }

    const handleCheckmark = () => {
        setAllTasks(prev => prev.map(item => item.id === task.id ? {
            ...item,
            completed: !task.completed
        } : item))

        console.log('handle check', itemToUpdate)
    }

    useEffect(() => {
        setItemToUpdate(task);
    }, [task])

    return (
        <div className="flex flex-col">
            {
                <div className="flex gap-4 m-2 items-center border-b-1 p-1 pt-0 border-gray-200 w-[380px]" key={itemToUpdate?.id}>
                    <input type="checkbox" className="h-5 w-5 cursor-pointer transition-all rounded shadow" name={itemToUpdate?.name} id={itemToUpdate?.id} checked={itemToUpdate?.completed} onClick={() => {
                        handleCheckmark()
                    }}
                    />
                    <span className={`grow text-xl ${itemToUpdate?.completed ? 'line-through' : ''}`}>{itemToUpdate?.name}</span>
                    <Trash2 strokeWidth={1.5} size={24} color="#f62235" className="cursor-pointer duration-400" onClick={() => handleDeleteTask(itemToUpdate.id)} />
                    <SquarePen strokeWidth={1.5} size={24} color="#387aff" className="cursor-pointer duration-400" onClick={() => handleEdit(itemToUpdate)} />
                </div>
            }
            {/* todo: change ui */}
            {isDialogOpen && <UpdateTaskForm
                task={task}
                setIsDialogOpen={setIsDialogOpen}
                isDialogOpen={isDialogOpen}
                setAllTasks={setAllTasks} />}
        </div>
    )
}
