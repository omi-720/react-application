import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LOCAL_KEY = "ptm_tasks_v1";

// fetch some sample todos to seed
export const fetchInitialTasks = createAsyncThunk("tasks/fetchInitial", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=8");
  return res.data.map(t => ({
    id: t.id,
    title: t.title,
    description: "",
    priority: "medium",
    completed: !!t.completed,
    source: "api"
  }));
});

const saved = typeof window !== "undefined" ? localStorage.getItem(LOCAL_KEY) : null;
const initialTasks = saved ? JSON.parse(saved) : [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: initialTasks,
    loading: false,
    error: null,
    filter: "ALL" // ALL | COMPLETED | PENDING
  },
  reducers: {
    addTask: (state, action) => { state.tasks.unshift(action.payload); },
    toggleTask: (state, action) => {
      const t = state.tasks.find(x => x.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(x => x.id !== action.payload);
    },
    editTask: (state, action) => {
      const idx = state.tasks.findIndex(x => x.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    setFilter: (state, action) => { state.filter = action.payload; },
    clearTasks: (state) => { state.tasks = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialTasks.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchInitialTasks.fulfilled, (s, a) => {
        s.loading = false;
        // merge new ones if not duplicate
        const existingIds = new Set(s.tasks.map(t => t.id));
        a.payload.forEach(p => { if (!existingIds.has(p.id)) s.tasks.push(p); });
      })
      .addCase(fetchInitialTasks.rejected, (s, a) => {
        s.loading = false; s.error = a.error.message || "Failed to fetch";
      });
  }
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter, clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
