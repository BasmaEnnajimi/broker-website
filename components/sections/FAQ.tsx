"use client"

import { useState } from "react"

const faqs = [
  {
    question: "How do I schedule a property visit?",
    answer:
      "You can schedule a visit by contacting us directly through the website or by phone. Once you reach out, we’ll coordinate a time that works best for you."
  },
  {
    question: "Do I need to be pre-approved before viewing homes?",
    answer:
      "Pre-approval is not required to view homes, but it is highly recommended. It helps you understand your budget and strengthens your position when making an offer."
  },
  {
    question: "How long does it usually take to sell a property?",
    answer:
      "The timeline varies depending on market conditions, pricing, and location. On average, well-priced properties can sell within a few weeks."
  },
  {
    question: "What are the costs involved in buying a home?",
    answer:
      "Costs may include the down payment, notary fees, inspection fees, welcome tax, and other closing costs. We’ll guide you through all expected expenses."
  },
  {
    question: "Can I make an offer below the asking price?",
    answer:
      "Yes, depending on market conditions. We analyze comparable properties and advise you on a competitive yet strategic offer."
  },
  {
    question: "Do you help with investment properties?",
    answer:
      "Absolutely. We assist investors by identifying opportunities, analyzing returns, and guiding them through the purchasing process."
  },
  {
    question: "What happens after my offer is accepted?",
    answer:
      "Once accepted, the process moves into inspection, financing confirmation, and legal steps. We stay involved until the transaction is finalized."
  },
  {
    question: "Do you work with both buyers and sellers?",
    answer:
      "Yes. We represent buyers, sellers, and investors, offering tailored strategies based on your specific goals."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-4xl px-6">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600">
            Answers to common questions about buying, selling, and investing in real estate.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-colors duration-300 ${
                openIndex === i
                  ? "bg-black border-neutral-800"
                  : "bg-white border-neutral-200"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span
                  className={`font-medium ${
                    openIndex === i ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {faq.question}
                </span>

                <span
                  className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-red-600 text-red-600 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openIndex === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div
                  className={`overflow-hidden px-6 pb-4 ${
                    openIndex === i
                      ? "text-neutral-300"
                      : "text-neutral-600"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}