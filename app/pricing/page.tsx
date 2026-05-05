import Payment from "@/components/custom/Payment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PricingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return <Payment Session={session} />;
};

export default PricingPage;
