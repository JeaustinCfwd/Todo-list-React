import React, { useState } from 'react'

const InputTarea = ({ onAddTask, showAlert }) => {
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(), 
        text: input, 
        completed: false
      };
      onAddTask(newTask);
      setInput("");
    } else {
      showAlert("Ingrese un texto");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className='form-group'>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        onKeyPress={handleKeyPress}
        className='input-form' 
        type="text" 
        placeholder='Ingrese la tarea'
      />
      <button onClick={addTodo} className='button-form'>
        Agregar
      </button>
    </div>
  );
}

export default InputTarea