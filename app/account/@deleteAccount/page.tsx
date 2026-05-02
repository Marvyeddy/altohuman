"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/ui/Typography";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const DeletePage = () => {
  const [onDelete, setOnDelete] = useState(false);
  const handleDeleteAccount = async () => {
    const { data, error } = await authClient.deleteUser(
      {
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setOnDelete(true);
        },
      },
    );
  };

  if (onDelete) {
    return (
      <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex flex-col items-center justify-center mb-[13px] gap-5">
        <Typography.P size="lg" weight="extrabold" className="mb-2">
          Confirm Your Account Deletion
        </Typography.P>
        <Typography.P className="text-center opacity-80 mb-3">
          We've sent a confirmation email to your address.
          <br />
          Please check your inbox and click the confirmation link to permanently
          delete your account.
        </Typography.P>
        <img
          src="https://res.cloudinary.com/dtkaccmm9/image/upload/v1765814722/Logo_nam8rt.png"
          width={60}
          height={60}
          alt="Altohuman Logo"
          className="mb-4"
        />
        <Typography.P className="text-sm opacity-60 italic">
          Didn't receive it? Make sure to check your spam folder or{" "}
          <span className="font-semibold">request again.</span>
        </Typography.P>
      </div>
    );
  }

  return (
    <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex justify-between mb-[13px] gap-5">
      <Typography.P size="sm" className="uppercase flex-1" weight="extrabold">
        delete account
      </Typography.P>

      <div className="flex-2">
        <Typography.P className="opacity-50">
          Note that you won&apos;t be able to retrieve this account once
          deleted.
        </Typography.P>
        <Dialog>
          <DialogTrigger className="rounded-full text-white bg-red-500 mt-4 p-2 px-4 font-semibold cursor-pointer hover:opacity-60">
            Delete account
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <Button
              className="bg-red-400 rounded-full text-white font-semibold"
              onClick={handleDeleteAccount}
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DeletePage;
