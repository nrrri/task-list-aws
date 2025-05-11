import {  useState } from "react"
import { AddTaskForm } from "./components/pages/AddTaskForm"
import { Task } from "./components/pages/Task"
import { TaskType } from "./components/TaskType"


function App() {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);

  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get<TaskType[]>(API_URL)
  //     const data = response.data
  //     setAllTasks(data);

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   fetchTasks()
  // }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-4 my-52'>
      <AddTaskForm setAllTasks={setAllTasks} />
      {
        allTasks.map((task) => (
          <Task task={task} key={task.id} allTasks={allTasks} setAllTasks={setAllTasks} />
        ))
      }
    </div>

  )
}

export default App
