import Dashboard from "@/components/custom/Dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const allHeaders = await headers();
  const session = await auth.api.getSession({
    headers: allHeaders,
  });

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

  return <Dashboard Session={session} userData={user_data} />;
};

export default DashboardPage;
