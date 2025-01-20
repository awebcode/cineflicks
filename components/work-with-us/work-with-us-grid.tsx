"use client";

import { cn } from "@/lib/utils";
import useTaskStore from "@/store/useTaskStore";

import dynamic from "next/dynamic";

const SocialCard = dynamic(() => import("./social-card"), {
  ssr: false,
});

export function WorkWithUsGrid() {
  const { allTasks } = useTaskStore((state) => state);
  return (
    <div className="grid grid-cols-12 gap-y-8 md:gap-5 xl:gap-10">
      {allTasks.map((task, index) => (
        <SocialCard
          className={cn(
            index <= 2
              ? "col-span-12 md:col-span-6 lg:col-span-4"
              : "col-span-12 md:col-span-6 lg:col-span-6"
          )}
          key={task?.id}
          {...task}
        />
      ))}
    </div>
  );
}
