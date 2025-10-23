/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
// import { queryClient } from '../lib/queryClient';
// // import { getCachedTodos } from '../utils/cache';

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// const axiosConfig = () => ({
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const handleResponse = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response.data;
//   } else {
//     throw new Error(`Request failed with status ${response.status}`);
//   }
// };

// export const getTodods = async () => {
//   const url = `${BASE_URL}/todos`;

//   try {
//     const response = await axios.get(url, axiosConfig());
//     return handleResponse(response);
//   } catch (error) {
//     // console.log(error);
//     if (error?.code === 'ERR_NETWORK') {
//       const cached = queryClient.getQueryData(['todos']);
//       // console.log('Theone', cached);
//       if (cached) {
//         return cached;
//       } else {
//         getTodods();
//       }
//     }

//     console.log('Error fetching todos:', error);
//     throw error;
//   }
// };

// // export const getTodods = async () => {
// //   const url = `${BASE_URL}/todos`;

// //   const response = await axios.get(url, axiosConfig());
// //   return handleResponse(response);
// // };

// export const getTodoById = async (id) => {
//   const cached = queryClient.getQueryData(['todos']);
//   try {
//     if (id > 200) {
//       if (cached && Array.isArray(cached)) {
//         const matched = cached.find((todo) => todo.id === Number(id));
//         if (matched) {
//           return matched;
//         }
//       } else {
//         getTodoById(id);
//       }
//     } else {
//       const url = `${BASE_URL}/todos/${id}`;
//       const response = await axios.get(url, axiosConfig());

//       return handleResponse(response);
//     }
//   } catch (error) {
//     if (error?.code === 'ERR_NETWORK') {
//       // console.log('Theone', cached);
//       if (cached && Array.isArray(cached)) {
//         const matched = cached.find((todo) => todo.id === Number(id));
//         if (matched) {
//           return matched;
//         }
//       } else {
//         getTodoById(id);
//       }
//     }
//     console.error('Error:', error);

//     throw error;
//   }
// };

// export const createTodo = async (param) => {
//   try {
//     const url = `${BASE_URL}/todos`;
//     const response = await axios.post(url, param, axiosConfig());

//     return handleResponse(response);
//   } catch (error) {
//     console.error('Error:', error);

//     throw error;
//   }
// };

// export const updateTodo = async (id, param) => {
//   try {
//     const url = `${BASE_URL}/todos/${id}`;
//     const response = await axios.put(url, param, axiosConfig());

//     return handleResponse(response);
//   } catch (error) {
//     console.error('Error:', error);

//     throw error;
//   }
// };

// export const deleteTodo = async (id) => {
//   try {
//     const url = `${BASE_URL}/todos/${id}`;
//     const response = await axios.delete(url, axiosConfig());

//     return handleResponse(response);
//   } catch (error) {
//     console.error('Error:', error);

//     throw error;
//   }
// };

import axios, { AxiosResponse } from 'axios';
import { queryClient } from '@/lib/queryClient';

// You can define this in `.env.local` like: NEXT_PUBLIC_BASE_URL=https://your-api.com
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  [key: string]: any;
}

interface CreateTodoParams {
  title: string;
  completed?: boolean;
  [key: string]: any;
}

interface UpdateTodoParams {
  title: string;
  completed?: boolean;
  [key: string]: any;
}

const axiosConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleResponse = <T>(response: AxiosResponse<T>): T => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(`Request failed with status ${response.status}`);
};

// ✅ GET all todos
export const getTodods = async (): Promise<Todo[]> => {
  const url = `${BASE_URL}/todos`;

  try {
    const response = await axios.get<Todo[]>(url, axiosConfig());
    return handleResponse(response);
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK') {
      const cached = queryClient.getQueryData<Todo[]>(['todos']);
      if (cached) {
        return cached;
      } else {
        return getTodods();
      }
    }
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// ✅ GET todo by ID
export const getTodoById = async (id: number): Promise<Todo | undefined> => {
  const cached = queryClient.getQueryData<Todo[]>(['todos']);

  try {
    if (id > 200) {
      if (cached && Array.isArray(cached)) {
        const matched = cached.find((todo) => todo.id === id);
        if (matched) return matched;
      } else {
        return getTodoById(id);
      }
    } else {
      const url = `${BASE_URL}/todos/${id}`;
      const response = await axios.get<Todo>(url, axiosConfig());
      return handleResponse(response);
    }
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK') {
      if (cached && Array.isArray(cached)) {
        const matched = cached.find((todo) => todo.id === id);
        if (matched) return matched;
      } else {
        return getTodoById(id);
      }
    }
    console.error('Error fetching todo:', error);
    throw error;
  }
};

// ✅ CREATE todo
export const createTodo = async (param: CreateTodoParams): Promise<Todo> => {
  try {
    const url = `${BASE_URL}/todos`;
    const response = await axios.post<Todo>(url, param, axiosConfig());
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// ✅ UPDATE todo
export const updateTodo = async (
  id: number,
  param: UpdateTodoParams
): Promise<Todo> => {
  try {
    const url = `${BASE_URL}/todos/${id}`;
    const response = await axios.put<Todo>(url, param, axiosConfig());
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// ✅ DELETE todo
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const url = `${BASE_URL}/todos/${id}`;
    const response = await axios.delete(url, axiosConfig());
    handleResponse(response);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
