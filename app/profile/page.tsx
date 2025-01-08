// app/profile/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthButton from "@/components/common/auth-button";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default async function ProfilePage() {
  // Authenticate user
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p className="text-gray-500">
          You need to be logged in to view this page. <AuthButton />
        </p>
      </div>
    );
  }

  // Fetch user data including tasks
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { tasks: true },
  });

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">User Not Found</h1>
        <p className="text-gray-500">The requested user profile could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
              <p className="text-gray-500">{user.email}</p>
              <Badge variant="outline" className="mt-1">
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4 flex justify-between items-center">
          <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          <form>
            {" "}
            <Button
              variant={"destructive"}
              formAction={async () => {
                "use server";
                await signOut();
              }}
            >
              {" "}
              Logout
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Tasks ({user.tasks.length})</h2>
        {user.tasks.length > 0 ? (
          <div className="space-y-4">
            {user.tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{task.description || "No description provided"}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    View Task
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
}
