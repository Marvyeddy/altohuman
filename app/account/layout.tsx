import React from "react";

const AccountLayout = ({
  children,
  current,
  personal,
  security,
  deleteAccount,
}: {
  children: React.ReactNode;
  current: React.ReactNode;
  personal: React.ReactNode;
  security: React.ReactNode;
  deleteAccount: React.ReactNode;
}) => {
  return (
    <section className="min-h-screen w-full">
      {children}
      <div className="max-w-[720px] mx-auto px-6">
        <>{current}</>
        <>{personal}</>
        <>{security}</>
        <>{deleteAccount}</>
      </div>
    </section>
  );
};

export default AccountLayout;
