import { auth } from "@/auth";
import AuthButton from "@/components/common/auth-button";
import FollowPage from "@/components/follow-us/follow";
import HomePage from "@/components/home/home-page";
import HowToSetupHelperWallet from "@/components/setup-wallet";
import SubmitAddressPage from "@/components/submit-address";
import WalletStepsImage from "@/components/wallet-steps/WalletStepsImage";
import WorkWithUsPage from "@/components/work-with-us/Index";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

interface HomePageProps {
  searchParams:Promise<{
    couponCode: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const cookieStore = await cookies();
  const storedCouponCode = cookieStore.get("couponCode")?.value;
  const session = await auth();

  // Resolve the coupon code from the searchParams promise
  const { couponCode } = await searchParams;

  // Use the couponCode from the URL search params or the cookie
  const initialCouponCode = couponCode || storedCouponCode;

  if (!session?.user) {
    return (
      <>
        <nav>
          <div className="z-[9999] fixed w-full flex justify-end top-4 right-0">
            <div className="max-w-7xl px-6 xl:px-12 flex justify-end w-full mx-auto relative">
              <AuthButton />
            </div>
          </div>
        </nav>
        <HomePage couponCode={initialCouponCode} />
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
    where: { id: session.user?.id },
  });

  let coupon: any = null;

  // Handle coupon logic for logged-in users
  if (user && !user.couponCode && initialCouponCode) {
    coupon = await prisma.influencer.findUnique({
      where: { couponCode: initialCouponCode },
    });

    if (coupon) {
      // Check if coupon is expired
      if (coupon.expireTime && coupon.expireTime < new Date()) {
        console.log("Coupon expired:", coupon.couponCode);
        return (
          <div>
            <p>The coupon code has expired.</p>
          </div>
        );
      } else {
        // Apply the coupon if not expired
        await prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: session.user?.id },
            data: {
              couponCode: coupon.couponCode,
              influencerId: coupon?.id,
            },
          });
          console.log("Coupon applied successfully:", coupon.couponCode);
        });
      }
    } else {
      console.log("Invalid coupon code.");
      return (
        <div>
          <p>Invalid coupon code.</p>
        </div>
      );
    }
  } else if (user?.couponCode) {
    // Fetch coupon details for the user's existing coupon code
    coupon = await prisma.influencer.findUnique({
      where: { couponCode: user.couponCode },
    });
  }

  return (
    <>
      <nav>
        <div className="z-[9999] fixed w-full flex justify-end top-4 right-0">
          <div className="max-w-7xl px-6 xl:px-12 flex justify-end w-full mx-auto relative">
            <AuthButton />
          </div>
        </div>
      </nav>
      <HomePage couponCode={user?.couponCode ?? ""} image={coupon?.image ?? ""} />
      <WorkWithUsPage />
      <HowToSetupHelperWallet />
      <WalletStepsImage />
      <SubmitAddressPage />
      <FollowPage />
    </>
  );
}
