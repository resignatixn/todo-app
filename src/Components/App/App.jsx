import { useState } from 'react'
import PropTypes from 'prop-types'

import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.done)
    } else if (filter === 'active') {
      return tasks.filter((task) => !task.done)
    } else {
      return tasks
    }
  }

  const filteredTasks = getFilteredTasks()

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.done))
  }

  return (
    <div className="app">
      <NewTaskForm setTasks={setTasks} />
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
      {tasks.length > 0 && (
        <Footer
          tasks={tasks}
          filter={filter}
          onFilterChange={handleFilterChange}
          clearCompletedTasks={clearCompletedTasks}
        />
      )}
    </div>
  )
}

App.propTypes = {
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ),
}

export default App
