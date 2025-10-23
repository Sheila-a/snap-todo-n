/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface ConfirmDeleteDialogProps {
  todoId: number;
}

export default function ConfirmDeleteDialog({
  todoId,
}: ConfirmDeleteDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const toastId = toast.loading('Deleting Todo...');
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`
      );
      toast.dismiss(toastId);
      toast.success('Todo Deleted');
    },
    onSuccess: () => {
      queryClient.setQueryData(['todos'], (old: any[] = []) =>
        old.filter((t) => t.id !== todoId)
      );
      toast.success('Todo Deleted');
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-red-500 rounded-full cursor-pointer p-4 px-2 bg-[#0718472d]'
        >
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this todo?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
