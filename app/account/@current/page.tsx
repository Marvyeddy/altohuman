import CurrentPlanPage from "@/components/custom/CurrentPlanPage";
import { getCurrentUserData } from "@/lib/backend-api";
import { headers } from "next/headers";

const CurrentPlan = async () => {
  const allHeaders = await headers();
  const user_data = await getCurrentUserData(allHeaders.get("cookie") || "");

  return <CurrentPlanPage userData={user_data} />;
};

export default CurrentPlan;
