import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { formatRelativeTime, formatFullDate } from '@/utils/date-utils';
import toast from 'react-hot-toast';

function getPriorityColor(priority) {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const initialColumns = [
  { id: 'todo', title: 'To Do', color: '#FF5733' },
  { id: 'doing', title: 'Doing', color: '#33C1FF' },
  { id: 'done', title: 'Done', color: '#75FF33' },
];

const initialTasks = [
  {
    id: 'task-1',
    columnId: 'todo',
    title: 'Design UI',
    description: 'Create wireframes',
    priority: 'high',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'task-2',
    columnId: 'doing',
    title: 'API Integration',
    description: 'Connect backend',
    priority: 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'task-3',
    columnId: 'done',
    title: 'Project Planning',
    description: 'Define scope',
    priority: 'low',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

function BoardColumn({ column, tasks, onEditTask, onDeleteTask, onMoveTask }) {
  const [draggedOver, setDraggedOver] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    onMoveTask(taskId, column.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex-shrink-0 xl:w-1/4 lg:w-1/3 w-72">
      <Card
        className={`h-full transition-colors ${
          draggedOver ? 'ring-2 ring-blue-400' : ''
        }`}
        style={{ backgroundColor: `${column.color}10` }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              {column.title}
            </div>
            <Badge variant="secondary">{tasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="cursor-move hover:shadow-md transition-shadow bg-white"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id);
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800 line-clamp-2">
                    {task.title}
                  </h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditTask(task)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteTask(task)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {task.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="flex flex-col gap-1 mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span title={formatFullDate(task.createdAt)}>
                      Created {formatRelativeTime(task.createdAt)}
                    </span>
                  </div>
                  {task.updatedAt !== task.createdAt && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <Edit className="w-3 h-3" />
                      <span title={formatFullDate(task.updatedAt)}>
                        Updated {formatRelativeTime(task.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  {task.dueDate && (
                    <Badge variant="outline" className="text-xs">
                      Due: {formatDate(task.dueDate)}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No tasks yet</p>
              <p className="text-sm">Drag tasks here or create a new one</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteTask}
        onOpenChange={(open) => {
          if (!open) setDeleteTask(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{deleteTask?.title}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTask(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                onDeleteTask(deleteTask.id);
                setDeleteTask(null);
                toast.success(
                  `"${deleteTask.title}" has been removed success.`
                );
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Board({ columns, tasks, setTasks, onEditTask }) {
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  const onMoveTask = (taskId, newColumnId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  };

  const onDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="mx-6">
      <div className="flex xl:gap-6 gap-4 py-8 overflow-x-auto w-full min-w-0 snap-x touch-pan-x">
        {sortedColumns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column.id)}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
