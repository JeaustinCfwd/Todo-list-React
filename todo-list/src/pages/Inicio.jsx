// Inicio.jsx
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

  // CAMBIO: helper para comparar ids sin importar si vienen como string o número
  const sameId = (a, b) => String(a) === String(b)

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL, { headers: { Accept: 'application/json' } }) // CAMBIO: Accept para claridad
      const data = await response.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error al cargar tareas:', error)
    }
  }

  const addTask = async (newTask) => {
    try {
      // CAMBIO: aseguramos que no se envíe un id generado en el cliente
      const taskToSend = { ...newTask }
      delete taskToSend.id

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, // CAMBIO: headers explícitos
        body: JSON.stringify(taskToSend),
      })
      if (response.ok) {
        const savedTask = await response.json()
        // CAMBIO: usamos la tarea devuelta por el servidor (con su id real)
        setTasks(prev => [...prev, savedTask])
        setAlert('')
      } else {
        // CAMBIO: no agregamos localmente si el servidor falla para evitar ids inexistentes
        setAlert('No se pudo guardar la tarea en el servidor')
      }
    } catch (error) {
      console.error('Error al agregar tarea:', error)
      // CAMBIO: no agregamos localmente si hay error de red
      setAlert('Error de conexión con el servidor')
    }
  }

  const showAlert = (message) => {
    setAlert(message)
    setTimeout(() => { setAlert('') }, 3000)
  }

  const toggleComplete = async (taskId) => {
    // CAMBIO: localizar la tarea comparando ids por string para evitar desajustes de tipo
    const taskToUpdate = tasks.find(task => sameId(task.id, taskId))
    if (!taskToUpdate) {
      // CAMBIO: si no existe en estado, sincronizamos y salimos
      await fetchTasks()
      showAlert('La tarea no existe en el estado. Sincronizando…')
      return
    }

    // CAMBIO: usar exactamente el id tal como viene del backend para construir la URL
    const idForUrl = taskToUpdate.id
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed }

    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(idForUrl)}`, { // CAMBIO: encodeURIComponent por seguridad
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(updatedTask),
      })
      if (response.ok) {
        setTasks(tasks.map(task => sameId(task.id, idForUrl) ? updatedTask : task))
      } else if (response.status === 404) {
        // CAMBIO: si 404, re-sincronizamos con el backend
        showAlert('La tarea no existe en el servidor (404). Sincronizando…')
        await fetchTasks()
      } else {
        showAlert('No se pudo actualizar la tarea en el servidor')
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error)
      showAlert('Error de conexión al actualizar')
    }
  }

  const deleteTask = async (taskId) => {
    // CAMBIO: localizar la tarea por igualdad de string en el estado
    const taskToDelete = tasks.find(task => sameId(task.id, taskId))
    if (!taskToDelete) {
      await fetchTasks()
      showAlert('La tarea no existe en el estado. Sincronizando…')
      return
    }

    // CAMBIO: usar el id exactamente como lo devuelve el backend
    const idForUrl = taskToDelete.id

    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(idForUrl)}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        setTasks(tasks.filter(task => !sameId(task.id, idForUrl)))
      } else if (response.status === 404) {
        // CAMBIO: si 404, sincronizamos para limpiar cualquier desfase
        showAlert('La tarea ya no existe en el servidor (404). Sincronizando…')
        await fetchTasks()
      } else {
        showAlert('No se pudo eliminar la tarea en el servidor')
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error)
      showAlert('Error de conexión al eliminar')
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
