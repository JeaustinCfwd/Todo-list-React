import React, { useState, useEffect } from 'react'
import InputTarea from '../components/InputTarea'
import ListaTareas from '../components/ListaTareas'
import AnimatedBirds from '../components/AnimatedBirds'
import '../styles/TodoApp.css'
import '../styles/AnimatedBirds.css'

const API_URL = 'http://localhost:3001/tasks'

const Inicio = () => {
  const [tasks, setTasks] = useState([])
  const [alert, setAlert] = useState('')

  useEffect(() => { fetchTasks() }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error al cargar tareas:', error)
    }
  }

  const addTask = async (newTask) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })
      if (response.ok) {
        const savedTask = await response.json()
        setTasks([...tasks, savedTask])
        setAlert('')
      } else {
        setTasks([...tasks, newTask])
        setAlert('')
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error)
      setTasks([...tasks, newTask])
      setAlert('')
    }
  }

  const showAlert = (message) => {
    setAlert(message)
    setTimeout(() => { setAlert('') }, 3000)
  }

  const toggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId)
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed }
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      })
      if (response.ok) {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
      } else {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task))
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error)
      setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task))
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' })
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId))
      } else {
        setTasks(tasks.filter(task => task.id !== taskId))
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error)
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const completedCount = tasks.filter(task => task.completed).length

  return (
    <div className="fondo">
      <AnimatedBirds />
      
      <div className="todo-container">
        <h1 className="todo-title">TodoList</h1>
        {alert && <div className="alert">{alert}</div>}
        {tasks.length > 0 && (
          <div className="tasks-counter">
            Tareas completadas: {completedCount} de {tasks.length}
          </div>
        )}
        <InputTarea onAddTask={addTask} showAlert={showAlert} />
        <ListaTareas 
          tasks={tasks} 
          onToggleComplete={toggleComplete} 
          onDeleteTask={deleteTask} 
        />
      </div>
    </div>
  )
}

export default Inicio