import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthButton from "@/components/common/auth-button";
import ReactPlayer from "react-player";
import Image from "next/image"; // Import Next.js image component
import Player from "./Player";

interface PartnerDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PartnerDetailsPage({ params }: PartnerDetailsPageProps) {
  // Authenticate user
  const { id: partnerId } = await params;
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

  // Fetch partner data
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
  });

  if (!partner) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Partner Not Found</h1>
        <p className="text-gray-500">The requested partner profile could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Partner Card */}
      <Card>
        <CardTitle className="text-2xl font-semibold p-2">
          #Partner Details {partnerId}
        </CardTitle>
        <CardHeader>
          <div className="flex items-center gap-4">
            {/* Image Section */}
            {partner.photoUrl && (
              <div className="w-24 h-24">
                <Image
                  src={partner.photoUrl}
                  alt={partner.title}
                  width={96}
                  height={96}
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-2xl font-semibold">{partner.title}</CardTitle>
              <Badge variant="outline" className="mt-1">
                Link: {partner.link ? partner.link : "Not provided"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <p>Title: {partner.title}</p>
          <p>Description: {partner.description}</p>
          <p>Member since: {new Date(partner.createdAt).toLocaleDateString()}</p>
          <p>Updated at: {new Date(partner.updatedAt).toLocaleDateString()}</p>
        </CardContent>
      </Card>

      {/* Video Section */}
      {partner.videoUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Partner Video</h2>
          <Player url={partner.videoUrl} />
        </div>
      )}
    </div>
  );
}
