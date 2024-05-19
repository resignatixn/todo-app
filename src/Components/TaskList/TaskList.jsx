import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

function TaskList({ tasks, setTasks }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
}

export default TaskList
