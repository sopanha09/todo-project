import React, { useState } from 'react';
import { Settings, Sparkles, LayoutGrid, Plus, Zap, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Banner = ({
  viewMode,
  setViewMode,
  columns,
  onAddTask,
  onOpenColumnManager,
}) => {
  const [openTaskForm, setOpenTaskForm] = useState(false);

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-90 text-white mx-6 p-8 rounded-xl border border-yellow-200">
      <div className="flex lg:flex-row flex-col gap-6 justify-between ">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">Task Management</h1>
          <div className="flex flex-row gap-2 items-center">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="">Ready to tackle your tasks?</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
            <Button
              variant={viewMode === 'board' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-2 transition-all hover:scale-105 group ${
                viewMode === 'board'
                  ? 'bg-white text-indigo-600 shadow-lg hover:bg-white'
                  : 'text-white hover:text-indigo-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Board
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 transition-all hover:scale-105 group ${
                viewMode === 'list'
                  ? 'bg-white text-indigo-600 shadow-lg hover:bg-white'
                  : 'text-white hover:text-indigo-600'
              }`}
            >
              <List className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              List
            </Button>
          </div>

          <Button
            onClick={() => onAddTask()}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group border-0"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Add Task
            <Zap className="w-4 h-4 ml-2 animate-pulse" />
          </Button>

          <Button
            onClick={onOpenColumnManager}
            className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-xl px-4 py-2 transition-all hover:scale-105"
          >
            <Settings className="w-4 h-4 mr-2 transition-transform duration-500 group-hover:rotate-180" />
            Columns
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
