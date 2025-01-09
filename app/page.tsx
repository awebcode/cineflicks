import { auth } from "@/auth";
import HomePage from "@/components/home/home-page";
import WorkWithUsPage from "@/components/work-with-us/Index";
import HowToSetupHelperWallet from "@/components/setup-wallet";
import { WalletSteps } from "@/components/wallet-steps/wallet-steps";
import SubmitAddressPage from "@/components/submit-address";
import FollowPage from "@/components/follow-us/follow";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

interface ProfilePageParams {
  searchParams: Promise<{ couponCode: string }>;
}

export default async function Home({ searchParams }: ProfilePageParams) {
  // Extract searchParams and initialize cookies
  const cookieStore = await cookies();
  const storedCouponCode = cookieStore.get("couponCode")?.value;

  // Authenticate the session
  const session = await auth();
  if (!session?.user) {
    // If user is not logged in, return the base components
    return (
      <>
        <HomePage />
        <WorkWithUsPage />
        <HowToSetupHelperWallet />
        <WalletSteps />
        <SubmitAddressPage />
        <FollowPage />
      </>
    );
  }

  // Handle logged-in user logic
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (user && !user.couponCode && storedCouponCode) {
    const coupon = await prisma.influencer.findUnique({
      where: { couponCode: storedCouponCode },
    });

    if (coupon) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          couponCode: coupon.couponCode,
          influencerId: coupon.id,
        },
      });
    }
  }

  // Render the components
  return (
    <>
      <HomePage />
      <WorkWithUsPage />
      <HowToSetupHelperWallet />
      <WalletSteps />
      <SubmitAddressPage />
      <FollowPage />
    </>
  );
}
