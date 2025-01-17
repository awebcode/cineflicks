"use client";

import useTaskStore from "@/store/useTaskStore";

import dynamic from "next/dynamic";

const SocialCard = dynamic(() => import("./social-card"), {
  ssr: false,
});

export function WorkWithUsGrid() {
  const { allTasks } = useTaskStore((state) => state);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {allTasks.map((task) => (
        <SocialCard key={task?.id} {...task} />
      ))}
    </div>
  );
}
