import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandIndexedDBStorage } from "./usePersist";
import { InitialTasks } from "@/constants/data";

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
  setTasks: (tasks: Task[]|[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string | number, updatedTask: Partial<Task>) => void;
  getTaskById: (taskId: string | number) => Task | undefined;
  getTaskByPlatform: (platform: string) => Task | undefined;
  removeTask: (taskId: string | number) => void;
  getTasksByUser: (userId: string) => Task[];
  isSubmitted: boolean;
  setAsSubmitted: (isSubmitted: boolean) => void;
}

const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      allTasks: InitialTasks,
      isSubmitted: false,

      setTasks: (newTasks) =>
        set((state) => {
          const updatedTasks = newTasks.map((newTask) => {
            const existingTask = state.tasks.find((task) => task.id === newTask.id);

            // Merge existing task with new task and set `completed` to true
            if (existingTask) {
              return {
                ...existingTask,
                ...newTask,
                completed: true,
              };
            }

            // Add new task with `completed` set to true
            return {
              ...newTask,
              completed: true,
            };
          });

          // Retain tasks not included in `newTasks` and add/merge `updatedTasks`
          const nonDuplicateTasks = state.tasks.filter(
            (task) => !newTasks.some((newTask) => newTask.id === task.id)
          );

          return {
            tasks: [...nonDuplicateTasks, ...updatedTasks],
          };
        }),

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
      getTaskByPlatform: (platform) => get().tasks.find((task) => task.platform === platform),
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

      setAsSubmitted: (isSubmitted) => set({ isSubmitted }),
    }),
    {
      name: "tasks", // Storage key
      storage: createJSONStorage(() => zustandIndexedDBStorage),
    }
  )
);

export default useTaskStore;
