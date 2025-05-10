import { useEffect, useState } from "react"
import { AddTaskForm } from "./components/pages/AddTaskForm"
import { Task } from "./components/pages/Task"
import { TaskType } from "./components/TaskType"
import axios from "axios"
import { API_URL } from "./utils"


function App() {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskType[]>(API_URL)
      const data = response.data
      setAllTasks(data);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-4 my-52'>
      <AddTaskForm fetchTasks={fetchTasks} />
      {
        allTasks.map((task) => (
          <Task task={task} key={task._id} fetchTasks={fetchTasks} />
        ))
      }
    </div>

  )
}

export default App
