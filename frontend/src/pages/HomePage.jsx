import React, { use, useState } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Board from '@/components/Board';
import TaskForm from '@/components/TaskForm';
import ColumnManager from '@/components/ColumnManager';

const initialColumns = [
  { id: 'todo', title: 'To Do', color: '#FF5733' },
  { id: 'doing', title: 'Doing', color: '#33C1FF' },
  { id: 'done', title: 'Done', color: '#75FF33' },
];

const HomePage = () => {
  const [viewMode, setViewMode] = useState('board');
  // const [columns] = useState(initialColumns);
  const [tasks, setTasks] = useState([]);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [openColumnManager, setOpenColumnManager] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  const handleCreateColumn = (column) => {
    setColumns((prev) => [
      ...prev,
      {
        ...column,
        id: `col-${Date.now()}`,
        order: prev.length,
      },
    ]);
  };

  const handleUpdateColumn = (columnId, data) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, ...data } : col))
    );
  };

  const handleDeleteColumn = (columnId) => {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
  };

  const handleAddOrEditTask = (task) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...task, updatedAt: Date.now() } : t
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        {
          ...task,
          id: `task-${Date.now()}`,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]);
    }
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpenTaskForm(true);
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
            onEditTask={handleEditTask}
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
