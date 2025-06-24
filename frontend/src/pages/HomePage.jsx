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

const DEFAULT_COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#FFC300', order: 0 },
  { id: 'inprogress', title: 'In Progress', color: '#00BFFF', order: 1 },
  { id: 'done', title: 'Done', color: '#28A745', order: 2 },
];

const HomePage = () => {
  const [viewMode, setViewMode] = useState('board');
  const [tasks, setTasks] = useState([]);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [openColumnManager, setOpenColumnManager] = useState(false);
  const [columns, setColumns] = useState([]);
  const [timeout, setTimeout] = useState();
  const navigate = useNavigate();

  const handleGetAllColumns = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setColumns(DEFAULT_COLUMNS);
      return;
    }
    try {
      const res = await getColumns(token);
      const mapped = (res.data || []).map((col) => ({
        ...col,
        id: col._id,
      }));
      setColumns(mapped);
      console.log('Columns fetched:', mapped);
    } catch (err) {
      console.error('Error fetching columns:', err);
      setColumns([]);
    }
  };

  const handleCreateColumn = async (column) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    try {
      const res = await createColumn(column, token);
      const newCol = { ...res.data, id: res.data._id };
      setColumns((prev) => [...prev, newCol]);
      toast.success(`Column "${column.title}" created successfully!`);
    } catch (err) {
      console.error('Error creating column:', err);
      toast.error('Failed to create column');
    }
  };

  useEffect(() => {
    handleGetAllColumns();
  }, []);

  const handleUpdateColumn = async (columnId, data) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    try {
      const res = await updateColumn(columnId, data, token);
      const updatedCol = { ...res.data, id: res.data._id };
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? updatedCol : col))
      );
      toast.success(
        `Column "${data.title || `Order ${data.order}`}" updated successfully!`
      );
    } catch (err) {
      console.error('Error updating column:', err);
      toast.error('Failed to update column');
    }
  };

  const handleDeleteColumn = async (columnId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const col = columns.find((col) => col.id === columnId);
      await deleteColumn(columnId, token);
      setColumns((prev) => prev.filter((col) => col.id !== columnId));
      toast.success(`Column "${col?.title || ''}" deleted successfully!`);
    } catch (err) {
      console.error('Error deleting column:', err);
      toast.error('Failed to delete column');
    }
  };

  const handleGetAllTasks = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await getTasks(token);
      const mapped = (res.data || []).map((task) => ({
        ...task,
        id: task._id,
        column_id: task.column_id?._id || task.column_id,
      }));
      setTasks(mapped);
      console.log('Tasks fetched:', mapped);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
    }
  };

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  const handleAddOrEditTask = async (task) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setTimeout(() => {
          localStorage.removeItem('accessToken');
          navigate('/auth/login', { replace: true });
        }, 800);
        return;
      }
      if (editingTask) {
        await updateTask(editingTask.id, task, token);
        await handleGetAllTasks();
        toast.success(`Task "${task.title}" updated successfully!`);
      } else {
        const res = await createTask(task, token);
        const newTask = {
          ...res.data,
          id: res.data._id,
          column_id: res.data.column_id?._id || res.data.column_id,
        };
        setTasks((prev) => [...prev, newTask]);
        toast.success(`Task "${task.title}" created successfully!`);
      }
    } catch (err) {
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

  const handleReorderColumns = (newColumns) => {
    setColumns(newColumns);
  };

  return (
    <div>
      <Header />
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
            onGetAllTasks={handleGetAllTasks}
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
            onReorderColumns={handleReorderColumns}
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
