import React, { useState } from 'react'
import { TaskType } from '../TaskType';
import Modal from 'react-modal'

interface UpdateTaskProps {
    task: TaskType;
    fetchTasks: () => Promise<void>;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

}
export const UpdateTaskForm: React.FC<UpdateTaskProps> = ({ setIsDialogOpen, task, fetchTasks }) => {
    const [taskName, setTaskName] = useState('')

    const handleUpdateTaskName = async () => {
        // try {
        //     await axios.put(API_URL, {
        //         name: taskName,
        //     })
        //     await fetchTasks();
        //     setTaskName('')
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (
        <div className='border p-4 rounded-xl flex-col'>
            <Modal isOpen={setIsDialogOpen}>
            <div>{task.name}</div>
            <input type="text" value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
            <div onClick={() => { setIsDialogOpen(false) }}>x</div>
            <div onClick={() => {
                setIsDialogOpen(false)
                handleUpdateTaskName()
            }}>Update</div>
            </Modal>
        </div>
    )
}
