import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { capitalizeFirstWord } from '../hooks/capitalise';
import { toast } from 'sonner';

interface AddTodoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface TodoFormData {
  title: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open = false,
  setOpen = () => {},
}) => {
  const { register, handleSubmit, reset } = useForm<TodoFormData>();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TodoFormData): Promise<Todo> => {
      const toastId = toast.loading('Creating Todo...');

      const response = await axios.post<Todo>(
        'https://jsonplaceholder.typicode.com/todos',
        {
          ...data,
          title: capitalizeFirstWord(data.title),
          completed: false,
          userId: 1,
        }
      );

      toast.dismiss(toastId);
      toast.success('Todo created successfully');
      return response.data;
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => [
        newTodo,
        ...oldTodos,
      ]);
      setOpen(false);
      reset();
    },
    onError: () => {
      toast.error('Failed to create todo');
    },
  });

  const onSubmit: SubmitHandler<TodoFormData> = (data) => mutate(data);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
          </DialogHeader>

          <Input
            placeholder='Todo title'
            {...register('title', { required: true })}
            className='my-4'
          />

          <DialogFooter>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
            <DialogClose asChild>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
