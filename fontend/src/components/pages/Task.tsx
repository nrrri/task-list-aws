import { useEffect, useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { TaskType } from "../TaskType";
import { SquarePen, Trash2 } from "lucide-react";

export interface TaskProps {
    task: TaskType;
    setAllTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    fetchTasks: () => Promise<void>;
    allTask: TaskType[];
}
export const Task: React.FC<TaskProps> = ({ task, fetchTasks, setAllTasks }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<TaskType>(task);

    const handleDeleteTask = async (id: string) => {
        // try {
        //     await axios.delete(`${API_URL}/${id}`)
        //     await fetchTasks()
        // } catch (error) {
        //     console.log(error)
        // }
        console.log(`delete ${id}`)
    }

    const handleEdit = (item: TaskType) => {
        setIsDialogOpen(true)
        setItemToUpdate(item)

    }

    const handleCheckmark = async () => {
        setAllTasks(prev => prev.map(item => item.id === task.id ? { ...item, itemToUpdate } : item

        ))
        // try {
        //     await axios.put(API_URL, {
        //         name, completed: !itemToUpdate?.completed
        //     })

        // } catch (error) {
        //     console.log(error)
        // }

        console.log('handle check', itemToUpdate)
    }

    useEffect(() => {
        setItemToUpdate(task);
    }, [task])

    return (
        <div className="flex flex-col gap-4 m-3">
            {
                <div className="flex gap-4 items-center" key={itemToUpdate?.id}>
                    {/* <span>{idx + 1}</span> */}
                    <input type="checkbox" name={itemToUpdate?.name} id={itemToUpdate?.id} checked={itemToUpdate?.completed} onClick={() => {
                        handleCheckmark()
                    }}
                    />
                    <span className={`w-[150px] ${itemToUpdate?.completed ? 'line-through' : ''}`}>{itemToUpdate?.name}</span>
                    <Trash2 size={30} color="#f62235" className="cursor-pointer duration-400" onClick={() => handleDeleteTask(itemToUpdate.id)} />
                    <SquarePen size={30} color="#387aff" className="cursor-pointer duration-400" onClick={() => handleEdit(itemToUpdate)} />
                </div>
            }
            {/* todo: change ui */}
            {isDialogOpen && <UpdateTaskForm
                fetchTasks={fetchTasks}
                task={task}
                setIsDialogOpen={setIsDialogOpen} />}
        </div>
    )
}
