// App.tsx
import React from 'react';
import { HiPencilAlt, HiTrash, HiCheckCircle } from 'react-icons/hi';
import './App.css';
import { useTodoContext } from './TodoContext';

function App() {
  const { todos, completed, addTodo, removeTodo, completeTodo, editTodo } = useTodoContext();
  const [todoInput, setTodoInput] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'todo' | 'completed'>('todo');
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editedTodoIndex, setEditedTodoIndex] = React.useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = React.useState('');

  const handleAddTodo = () => {
    if (todoInput.trim() !== '') {
      addTodo(todoInput);
      setTodoInput('');
    }
  };

  const handleRemoveTodo = (index: number) => {
    removeTodo(index);
  };

  const handleCompleteTodo = (index: number) => {
    completeTodo(index);
  };

  const handleEditTodo = (index: number) => {
    setEditedTodoIndex(index);
    setEditedTodoText(todos[index].task);
    setEditModalOpen(true);
  };

  const handleSaveTodo = () => {
    if (editedTodoIndex !== null && editedTodoText.trim() !== '') {
      editTodo(editedTodoIndex, editedTodoText);
      setEditModalOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditedTodoText('');
    setEditedTodoIndex(null);
  };

  return (
    <div className="App">
      <div className="white-container">
        <div className="tabs">
          <div className="tab-container">
            <button
              className={`large-tab ${activeTab === 'todo' ? 'tab-selected' : 'tab-not-selected'}`}
              onClick={() => setActiveTab('todo')}
            >
              Todo List
            </button>
          </div>
          <div className="tab-container">
            <button
              className={`large-tab ${activeTab === 'completed' ? 'tab-selected' : 'tab-not-selected'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        {activeTab === 'todo' && (
          <div className="input-container">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="Enter todo"
            />
            <button className="add-todo" onClick={handleAddTodo}>Add Todo</button>
          </div>
        )}
        {activeTab === 'todo' ? (
          <ul className="todo-list-container">
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                <span className="todo-text">{todo.task}</span>
                <div className="buttons">
                  <button className="edit" onClick={() => handleEditTodo(index)}>
                    <HiPencilAlt />
                  </button>
                  <button className="delete" onClick={() => handleRemoveTodo(index)}>
                    <HiTrash />
                  </button>
                  <button className="completed" onClick={() => handleCompleteTodo(index)}>
                    <HiCheckCircle />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            {completed.length === 0 ? (
              <p>There's no task completed yet.</p>
            ) : (
              <ul className="completed-list-container">
                {completed.map((task, index) => (
                  <li key={index} className="completed-item">
                    <span>{task.task}</span>
                    <span>{task.timestamp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="modal" style={{ display: editModalOpen ? 'block' : 'none' }}>
          <div className="modal-content">
            <span className="close" onClick={() => handleCancelEdit()}>&times;</span>
            <h2>Edit your task</h2>
            <input
              type="text"
              value={editedTodoText}
              onChange={(e) => setEditedTodoText(e.target.value)}
              placeholder="Enter new text"
            />
            <button className="save-todo" onClick={handleSaveTodo}>Save</button>
            <button className="cancel-edit" onClick={() => handleCancelEdit()}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
