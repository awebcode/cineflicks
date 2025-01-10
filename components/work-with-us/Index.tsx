"use client";
import useTaskStore from "@/store/useTaskStore";
import { WorkWithUsGrid } from "./work-with-us-grid";
import { useSession } from "next-auth/react";

export default function WorkWithUsPage() {
  const session = useSession();
  const { getTasksByUser,allTasks } = useTaskStore((state) => state);
  // if (!session.data?.user) return <div>Loading...</div>;
  
  const userTasks = getTasksByUser(session.data?.user?.id as string);
  return (
    <div className="min-h-screen bg-[#1C1C1C] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-5xl font-bold mb-8">Work with us</h1>
        <h1 className="text-gray-100 text-3xl font-semibold">Completed Tasks {userTasks.filter((task) => task.completed).length}/{allTasks.length}</h1>
        <WorkWithUsGrid />
      </div>
    </div>
  );
}
