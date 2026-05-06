import Typography from "@/components/ui/Typography";
import Image from "next/image";
import Coin from "@/public/assets/coin.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CurrentPlanPage = ({ userData }: { userData: any }) => {
  const lastPayment = userData?.payments?.at(-1);

  const amountInNaira = lastPayment ? lastPayment.amount / 100 : 0;

  return (
    <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex justify-between mb-[13px]">
      <Typography.P size="sm" className="uppercase" weight="extrabold">
        current plan
      </Typography.P>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-[35px]">₦{amountInNaira.toLocaleString()}</span>
          <div className="flex items-center text-xs font-bold bg-[#F895001F] w-fit rounded-full py-1 px-2 gap-1">
            <Image src={Coin} alt="coin" />
            {userData?.credit ?? 0}
          </div>
        </div>
        <Button className="bg-black rounded-full text-white" asChild>
          <Link href={"/pricing"}>Change plan</Link>
        </Button>
      </div>
    </div>
  );
};

export default CurrentPlanPage;
