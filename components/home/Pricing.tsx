import Typography from "../ui/Typography";
import Circle_Layer from "@/public/assets/circle-layer.svg";
import Crown from "@/public/assets/crown.svg";
import Thunder from "@/public/assets/thunder.svg";
import Check from "@/public/assets/check.svg";
import Image from "next/image";
import { Button } from "../ui/button";

const Pricing = () => {
  const price = [
    {
      name: "Starter",
      img: Circle_Layer,
      amount: 100,
      btn: "Try it now",
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
      btn: "Buy now",
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
      btn: "Get started",
      list: [
        "AI pro features",
        "Dedicated support",
        "3000 words per request",
        "1000 credits",
      ],
    },
  ];
  return (
    <section className="lg:py-[120px] py-[88px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center space-y-3 max-lg:w-[278px] mx-auto">
          <Typography.H2>Straight-forward pricing</Typography.H2>
          <Typography.P color="custom-1">
            We have carefully made our pricing straightforward to fit your
            needs!
          </Typography.P>
        </div>

        <ul className="flex gap-[39px] mt-10 max-lg:flex-col">
          {price.map((item, idx) => (
            <div key={idx} className="flex-1">
              <div className="space-y-6 bg-[#F7F7F7] px-[18px] py-4">
                <div className="flex gap-3">
                  <Image src={item.img} alt="price-icon" />
                  <Typography.H4>{item.name}</Typography.H4>
                </div>

                <Typography.H3>₦{item.amount}</Typography.H3>

                <Button
                  className={`border border-black rounded-full font-extrabold w-full ${
                    idx === 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {item.btn}
                </Button>
              </div>

              <div className="border border-[#EBEBEB] px-[18px] py-4 space-y-[18px]">
                <Typography.H4 size="sm">What&apos;s Included:</Typography.H4>

                <ul className="flex flex-col gap-[18px]">
                  {item.list.map((list, idx1) => (
                    <li key={idx1} className="flex space-x-2">
                      <Image src={Check} alt="check" />
                      <Typography.P>{list}</Typography.P>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pricing;
