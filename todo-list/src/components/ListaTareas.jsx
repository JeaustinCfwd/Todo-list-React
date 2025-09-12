import React from 'react'
import Tarea from './Tarea'

const ListaTareas = ({ tasks, onToggleComplete, onDeleteTask, onUpdateTask }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">No existen tareas</div>
  }

  return (
    <div className="todo-list">
      {tasks.map(task => (
        <Tarea 
          key={task.id} 
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  )
}

export default ListaTareas