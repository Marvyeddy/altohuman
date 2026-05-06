import CurrentPlanPage from "@/components/custom/CurrentPlanPage";
import { headers } from "next/headers";

const CurrentPlan = async () => {
  const allHeaders = await headers();
  const response = await fetch(
    "https://humped-footwork-dividing.ngrok-free.dev/api/v1/user/me",
    {
      headers: {
        cookie: allHeaders.get("cookie") || "",
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    },
  );

  const user_data = response.ok ? await response.json() : null;
  return <CurrentPlanPage userData={user_data} />;
};

export default CurrentPlan;
