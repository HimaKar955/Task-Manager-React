import { useState } from 'react'

interface Props {
  onAdd: (title: string, description: string) => void
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Task
        </button>
      </form>
    </div>
  )
}
