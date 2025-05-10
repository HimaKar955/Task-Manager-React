import React, { useState } from 'react'
import { Task } from './types/task'
import TaskForm from './components/TaskForm'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: 'pending',
      createdAt: new Date()
    }
    setTasks([newTask, ...tasks])
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <TaskForm onAdd={addTask} />
    </div>
  )
}

export default App
