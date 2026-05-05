import Dashboard from "@/components/custom/Dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <Dashboard Session={session} />;
};

export default DashboardPage;
