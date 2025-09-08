import React, { useState } from 'react'
import InputTarea from '../components/InputTarea'
import Tarea from '../components/Tarea' 
import '../styles/TodoApp.css'

const Inicio = () => {
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState('')

  // Función para agregar tarea
  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
    setAlert('') // Limpia la alerta si había una
  }

  // Función para mostrar alerta
  const showAlert = (message) => {
    setAlert(message)
   
  }

  // Función para completar/descompletar tarea
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  // Función para eliminar tarea
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  // Contar tareas completadas
  const completedCount = tasks.filter(task => task.completed).length

  return (
    <div className="fondo">
      <div className="todo-container">
        <h1 className="todo-title">📝 Mi Lista de Tareas</h1>
        
        {/* Mostrar alerta si existe */}
        {alert && (
          <div className="alert">
            {alert}
          </div>
        )}
        
        {/* Contador de tareas completadas */}
        {tasks.length > 0 && (
          <div className="tasks-counter">
            Tareas completadas: {completedCount} de {tasks.length}
          </div>
        )}
        
        {/* Formulario para agregar tareas */}
        <InputTarea onAddTask={addTask} showAlert={showAlert} />
        
        {/* Lista de tareas o mensaje vacío */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            No existen tareas
          </div>
        ) : (
          <div className="todo-list">
            {tasks.map(task => (
              <Tarea 
                key={task.id} 
                task={task}
                onToggleComplete={toggleComplete}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Inicio