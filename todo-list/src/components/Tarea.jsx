import React, { useState } from 'react'

const Tarea = ({ task, onToggleComplete, onDeleteTask, onUpdateTask }) => {
  // Estados para manejar la edición
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  // Función para guardar cambios
  const handleSave = () => {
    if (editText.trim() !== '') {
      onUpdateTask(task.id, editText.trim())
      setIsEditing(false)
    } else {
      setEditText(task.text) // Restaurar texto original si está vacío
      setIsEditing(false)
    }
  }

  // Guardar con Enter o Escape
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }
    if (e.key === 'Escape') {
      setEditText(task.text) // Cancelar cambios
      setIsEditing(false)
    }
  }

  // Función para activar modo edición
  const handleEdit = () => {
    setIsEditing(true)
    setEditText(task.text)
  }

  return (
    <div className={`list-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input 
          className='list2' 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggleComplete(task.id)} 
        />
        
        {/* Renderizado condicional: input o texto */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleSave} // Guardar al perder el foco
            className="edit-input"
            autoFocus
            placeholder="Editar tarea..."
          />
        ) : (
          <span className={`task-text ${task.completed ? 'completed-text' : ''}`}>
            {task.text}
          </span>
        )}
      </div>
      
      <div className="task-buttons">
        {!isEditing && (
          <button 
            onClick={handleEdit}
            className='edit-list-button'
            disabled={task.completed}
          >
            Editar
          </button>
        )}
        <button 
          onClick={() => onDeleteTask(task.id)} 
          className='button-delete'
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Tarea