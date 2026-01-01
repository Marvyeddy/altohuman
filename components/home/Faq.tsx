"use client";

import { ChevronDown, ChevronLeft, Icon } from "lucide-react";
import Typography from "../ui/Typography";
import { useState } from "react";

const Faq = () => {
  const faq = [
    {
      question: "How accurate is the AI content detection?",
      answer:
        "Our detection algorithm is highly accurate, leveraging advanced AI models to ensure precision",
      icon: ChevronDown,
    },
    {
      question: "Can I try Altohuman for free?",
      answer:
        "Yes! Altohuman offers a free trial so you can experience our features before making a commitment.",
      icon: ChevronDown,
    },
    {
      question: "How do I get the enterprise plan",
      answer:
        "To learn more about our enterprise plan and its benefits, please contact our sales team through the contact form or email us directly.",
      icon: ChevronDown,
    },
    {
      question: "How secure is my data?",
      answer:
        "We prioritize your data security and privacy. All your content and personal information are protected with industry-standard encryption and never shared with third parties.",
      icon: ChevronDown,
    },
  ];
  return (
    <section id="faqs" className="lg:py-[120px] py-[88px] bg-[#F6F6F6]">
      <div className="max-w-[650px] mx-auto px-6">
        <div className="text-center w-fit mx-auto space-y-3 mb-10">
          <Typography.H2>Frequently asked Questions</Typography.H2>
          <Typography.P>Getting started</Typography.P>
        </div>

        {(() => {
          const [openIdx, setOpenIdx] = useState<number | null>(null);

          return (
            <ul className="flex gap-3 flex-col">
              {faq.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <li
                    key={idx}
                    className="bg-white rounded-lg p-4  transition-shadow duration-200 shadow-sm"
                  >
                    <div
                      className="flex justify-between cursor-pointer"
                      onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                      <Typography.H4 size="base">{faq.question}</Typography.H4>
                      <faq.icon
                        className={`text-[#A1A1AA] transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <Typography.P className="pr-5">{faq.answer}</Typography.P>
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        })()}
      </div>
    </section>
  );
};

export default Faq;
