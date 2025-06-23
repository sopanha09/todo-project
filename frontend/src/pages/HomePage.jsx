import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Board from '@/components/Board';
import TaskForm from '@/components/TaskForm';
import ColumnManager from '@/components/ColumnManager';
import {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '@/services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [viewMode, setViewMode] = useState('board');
  const [tasks, setTasks] = useState([]);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [openColumnManager, setOpenColumnManager] = useState(false);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  const handleGetAllColumns = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await getColumns(token);
      setColumns(res.data || []);
      console.log('Columns fetched:', res.data);
    } catch (err) {
      console.error('Error fetching columns:', err);
      setColumns([]);
    }
  };

  const handleCreateColumn = async (column) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
    try {
      const res = await createColumn(column, token);
      setColumns((prev) => [...prev, res.data]);
      toast.success(`Column "${column.title}" created successfully!`);
    } catch (err) {
      console.error('Error creating column:', err);
      toast.error('Failed to create column');
    }
  };

  const handleUpdateColumn = async (columnId, data) => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await updateColumn(columnId, data, token);
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? res.data : col))
      );
      toast.success(`Column "${data.title}" updated successfully!`);
    } catch (err) {
      console.error('Error updating column:', err);
      toast.error('Failed to update column');
    }
  };
  const handleDeleteColumn = async (columnId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await deleteColumn(columnId, token);
      setColumns((prev) => prev.filter((col) => col.id !== columnId));
      toast.success('Column deleted successfully!');
    } catch (err) {
      console.error('Error deleting column:', err);
      toast.error('Failed to delete column');
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/auth');
        }
        console.log('Fetching tasks with token:', token);
        const res = await getTasks(token);
        setTasks(res.data || []);
      } catch (err) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [navigate]);

  const handleAddOrEditTask = async (task) => {
    const token = localStorage.getItem('accessToken');
    try {
      if (editingTask) {
        const res = await updateTask(editingTask.id, task, token);
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? res.data : t))
        );
        toast.success(`Task "${task.title}" updated successfully!`);
      } else {
        const res = await createTask(task, token);
        setTasks((prev) => [...prev, res.data]);
        toast.success(`Task "${task.title}" created successfully!`);
      }
    } catch (err) {
      console.error('Error saving task:', err);
      toast.error('Failed to save task');
    }
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await deleteTask(taskId, token);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenTaskForm(true);
  };

  return (
    <div>
      <Header />
      <pre>{JSON.stringify(columns, null, 2)}</pre>
      <Banner
        viewMode={viewMode}
        setViewMode={setViewMode}
        columns={columns}
        onAddTask={() => {
          setEditingTask(null);
          setOpenTaskForm(true);
        }}
        onOpenColumnManager={() => setOpenColumnManager(true)}
      />
      {viewMode == 'board' ? (
        <>
          <Board
            columns={columns}
            tasks={tasks}
            setTasks={setTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
          <TaskForm
            isOpen={openTaskForm}
            onClose={() => {
              setOpenTaskForm(false);
              setEditingTask(null);
            }}
            onSubmit={handleAddOrEditTask}
            columns={columns}
            editingTask={editingTask}
          />
          <ColumnManager
            isOpen={openColumnManager}
            onClose={() => setOpenColumnManager(false)}
            columns={columns}
            onGetAllColumns={handleGetAllColumns}
            onCreateColumn={handleCreateColumn}
            onUpdateColumn={handleUpdateColumn}
            onDeleteColumn={handleDeleteColumn}
          />
        </>
      ) : (
        <div className="p-8 text-center text-xl text-gray-500">
          List View Coming Soon
        </div>
      )}
    </div>
  );
};

export default HomePage;
