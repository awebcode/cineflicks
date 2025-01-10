import { auth } from "@/auth";
import HomePage from "@/components/home/home-page";
import WorkWithUsPage from "@/components/work-with-us/Index";
import HowToSetupHelperWallet from "@/components/setup-wallet";
import WalletStepsImage from "@/components/wallet-steps/WalletStepsImage";
import SubmitAddressPage from "@/components/submit-address";
import FollowPage from "@/components/follow-us/follow";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";


export default async function Home() {
  const cookieStore = await cookies();
  const storedCouponCode = cookieStore.get("couponCode")?.value;
  const session = await auth();
  if (!session?.user) {
    return (
      <>
        <HomePage couponCode={session?.user?.couponCode ?? storedCouponCode} />
        <WorkWithUsPage />
        <HowToSetupHelperWallet />
        <WalletStepsImage />
        <SubmitAddressPage />
        <FollowPage />
      </>
    );
  }

  // Retrieve user from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  // Handle coupon logic for logged-in users
  if (user && !user.couponCode && storedCouponCode) {
    const coupon = await prisma.influencer.findUnique({
      where: { couponCode: storedCouponCode },
    });

    if (coupon) {
      // Check if coupon is expired
      if (coupon.expireTime && coupon.expireTime < new Date()) {
        console.log("Coupon expired:", coupon.couponCode);
      } else {
        // Use a transaction for atomic updates
        await prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: session.user.id },
            data: {
              couponCode: coupon.couponCode,
              influencerId: coupon.id,
            },
          });
          console.log("Coupon applied successfully:", coupon.couponCode);
        });
      }
    }
  }

  return (
    <>
      <HomePage couponCode={user?.couponCode ?? ""} />
      <WorkWithUsPage />
      <HowToSetupHelperWallet />
      <WalletStepsImage />
      <SubmitAddressPage />
      <FollowPage />
    </>
  );
}
