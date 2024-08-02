import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index >= 0) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTaskSuccess(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
} = taskSlice.actions;

export const fetchTasks = () => async (dispatch: any) => {
  dispatch(fetchTasksStart());
  try {
    const response = await axios.get('/api/tasks');
    dispatch(fetchTasksSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTasksFailure(error.message));
  }
};

export const addTask = (task: Task) => async (dispatch: any) => {
  try {
    const response = await axios.post('/api/tasks', task);
    dispatch(addTaskSuccess(response.data));
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateTask = (task: Task) => async (dispatch: any) => {
  try {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch(updateTaskSuccess(response.data));
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteTask = (taskId: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error: any) {
    console.error(error.message);
  }
};

export default taskSlice.reducer;
