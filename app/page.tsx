import AuthButton from "@/components/common/auth-button";
import FollowPage from "@/components/follow-us/follow";
import HomePage from "@/components/home/home-page";
import HowToSetupHelperWallet from "@/components/setup-wallet";
import SubmitAddressPage from "@/components/submit-address";
import { WalletSteps } from "@/components/wallet-steps/wallet-steps";
import WorkWithUsPage from "@/components/work-with-us/Index";

export default function Home() {
  return (
    <>
      {/* <AuthButton /> */}
      <HomePage />
      <WorkWithUsPage />
      <HowToSetupHelperWallet/>

      <WalletSteps />
      <SubmitAddressPage />
      <FollowPage />
    </>
  );
}
