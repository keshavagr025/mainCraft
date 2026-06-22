import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  CheckSquare, 
  Square, 
  ListTodo, 
  Trash,
  Calendar,
  AlertCircle
} from 'lucide-react';
import type { PageType } from '../App';
import './Dashboard.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface DashboardProps {
  onNavigate?: (page: PageType, hash?: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [inputError, setInputError] = useState<string | null>(null);
  
  // Ref for focus management on edit input
  const editInputRef = useRef<HTMLInputElement>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('maincraft_tasks');
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage:', err);
    }
  }, []);

  // Save tasks to localStorage when tasks state changes
  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    try {
      localStorage.setItem('maincraft_tasks', JSON.stringify(updatedTasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) {
      setInputError('Task text cannot be empty');
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
    setNewTaskText('');
    setInputError(null);
  };

  const handleToggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
    if (editingTaskId === id) {
      setEditingTaskId(null);
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
    // Focus edit field on next render
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 50);
  };

  const handleSaveEdit = (id: string) => {
    if (!editingTaskText.trim()) {
      return;
    }
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, text: editingTaskText.trim() } : task
    );
    saveTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    saveTasks(updatedTasks);
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  // Filter & Search Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      statusFilter === 'all' ? true :
      statusFilter === 'completed' ? task.completed :
      !task.completed;
    return matchesSearch && matchesFilter;
  });

  // Progress metrics
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="dashboard-section">
      <div className="section">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Task Manager</span>
          <h1 className="section-title">Project Dashboard</h1>
          <p className="section-desc">
            Organize assignments, filter pending actions, and track your execution progress in real-time.
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="dashboard-grid">
          {/* Left panel: Task creation & Stats */}
          <div className="dashboard-panel-left">
            {/* Input Form Card */}
            <div className="dashboard-card glass">
              <h3 className="card-header-title">
                <ListTodo size={20} className="card-header-icon" />
                Add New Task
              </h3>
              <form onSubmit={handleAddTask} className="add-task-form">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="e.g. Finish assignment project..."
                    value={newTaskText}
                    onChange={(e) => {
                      setNewTaskText(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    className={`task-input ${inputError ? 'input-error-state' : ''}`}
                    maxLength={120}
                  />
                  {inputError && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      <span>{inputError}</span>
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary btn-add-task">
                  <Plus size={18} />
                  Add Task
                </button>
              </form>
            </div>

            {/* Progress Stats Card */}
            <div className="dashboard-card glass">
              <h3 className="card-header-title">Progress Tracker</h3>
              <div className="progress-container">
                <div className="progress-stats">
                  <span className="progress-percentage">{progressPercent}%</span>
                  <span className="progress-fraction">
                    {completedCount} of {totalCount} Completed
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                {totalCount > 0 && completedCount === totalCount && (
                  <div className="completion-cheer">
                    🎉 Excellent! All tasks have been completed.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel: Task controls & list area */}
          <div className="dashboard-panel-right">
            {/* Search and Filters Bar */}
            <div className="dashboard-controls glass">
              <div className="search-box">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-controls-group">
                <div className="filter-select-wrapper">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="filter-select"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending Only</option>
                    <option value="completed">Completed Only</option>
                  </select>
                </div>

                {completedCount > 0 && (
                  <button 
                    className="btn btn-secondary btn-clear-completed"
                    onClick={handleClearCompleted}
                    title="Remove all completed tasks"
                  >
                    <Trash size={15} />
                    Clear Completed
                  </button>
                )}
              </div>
            </div>

            {/* Task List container */}
            <div className="tasks-list-container">
              {filteredTasks.length === 0 ? (
                <div className="empty-state-card glass">
                  <div className="empty-icon-wrapper">
                    <ListTodo size={40} className="empty-icon" />
                  </div>
                  <h3>
                    {tasks.length === 0 
                      ? 'Your workspace is clear' 
                      : 'No matching tasks'}
                  </h3>
                  <p>
                    {tasks.length === 0 
                      ? 'Add a task in the panel to get started on your agenda.' 
                      : `Try searching for something else or changing your filters.`}
                  </p>
                </div>
              ) : (
                <div className="tasks-list">
                  {filteredTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`task-item glass glass-hover ${task.completed ? 'task-completed-style' : ''}`}
                    >
                      {/* Checkbox button */}
                      <button 
                        type="button" 
                        onClick={() => handleToggleTask(task.id)}
                        className="task-checkbox-btn"
                        title={task.completed ? "Mark as pending" : "Mark as completed"}
                      >
                        {task.completed ? (
                          <CheckSquare className="checkbox-icon checked" size={22} />
                        ) : (
                          <Square className="checkbox-icon" size={22} />
                        )}
                      </button>

                      {/* Task Content text or input */}
                      <div className="task-content-area">
                        {editingTaskId === task.id ? (
                          <div className="edit-mode-container">
                            <input
                              ref={editInputRef}
                              type="text"
                              value={editingTaskText}
                              onChange={(e) => setEditingTaskText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit(task.id);
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                              className="edit-task-input"
                              maxLength={120}
                            />
                            <div className="edit-actions">
                              <button 
                                className="btn-icon-action btn-save" 
                                onClick={() => handleSaveEdit(task.id)}
                                title="Save changes"
                              >
                                <Check size={18} />
                              </button>
                              <button 
                                className="btn-icon-action btn-cancel" 
                                onClick={handleCancelEdit}
                                title="Cancel editing"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div 
                            className="task-display-container"
                            onDoubleClick={() => handleStartEdit(task)}
                            title="Double-click to edit task"
                          >
                            <span className="task-text">{task.text}</span>
                            <span className="task-meta">
                              <Calendar size={11} />
                              {formatDate(task.createdAt)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Item controls */}
                      {editingTaskId !== task.id && (
                        <div className="task-item-actions">
                          <button
                            className="btn-icon-action btn-edit"
                            onClick={() => handleStartEdit(task)}
                            title="Edit task text"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="btn-icon-action btn-delete"
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete task permanently"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
