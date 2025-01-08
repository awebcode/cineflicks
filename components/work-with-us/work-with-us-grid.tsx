import { SocialCard } from "./social-card";

export function WorkWithUsGrid() {
  const tasks = [
    {
      id: 1,
      platform: "X",
      status: "completed",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      platform: "Facebook",
      status: "pending",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 3,
      platform: "Facebook",
      status: "pending",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 4,
      platform: "X",
      status: "completed",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 5,
      platform: "Facebook",
      status: "pending",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 6,
      platform: "Facebook",
      status: "pending",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    },

    // Add more tasks as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <SocialCard key={task.id} {...task as any} />
      ))}
    </div>
  );
}
