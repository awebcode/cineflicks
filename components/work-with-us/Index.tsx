"use client";
import useTaskStore from "@/store/useTaskStore";
import { useSession } from "next-auth/react";
import { WorkWithUsGrid } from "./work-with-us-grid";

export default function WorkWithUsPage() {
  const session = useSession();
  const { getTasksByUser, allTasks } = useTaskStore((state) => state);
  // if (!session.data?.user) return <div>Loading...</div>;

  const userTasks = getTasksByUser(session.data?.user?.id as string);
  return (
    <div className="min-h-screen bg-[#1C1C1C] p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8">
          Work with us
        </h2>
        <h3 className="text-gray-100 mb-4 text-lg lg:text-2xl font-semibold">
          Completed Tasks {userTasks.filter((task) => task.completed).length}/
          {allTasks.length}
        </h3>
        <WorkWithUsGrid />
      </div>
    </div>
  );
}
