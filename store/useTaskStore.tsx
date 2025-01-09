import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandIndexedDBStorage } from "./usePersist";
import  { InitialTasks } from "@/constants/data";

interface Task {
  id: string | number;
  userId: string;
  title: string;
  description?: string;
  platform: string;
  socialUrl: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  allTasks: typeof InitialTasks;
  addTask: (task: Task) => void;
  updateTask: (taskId: string | number, updatedTask: Partial<Task>) => void;
  getTaskById: (taskId: string | number) => Task | undefined;
  removeTask: (taskId: string | number) => void;
  getTasksByUser: (userId: string) => Task[];
}

const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      allTasks:InitialTasks,
      

      // Add or update a task in the store
      addTask: (task) =>
        set((state) => {
          const existingTaskIndex = state.tasks.findIndex((t) => t.id === task.id);
          if (existingTaskIndex !== -1) {
            // Update the existing task
            const updatedTasks = [...state.tasks];
            updatedTasks[existingTaskIndex] = {
              ...updatedTasks[existingTaskIndex],
              ...task,
            };
            return { tasks: updatedTasks };
          }
          // Add a new task
          return { tasks: [...state.tasks, task] };
        }),

      // Retrieve a task by its ID
      getTaskById: (taskId) => get().tasks.find((task) => task.id === taskId),

      // Update a task's properties
      updateTask: (taskId, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          ),
        })),

      // Remove a task by its ID
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      // Get all tasks assigned to a specific user
      getTasksByUser: (userId) => get().tasks.filter((task) => task.userId === userId),
    }),
    {
      name: "tasks", // Storage key
      storage: createJSONStorage(() => zustandIndexedDBStorage),
    }
  )
);

export default useTaskStore;

