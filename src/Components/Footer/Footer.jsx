import PropTypes from 'prop-types'

import './Footer.css'

function Footer({ tasks, filter, onFilterChange, clearCompletedTasks }) {
  const activeTasks = tasks.filter((task) => !task.done).length
  const completedTasks = tasks.length - activeTasks

  return (
    <footer className="footer">
      <span className="todo-count">
        <span>{activeTasks}</span> item{activeTasks !== 1 ? 's' : ''} left
      </span>
      <ul className="filters">
        <li>
          <button className={filter === 'all' ? 'selected' : ''} onClick={() => onFilterChange('all')}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'active' ? 'selected' : ''} onClick={() => onFilterChange('active')}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'completed' ? 'selected' : ''} onClick={() => onFilterChange('completed')}>
            Completed
          </button>
        </li>
      </ul>
      {completedTasks > 0 && (
        <button className="clear-completed" onClick={clearCompletedTasks}>
          Clear Completed
        </button>
      )}
    </footer>
  )
}
Footer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default Footer
