import Image from "next/image";
import Logo from "@/public/assets/logo-dark.svg";
import Link from "next/link";
import Avatar from "@/public/assets/avatar.svg";
import Typography from "../ui/Typography";
import Price from "@/public/assets/price.svg";
import Circle_Layer from "@/public/assets/circle-layer.svg";
import Crown from "@/public/assets/crown.svg";
import Thunder from "@/public/assets/thunder.svg";
import Check from "@/public/assets/check.svg";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Payment = () => {
  const price = [
    {
      name: "Starter",
      img: Circle_Layer,
      amount: 100,
      list: [
        "Basic AI detection",
        "Basic Humanization",
        "600 words per request",
        "200 credits",
      ],
    },
    {
      name: "Pro",
      img: Crown,
      amount: 500,
      list: [
        "Advanced AI detection",
        "Full Humanization",
        "1200 words per request",
        "500 credits",
      ],
    },
    {
      name: "Advanced",
      img: Thunder,
      amount: 1000,
      list: [
        "AI pro features",
        "Dedicated support",
        "3000 words per request",
        "1000 credits",
      ],
    },
  ];

  const currentPlan = {
    name: "Pro",
    img: Crown,
    amount: 500,
    list: [
      "Advanced AI detection",
      "Full Humanization",
      "1200 words per request",
      "500 credits",
    ],
  };

  return (
    <section className="min-h-screen w-full">
      <div className="max-w-[1200px] mx-auto px-6 pt-[21px]">
        <nav className="flex items-center justify-between mb-[77px]">
          <figure className="flex-1">
            <Image src={Logo} alt="logo" />
          </figure>

          <ul className="text-center">
            <li>
              <Link
                href={"/dashboard"}
                className="hover:underline underline-offset-2"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          <div className="flex-1 ">
            <div className="flex items-center gap-4 py-[9px] px-3 border border-[#00000036] rounded-full w-fit ml-auto">
              <Image src={Avatar} alt="avatar" />

              <div>
                <Typography.P className="font-medium">
                  James Michealson
                </Typography.P>
                <Typography.P size="sm" className="font-medium opacity-45">
                  jamesmicheal@gmail.com
                </Typography.P>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-[550px] mx-auto shadow-md shadow-[#0000001A] border border-[#0000001A] rounded-[18px] p-6 mb-6">
          <Image src={Price} alt="pricing-img" className="mx-auto" />

          <h2 className="font-bold lg:text-[32px] text-[24px] text-center mt-6 mb-8">
            Pricing
          </h2>

          <div className="bg-blue-600 py-[13px] px-4 rounded-lg text-center mb-4">
            <Typography.P size="sm" className="font-medium text-white">
              You currently have <span className="font-extrabold">200</span>{" "}
              credits. See the pricing plan to get more credits
            </Typography.P>
          </div>

          <ul className="space-y-4">
            {price.map((item, idx) => {
              const myPlan = currentPlan.name == item.name;
              return (
                <div
                  className={cn(
                    "flex p-4 rounded-lg gap-7 border border-[#00000026]",
                    myPlan && "bg-[#F7F7F7] border-[#F7F7F7]"
                  )}
                  key={idx}
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.img}
                        alt={item.name}
                        className="size-[20px]"
                      />
                      <Typography.P className="font-semibold">
                        {item.name}
                      </Typography.P>

                      {myPlan && (
                        <div className="border border-[#00000038] rounded-full py-0.5 px-1.5 w-fit text-[#2B2B2B]">
                          <h2 className="text-xs">Current plan</h2>
                        </div>
                      )}
                    </div>

                    <div>
                      <Typography.H3>₦{item.amount}</Typography.H3>
                    </div>

                    <Button
                      className={cn(
                        `text-white bg-black rounded-full`,
                        myPlan && "bg-red-500 text-white"
                      )}
                      size={"sm"}
                    >
                      {myPlan ? "Cancel" : "Buy now"}
                    </Button>
                  </div>

                  {/* second */}
                  <div className="flex-1">
                    <ul className="space-y-2">
                      {item.list.map((i, idx2) => (
                        <li key={idx2} className="flex items-center gap-2">
                          <Image src={Check} alt="check" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Payment;
