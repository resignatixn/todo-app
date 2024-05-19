import { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ setTasks }) {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!value.trim()) {
      return
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        todo: value,
        done: false,
        createdAt: new Date(),
      },
    ])

    setValue('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" placeholder="What needs to be done?" value={value} onChange={handleChange} autoFocus />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  setTasks: PropTypes.func.isRequired,
}

export default NewTaskForm
