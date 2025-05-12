import { useState } from 'react'
import { Task } from '../types/task'

interface Props {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, title: string, description: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')

  const handleEdit = (task: Task) => {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDesc(task.description)
  }

  const handleSave = () => {
    if (editingId !== null) {
      onEdit(editingId, editTitle, editDesc)
      setEditingId(null)
    }
  }

  return (
    <div className="mt-4 space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="border p-4 rounded shadow">
          {editingId === task.id ? (
            <>
              <input
                className="border p-1 w-full mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                className="border p-1 w-full mb-2"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h3
                className={`font-bold ${
                  task.status === 'completed' ? 'line-through' : ''
                }`}
              >
                {task.title}
              </h3>
              <p>{task.description}</p>
            </>
          )}
          <p>Status: {task.status}</p>
          <p>Created: {task.createdAt.toLocaleString()}</p>
          <div className="space-x-2 mt-2">
            <button
              onClick={() => onToggle(task.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Toggle Status
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            {editingId !== task.id && (
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
