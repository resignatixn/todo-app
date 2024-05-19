import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

function Task({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task.todo)
  const [formatedDate, setFormatedDate] = useState(formatDistanceToNow(task.createdAt))

  useEffect(() => {
    const interval = setInterval(() => {
      setFormatedDate(formatDistanceToNow(task.createdAt))
    }, 60000)

    return () => clearInterval(interval)
  }, [task.createdAt])

  const deleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== task.id))
  }

  const toggleCheckbox = (event) => {
    event.stopPropagation()
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) => (prevTask.id === task.id ? { ...prevTask, done: !prevTask.done } : prevTask))
    )
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    const trimmedTask = editedTask.trim()
    if (!trimmedTask) return

    setTasks((prevTasks) =>
      prevTasks.map((prevTask) => (prevTask.id === task.id ? { ...prevTask, todo: trimmedTask } : prevTask))
    )
    setIsEditing(false)
  }

  return (
    <li className="item">
      <div className="view">
        {isEditing ? (
          <form onSubmit={handleSave}>
            <input
              type="text"
              className="input editing"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              onBlur={handleSave}
            />
          </form>
        ) : (
          <>
            <input
              id={`toggle_${task.id}`}
              className="toggle"
              type="checkbox"
              checked={task.done}
              onChange={toggleCheckbox}
            />
            <label htmlFor={`toggle_${task.id}`} className="label">
              <span className={`description ${task.done ? 'completed' : ''}`}>{task.todo}</span>
              <span className="created">created {formatedDate} ago</span>
            </label>
            <button className="icon icon-edit" onClick={handleEdit} aria-label="Edit" />
            <button className="icon icon-destroy" onClick={deleteTask} aria-label="Delete" />
          </>
        )}
      </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  setTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
}

export default Task
