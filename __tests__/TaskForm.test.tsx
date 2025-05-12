import { render, screen, fireEvent } from '@testing-library/react'
import TaskForm from '../src/components/TaskForm'

describe('TaskForm', () => {
  it('renders the form title and inputs', () => {
    render(<TaskForm onAdd={() => {}} />)

    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Add Task/i })
    ).toBeInTheDocument()
  })

  it('updates inputs as the user types', () => {
    render(<TaskForm onAdd={() => {}} />)

    const titleInput = screen.getByPlaceholderText(/Task Title/i)
    const descInput = screen.getByPlaceholderText(/Description/i)

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(descInput, { target: { value: 'Test Description' } })

    expect(titleInput).toHaveValue('Test Title')
    expect(descInput).toHaveValue('Test Description')
  })

  it('does not call onAdd if title is empty', () => {
    const mockAdd = vi.fn()
    render(<TaskForm onAdd={mockAdd} />)

    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }))

    expect(mockAdd).not.toHaveBeenCalled()
  })

  it('calls onAdd with correct data and resets fields', () => {
    const mockAdd = vi.fn()
    render(<TaskForm onAdd={mockAdd} />)

    const titleInput = screen.getByPlaceholderText(/Task Title/i)
    const descInput = screen.getByPlaceholderText(/Description/i)
    const addButton = screen.getByRole('button', { name: /Add Task/i })

    fireEvent.change(titleInput, { target: { value: 'New Task' } })
    fireEvent.change(descInput, { target: { value: 'Details' } })
    fireEvent.click(addButton)

    expect(mockAdd).toHaveBeenCalledWith('New Task', 'Details')
    expect(titleInput).toHaveValue('')
    expect(descInput).toHaveValue('')
  })
})
