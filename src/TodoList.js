import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex].text = newTask;
    setTasks(updatedTasks);
    setIsEditing(false);
    setNewTask('');
    setCurrentTaskIndex(null);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={isEditing ? updateTask : addTask}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleCompletion(index)}>{task.text}</span>
            <button className="edit-button" onClick={() => editTask(index)}>Edit</button>
            <button className="remove-button" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
