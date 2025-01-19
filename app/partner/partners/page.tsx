import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VideoPlayerWrapper from "@/app/(landing)/_components/VideoPlayer";

// Skeleton component for loading state
const PartnerSkeleton = () => (
  <div className="p-2 w-full h-full">
    <div className="h-full space-y-4 flex flex-col justify-between p-5 rounded-[8px] bg-[#202020] py-4 border border-[#262626] animate-pulse">
      <div className="space-y-3">
        <div className="flex relative overflow-hidden w-full items-center gap-4">
          <div className="w-[92px] h-[90px] rounded-[8px] bg-[#333]"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-1/2 bg-[#333] rounded"></div>
            <div className="h-4 w-3/4 bg-[#333] rounded"></div>
          </div>
        </div>
        <div className="h-4 w-full bg-[#333] rounded"></div>
      </div>
      <div className="aspect-video bg-[#333] rounded"></div>
    </div>
  </div>
);

// Fetch partners on the server side
const fetchPartners = async () => {
  try {
    const partners = await prisma.partner.findMany();
    return partners;
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
};

const PartnersPage = async () => {
  const partners = await fetchPartners();

  return (
    <section className="bg-[#262626] py-12 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-xl lg:text-2xl  font-bold mb-6">
          All <span className="text-[#F2AA4C]">Partners ({partners.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.length === 0
            ? // Show skeletons if no partners are found
              Array(6)
                .fill(0)
                .map((_, idx) => <PartnerSkeleton key={idx} />)
            : partners.map((partner) => (
                <div key={partner.id} className="p-2 w-full h-full">
                  <div className="h-full space-y-4 flex flex-col justify-between p-5 rounded-[8px] bg-[#202020] py-4 border border-[#262626]">
                    <div className="space-y-3">
                      <div className="flex relative overflow-hidden w-full items-center gap-4">
                        <Avatar className="w-[92px] h-[90px] rounded-[8px]">
                          <AvatarImage
                            className="w-full h-full"
                            src={
                              partner.photoUrl ||
                              "https://avatars.githubusercontent.com/u/92237522?v=4"
                            }
                          />
                          <AvatarFallback className="w-[92px] h-[90px] rounded-[8px]">
                            {partner.title.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-base lg:text-xl font-medium">
                            {partner.title}
                          </p>
                          {partner.link && (
                            <a
                              className="inline-flex items-center gap-1.5 text-sm lg:text-base text-[#999] hover:text-[#D48641] transition-colors truncate max-w-full group"
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="shrink-0">Link:</span>
                              <span className="truncate text-[#D48641] group-hover:underline">
                                {partner.link.replace(/^https?:\/\//, "")}
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-sm w-full lg:text-base 2xl:text-xl text-[#999999]">
                        {partner.description}
                      </p>
                    </div>
                    <div className="aspect-video">
                      {partner.videoUrl && <VideoPlayerWrapper url={partner.videoUrl} />}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersPage;
