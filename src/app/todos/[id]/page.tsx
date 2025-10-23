'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTodoById } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { ConfirmDeleteDialog, EditTodoModal } from '@/components';
import Layout from '@/layout/Layout';
import { Todo } from '@/components/EditTodoModal';

interface TodoDetailPageProps {
  params: { id: string };
}

const TodoDetailPage = ({ params }: TodoDetailPageProps) => {
  const router = useRouter();
  const { id } = params;
  console.log(id);

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery<Todo>({
    queryKey: ['todos', id],
    queryFn: async () => {
      const todo = await getTodoById(Number(id));
      if (!todo) throw new Error('Todo not found');
      return todo;
    },
  });

  if (isLoading) return <p className='text-center mt-10'>Loading todo...</p>;

  if (isError || !todo)
    return <p className='text-center text-red-500'>Error loading todo.</p>;

  return (
    <Layout>
      <div className='min-h-screen pt-28'>
        <Button
          variant='ghost'
          onClick={() => router.back()}
          className='mb-4 mx-[7vw] bg-white flex items-center'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back
        </Button>

        <section className='w-full mx-auto container p-6 bg-white rounded-xl shadow mt-8'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold'>Todo Details</h1>
            <span className='flex gap-3'>
              <EditTodoModal todo={todo} />
              <ConfirmDeleteDialog todoId={todo.id} />
            </span>
          </div>

          <p className='text-lg mb-2'>
            <strong>ID:</strong> {todo.id}
          </p>
          <p className='text-lg mb-2'>
            <strong>Title:</strong> {todo.title}
          </p>

          <div className='flex items-center gap-2'>
            <strong>Status:</strong>
            {todo.completed ? (
              <span className='text-green-600 flex items-center'>
                <CheckCircle className='w-4 h-4 mr-1' /> Completed
              </span>
            ) : (
              <span className='text-gray-600 flex items-center'>
                <Circle className='w-4 h-4 mr-1' /> Incomplete
              </span>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TodoDetailPage;
