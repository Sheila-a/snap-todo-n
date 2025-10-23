'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Plus, RefreshCcw } from 'lucide-react';
import ListLoading from '@/components/skeleton/ListLoading';
import { Button } from '@/components/ui/button';
import { getTodods } from '@/services/api';
import {
  AddTodoModal,
  FilterDropdown,
  PaginationControls,
  TodoCard,
} from '@/components';
import TodosLayout from '@/layout/Layout';

const TodosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    data: todos = [],
    isLoading,
    isError,
    // isFetched,
    status,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodods,
    staleTime: 1000 * 60 * 10,
    retry: false,
    structuralSharing: false,
  });

  useEffect(() => {
    getTodods();
  }, []);

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (searchTerm) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      const completed = filterStatus === 'complete';
      result = result.filter((todo) => todo.completed === completed);
    }
    return result;
  }, [todos, searchTerm, filterStatus]);

  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * 10;
    return filteredTodos.slice(start, start + 10);
  }, [filteredTodos, currentPage]);

  if (isLoading)
    return (
      <TodosLayout>
        <div className='min-h-screen container mx-auto'>
          <div className='flex items-center pt-28 justify-between mb-4'>
            <h1 className='text-2xl font-bold text-white '>My Todos</h1>
          </div>
          <ListLoading count={4} />
        </div>
      </TodosLayout>
    );

  if (status === 'error' && isError && !todos)
    return (
      <p className='text-center mt-10 text-red-500'>Failed to load todos.</p>
    );

  return (
    <TodosLayout
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    >
      {' '}
      <section className='container mx-auto pt-28 '>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14 mt-8'>
          <span className='flex items-center gap-4'>
            <h3 className='text-white text-lg'>Filter: </h3>
            <FilterDropdown
              value={filterStatus}
              onChange={setFilterStatus}
            />{' '}
          </span>
          <span className='flex items-center gap-4'>
            <Button
              onClick={() => setOpen(true)}
              className='p-6 bg-white rounded-full text-[#071847] hover:bg-white/50'
            >
              <Plus className='w-4 h-4 mr-2' />
              New Todo
            </Button>
            <Button
              onClick={getTodods}
              className='bg-white rounded-full text-[#071847] hover:bg-white/50 p-6 px-4'
            >
              <RefreshCcw />
            </Button>
          </span>
        </div>

        <AddTodoModal open={open} setOpen={setOpen} />

        <div className='grid gap-4'>
          {paginatedTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onClick={() => router.push(`/todos/${todo.id}`)}
            />
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalItems={filteredTodos.length}
          onPageChange={setCurrentPage}
        />
      </section>
    </TodosLayout>
  );
};

export default TodosPage;
