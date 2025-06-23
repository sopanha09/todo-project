import React, { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
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
import toast from 'react-hot-toast';

const colorOptions = [
  '#4f46e5',
  '#2563eb',
  '#7c3aed',
  '#0d9488',
  '#059669',
  '#ea580c',
  '#e11d48',
  '#d97706',
  '#475569',
  '#6b7280',
];

function ColumnManager({
  isOpen,
  onClose,
  columns,
  onCreateColumn,
  onUpdateColumn,
  onDeleteColumn,
}) {
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState(colorOptions[0]);
  const [editingColumn, setEditingColumn] = useState(null);

  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const [columnToDelete, setColumnToDelete] = useState(null);

  const handleCreateColumn = (e) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;

    onCreateColumn({
      title: newColumnTitle.trim(),
      color: newColumnColor,
    });

    setNewColumnTitle('');
    setNewColumnColor(colorOptions[0]);
  };

  const handleUpdateColumn = (e) => {
    e.preventDefault();
    if (!editingColumn || !editingColumn.title.trim()) return;

    onUpdateColumn(editingColumn.id, {
      title: editingColumn.title.trim(),
      color: editingColumn.color,
    });

    setEditingColumn(null);
  };

  const handleDragStart = (e, column) => {
    setDraggedColumn(column);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedColumn) return;

    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
    const draggedIndex = sortedColumns.findIndex(
      (col) => col.id === draggedColumn.id
    );
    if (draggedIndex === targetIndex) return;

    const newColumns = [...sortedColumns];
    const [removed] = newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, removed);

    newColumns.forEach((col, index) => {
      onUpdateColumn(col.id, { order: index });
    });

    setDraggedColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverIndex(null);
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Columns</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Create New Column</h3>
              <form onSubmit={handleCreateColumn} className="space-y-4">
                <div>
                  <Label htmlFor="newTitle">Column Title</Label>
                  <Input
                    id="newTitle"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="Enter column title"
                  />
                </div>

                <div>
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 ${
                          newColumnColor === color
                            ? 'border-gray-800'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewColumnColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-primary-purple text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Column
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Existing Columns</h3>
              <p className="text-sm text-gray-500">
                Drag columns to reorder them
              </p>
            </div>
            <div className="space-y-3">
              {sortedColumns.map((column, index) => (
                <Card
                  key={column.id}
                  className={`transition-all duration-200 ${
                    dragOverIndex === index
                      ? 'ring-2 ring-primary-indigo bg-blue-50'
                      : ''
                  } ${
                    draggedColumn?.id === column.id ? 'opacity-50 scale-95' : ''
                  }`}
                  draggable={editingColumn?.id !== column.id}
                  onDragStart={(e) => handleDragStart(e, column)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <CardContent className="p-4">
                    {editingColumn?.id === column.id ? (
                      <form onSubmit={handleUpdateColumn} className="space-y-4">
                        <div>
                          <Label>Column Title</Label>
                          <Input
                            value={editingColumn.title}
                            onChange={(e) =>
                              setEditingColumn({
                                ...editingColumn,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label>Color</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color}
                                type="button"
                                className={`w-8 h-8 rounded-full border-2 ${
                                  editingColumn.color === color
                                    ? 'border-gray-800'
                                    : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() =>
                                  setEditingColumn({
                                    ...editingColumn,
                                    color,
                                  })
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            size="sm"
                            onClick={() =>
                              toast.success(
                                `"${column.title}" has been updated.`
                              )
                            }
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingColumn(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                            title="Drag to reorder"
                          >
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: column.color }}
                          />
                          <span className="font-medium">{column.title}</span>
                          {/* <Badge variant="outline" className="text-xs">
                            Order: {column.order + 1}
                          </Badge> */}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingColumn(column)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setColumnToDelete(column)}
                                className="text-red-600 hover:text-red-700"
                                disabled={columns.length <= 1}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Column?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete{' '}
                                  <span className="font-semibold">
                                    {columnToDelete?.title}
                                  </span>
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={() => setColumnToDelete(null)}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 text-white hover:bg-red-700"
                                  onClick={() => {
                                    onDeleteColumn(columnToDelete.id);
                                    setColumnToDelete(null);
                                    toast.success(
                                      `"${column.title}" has been removed.`
                                    );
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ColumnManager;
