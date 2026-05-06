import PersonalInfoPage from "@/components/custom/PersonalInfoPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PersonalInfo = async () => {
  const allHeaders = await headers();
  const session = await auth.api.getSession({
    headers: allHeaders,
  });

  return <PersonalInfoPage Session={session} />;
};

export default PersonalInfo;
