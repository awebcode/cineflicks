import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthButton from "@/components/common/auth-button";

interface InfluencerDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function InfluencerDetailsPage({
  params,
}: InfluencerDetailsPageProps) {
  // Authenticate user
  const { id: influencerId } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (session?.user.role !== "ADMIN") {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p className="text-gray-500">
          You need to be logged in to view this page. <AuthButton />
        </p>
      </div>
    );
  }

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

  // Fetch influencer data including tasks and users
  const influencer = await prisma.influencer.findUnique({
    where: { id: influencerId },
    include: { users: { include: { tasks: true } } },
  });

  if (!influencer) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Influencer Not Found</h1>
        <p className="text-gray-500">
          The requested influencer profile could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Influencer Card */}
          <Card>
              <CardTitle className="text-2xl font-semibold p-2">#Influencer Details {influencerId}</CardTitle>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={undefined} alt={influencer.name} />
              <AvatarFallback>{influencer.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">{influencer.name}</CardTitle>
              <Badge variant="outline" className="mt-1">
                Coupon: {influencer.couponCode}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <p>Member since: {new Date(influencer.createdAt).toLocaleDateString()}</p>
          <p>Total Users: {influencer.users.length}</p>
        </CardContent>
      </Card>

      {/* Users Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Users ({influencer.users.length})</h2>
        <div className="space-y-4">
          {influencer.users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="text-lg font-medium">{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Total Tasks: {user.tasks?.length || 0}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
