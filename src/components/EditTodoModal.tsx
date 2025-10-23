/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { capitalizeFirstWord } from '../hooks/capitalise';
import { EditIcon } from 'lucide-react';
import { toast } from 'sonner';
import { persister } from '@/providers/QueryProvider';
import { persistQueryClient } from '@tanstack/query-persist-client-core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  [key: string]: any;
}

interface EditTodoModalProps {
  todo: Todo;
}

interface FormData {
  title: string;
}

export default function EditTodoModal({ todo }: EditTodoModalProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: todo?.title || '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      let updatedTodo: Todo;

      if (todo.id > 200) {
        updatedTodo = { ...todo, title: capitalizeFirstWord(data.title) };
        toast.success('Todo updated');
      } else {
        const toastId = toast.loading('Updating Todo...');
        const response = await axios.put<Todo>(
          `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
          { ...todo, title: capitalizeFirstWord(data.title) }
        );
        updatedTodo = response.data;
        toast.dismiss(toastId);
        toast.success('Todo updated');
      }

      return updatedTodo;
    },
    onSuccess: async (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((t) => (t.id === todo.id ? { ...t, ...updatedTodo } : t))
      );

      await persistQueryClient({
        queryClient,
        persister,
      });

      setOpen(false);
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='rounded-full cursor-pointer p-4 px-2 bg-[#0718472d]'
        >
          <EditIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>

          <Input
            {...register('title', { required: true })}
            className='my-4 text-slate-900'
          />

          <DialogFooter>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>

            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
