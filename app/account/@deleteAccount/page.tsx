import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/Typography";
import React from "react";

const DeletePage = () => {
  return (
    <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex justify-between mb-[13px] gap-5">
      <Typography.P size="sm" className="uppercase flex-1" weight="extrabold">
        delete account
      </Typography.P>

      <div className="flex-2">
        <Typography.P className="opacity-50">
          Note that you won’t be able to retrieve this account once deleted.
        </Typography.P>
        <Button className="rounded-full text-white bg-red-500 mt-4">
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default DeletePage;
