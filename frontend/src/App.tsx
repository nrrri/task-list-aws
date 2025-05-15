import { useState } from "react"
import { AddTaskForm } from "./components/pages/AddTaskForm"
import { Task } from "./components/pages/Task"
import { TaskType } from "./components/TaskType"


function App() {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);

  return (
    <div className='flex flex-col items-center justify-center gap-2 my-52 w-[400px] mx-auto'>
      <AddTaskForm setAllTasks={setAllTasks} />
      <div className="mt-2">
        {
          allTasks.map((task) => (
            <Task task={task} key={task.id} setAllTasks={setAllTasks} />
          ))
        }
      </div>
    </div>

  )
}

export default App
