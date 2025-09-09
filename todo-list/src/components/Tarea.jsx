import React from 'react'

const Tarea = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <div className={`list-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input 
          className='list2' 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggleComplete(task.id)} 
        />
        <span className={`task-text ${task.completed ? 'completed-text' : ''}`}>
          {task.text}
        </span>
      </div>
      <button 
        onClick={() => onDeleteTask(task.id)} 
        className='button-delete'
      >
        Eliminar
      </button>
    </div>
  );
}

export default Tarea