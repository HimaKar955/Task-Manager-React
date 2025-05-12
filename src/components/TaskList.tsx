import { Task } from '../types/task'

interface Props {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <div className="mt-4 space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="border p-4 rounded shadow">
          <h3
            className={`font-bold ${
              task.status === 'completed' ? 'line-through' : ''
            }`}
          >
            {task.title}
          </h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Created: {task.createdAt.toLocaleString()}</p>
          <button
            className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
            onClick={() => onToggle(task.id)}
          >
            {task.status === 'pending' ? 'Mark as Complete' : 'Mark as Pending'}
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 mt-2 ml-2 rounded"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
