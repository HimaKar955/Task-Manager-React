import { useState } from 'react'
import { Task } from '../types/task'
import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'

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
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 border">Title</th>
            <th className="px-6 py-3 border">Description</th>
            <th className="px-6 py-3 border">Status</th>
            <th className="px-6 py-3 border">Created</th>
            <th className="px-6 py-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              {editingId === task.id ? (
                <>
                  <td className="border px-6 py-3">
                    <input
                      className="border w-full p-1 rounded"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </td>
                  <td className="border px-6 py-3">
                    <input
                      className="border w-full p-1 rounded"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                  </td>
                  <td className="border px-6 py-3 text-gray-500">
                    {task.status}
                  </td>
                  <td className="border px-6 py-3 text-gray-500">
                    {task.createdAt.toLocaleString()}
                  </td>
                  <td className="border px-6 py-3 text-center">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-800"
                      title="Save"
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-6 py-3 font-medium">
                    <span
                      className={
                        task.status === 'completed'
                          ? 'line-through text-gray-400'
                          : ''
                      }
                    >
                      {task.title}
                    </span>
                  </td>
                  <td className="border px-6 py-3">{task.description}</td>
                  <td className="border px-6 py-3">{task.status}</td>
                  <td className="border px-6 py-3">
                    {task.createdAt.toLocaleString()}
                  </td>
                  <td className="border px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => onToggle(task.id)}
                      className={`px-3 py-1 rounded text-white ${
                        task.status === 'completed'
                          ? 'bg-green-600'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {task.status === 'completed'
                        ? 'Mark Pending'
                        : 'Mark Completed'}
                    </button>

                    <button
                      onClick={() => handleEdit(task)}
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
