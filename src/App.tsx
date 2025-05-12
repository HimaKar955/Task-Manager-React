import React, { useState } from 'react'
import { Task } from './types/task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

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

  const toggleTaskStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending'
            }
          : task
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const editTask = (id: number, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    )
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTaskStatus}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  )
}

export default App
