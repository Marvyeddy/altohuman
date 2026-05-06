import Payment from "@/components/custom/Payment";
import { auth } from "@/lib/auth";
import { getCurrentUserData } from "@/lib/backend-api";
import { headers } from "next/headers";

const PricingPage = async () => {
  const allHeaders = await headers();
  const session = await auth.api.getSession({
    headers: allHeaders,
  });

  const user_data = await getCurrentUserData(allHeaders.get("cookie") || "");

  return <Payment Session={session} userData={user_data} />;
};

export default PricingPage;
