import { createSlice, nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  tasks: [],
  filters: { showCompleted: true, priority: 'All', sort: 'dueDateAsc' },
  syncQueue: [],
};

const sortFns = {
  dueDateAsc: (a, b) =>
    dayjs(a.dueDateISO).valueOf() - dayjs(b.dueDateISO).valueOf(),
  dueDateDesc: (a, b) =>
    dayjs(b.dueDateISO).valueOf() - dayjs(a.dueDateISO).valueOf(),
  priority: (a, b) =>
    ({ High: 3, Medium: 2, Low: 1 }[b.priority] -
    { High: 3, Medium: 2, Low: 1 }[a.priority]),
  createdAt: (a, b) =>
    dayjs(b.createdAtISO).valueOf() - dayjs(a.createdAtISO).valueOf(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
        state.syncQueue.push({ op: 'add', payload: action.payload });
      },
      prepare(task) {
        const now = dayjs().toISOString();
        return {
          payload: {
            id: nanoid(),
            title: task.title,
            description: task.description || '',
            dueDateISO: task.dueDateISO,
            priority: task.priority || 'Low',
            completed: false,
            createdAtISO: now,
            updatedAtISO: now,
            reminderScheduled: false,
          },
        };
      },
    },
    editTask(state, action) {
      const { id, updates } = action.payload;
      const idx = state.tasks.findIndex(t => t.id === id);
      if (idx >= 0) {
        state.tasks[idx] = {
          ...state.tasks[idx],
          ...updates,
          updatedAtISO: dayjs().toISOString(),
        };
        state.syncQueue.push({ op: 'edit', payload: { id, updates } });
      }
    },
    deleteTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter(t => t.id !== id);
      state.syncQueue.push({ op: 'delete', payload: { id } });
    },
    toggleComplete(state, action) {
      const id = action.payload;
      const t = state.tasks.find(x => x.id === id);
      if (t) {
        t.completed = !t.completed;
        t.updatedAtISO = dayjs().toISOString();
        state.syncQueue.push({ op: 'toggleComplete', payload: { id } });
      }
    },
    markReminderScheduled(state, action) {
      const id = action.payload;
      const t = state.tasks.find(x => x.id === id);
      if (t) t.reminderScheduled = true;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    sortInPlace(state) {
      const fn = sortFns[state.filters.sort] || sortFns.dueDateAsc;
      state.tasks.sort(fn);
    },
    clearSyncQueue(state) {
      state.syncQueue = [];
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  markReminderScheduled,
  setFilters,
  sortInPlace,
  clearSyncQueue,
} = tasksSlice.actions;

export default tasksSlice.reducer;
