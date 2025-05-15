import React, { useEffect, useState } from 'react'
import { TaskType } from '../TaskType';
import Modal from 'react-modal'
import { X } from 'lucide-react';

interface UpdateTaskProps {
    setAllTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    task: TaskType;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDialogOpen: boolean;

}
export const UpdateTaskForm: React.FC<UpdateTaskProps> = ({ setIsDialogOpen, task, isDialogOpen, setAllTasks }) => {
    const [taskName, setTaskName] = useState('')
    const customStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '12px',
        }
    }

    const handleUpdateTaskName = () => {
        setAllTasks(prev => prev.map(item => item.id === task.id ? { ...item, name: taskName } : item))

        console.log('update task name', taskName)
        setTaskName('');
    }

    useEffect(() => {
        setTaskName(task.name)
    }, [task])

    return (
        <Modal style={customStyles} isOpen={isDialogOpen}>
            <div className='w-48 flex flex-col justify-center items-center gap-2'>
                <X size={16} className='absolute top-2 right-2 cursor-pointer' onClick={() => { setIsDialogOpen(false) }} />
                <div className='flex border-b-2 pb-1 w-full justify-center font-semibold text-xl'>Update task</div>
                <input type="text" className='text-center border-1 rounded-lg p-1 my-4 focus:border-blue-500' value={taskName} onChange={(e) => { setTaskName(e.target.value) }} />
                <button className='bg-blue-500 text-white flex p-1 px-8 rounded-md cursor-pointer' onClick={() => {
                    setIsDialogOpen(false)
                    handleUpdateTaskName()
                }}>Update</button>

            </div>
        </Modal>
    )
}
