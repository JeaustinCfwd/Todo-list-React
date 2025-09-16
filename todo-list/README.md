# 📝 TodoList - Aplicación de Gestión de Tareas

Una aplicación web moderna para gestionar tareas desarrollada con **React**, que permite crear, editar, completar y eliminar tareas de manera intuitiva con persistencia de datos.

## 🎯 Características Principales

### ✨ Funcionalidades Core
- **➕ Agregar Tareas**: Crea nuevas tareas usando Enter o el botón "Agregar"
- **✏️ Editar Tareas**: Modifica el texto de las tareas existentes con doble click
- **✅ Completar Tareas**: Marca tareas como completadas usando checkboxes
- **🗑️ Eliminar Tareas**: Elimina tareas individuales con confirmación
- **📊 Contador Inteligente**: Visualiza el progreso con "Tareas completadas

### 🔧 Características Técnicas
- **💾 Persistencia de Datos**: Integración con JSON Server para almacenamiento
- **🚫 Validaciones**: Previene el ingreso de tareas vacías
- **🔄 Sincronización**: Actualización automática entre cliente y servidor
- **⚠️ Manejo de Errores**: Alertas informativas para errores de conexión
- **📱 Diseño Responsive**: Interfaz adaptable a diferentes dispositivos

### 🎨 Experiencia de Usuario
- **🐦 Animaciones Elegantes**: Pájaros animados de fondo para una experiencia visual atractiva
- **🎭 Estados Visuales**: Diferentes estilos para tareas completadas y pendientes
- **💡 Interfaz Intuitiva**: Controles claros y fáciles de usar
- **🌈 Diseño Moderno**: Gradientes y efectos visuales contemporáneos

## 🛠️ Tecnologías Utilizadas

- **⚛️ React 19.1.1** - Framework principal
- **🏗️ Vite** - Herramienta de construcción y desarrollo
- **🎨 CSS3** - Estilos y animaciones personalizadas
- **🗄️ JSON Server** - Backend simulado para persistencia
- **🔄 Concurrently** - Ejecución paralela de servidor y cliente

## 🚀 Instalación y Uso

### Prerequisitos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación


2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia la aplicación**
   ```bash
   npm start
   ```
   
   Este comando iniciará automáticamente:
   - 🌐 JSON Server en `http://localhost:3001`
   - ⚛️ Aplicación React en `http://localhost:5173`

### Comandos Disponibles

```bash
npm run dev      # Solo servidor de desarrollo React
npm run server   # Solo JSON Server
npm start        # Ambos servidores simultáneamente
npm run build    # Construcción para producción
npm run preview  # Vista previa de la construcción
```

## 📁 Estructura del Proyecto

```
todo-list/
├── src/
│   ├── components/
│   │   ├── AnimatedBirds.jsx    # Animaciones de fondo
│   │   ├── InputTarea.jsx       # Componente de entrada
│   │   ├── ListaTareas.jsx      # Lista de tareas
│   │   └── Tarea.jsx           # Componente individual de tarea
│   ├── pages/
│   │   └── Inicio.jsx          # Página principal
│   ├── styles/
│   │   ├── TodoApp.css         # Estilos principales
│   │   └── AnimatedBirds.css   # Estilos de animaciones
│   └── main.jsx               # Punto de entrada
├── db.json                    # Base de datos JSON
└── package.json              # Configuración del proyecto
```

## 🎮 Cómo Usar la Aplicación

### Agregar Tareas
1. Escribe tu tarea en el campo de texto
2. Presiona **Enter** o haz click en **"Agregar"**
3. La tarea aparecerá al final de la lista

### Gestionar Tareas
- **✅ Completar**: Click en el checkbox de la tarea
- **✏️ Editar**: Click en el botón "Editar" (deshabilitado para tareas completadas)
- **🗑️ Eliminar**: Click en el botón "Eliminar"

### Atajos de Teclado
- **Enter**: Agregar nueva tarea o guardar edición
- **Escape**: Cancelar edición

## 🌟 Características Destacadas

### Validaciones Inteligentes
- ❌ No permite tareas vacías
- ⚠️ Muestra alertas descriptivas
- 🔄 Sincronización automática con el servidor

### Estados de la Aplicación
- 📝 **Lista Vacía**: Mensaje "No existen tareas"
- 📊 **Con Tareas**: Contador de progreso visible
- ⚠️ **Errores**: Alertas informativas por 3 segundos

### Experiencia Visual
- 🎨 Gradiente azul-verde de fondo
- 🐦 Animaciones de pájaros no intrusivas
- ✨ Efectos de hover y transiciones suaves
- 🌈 Botones con efectos de brillo animados

## 🔧 Configuración del Backend

La aplicación usa **JSON Server** para simular un backend REST:

- **Endpoint**: `http://localhost:3001/tasks`
- **Métodos soportados**: GET, POST, PUT, DELETE
- **Estructura de datos**:
  ```json
  {
    "id": number,
    "text": string,
    "completed": boolean
  }
  ```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE] para más detalles.


⭐ **¡Si te gustó este proyecto, no olvides darle una estrella en GitHub!** ⭐