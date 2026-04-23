import Link from "next/link";
import { InvoiceStatus } from "./StatusBadge";
import { asCurrency, toEnglishDate } from "../store/utils";
import { motion } from "framer-motion";
export function InvoiceCard({
  id,
  clientName,
  total,
  paymentDue,
  status,
  layoutId,
}: {
  id: string;
  clientName: string;
  total: number;
  paymentDue: Date;
  status: string;
  layoutId: string;
}) {
  return (
    <motion.article
      transition={{ duration: 0.15, ease: "easeOut" }}
      layoutId={layoutId}
      className="-z-0 grid grid-cols-2 grid-rows-[repeat(3,_auto)] items-center rounded-lg border border-transparent bg-white p-6 focus-within:border-fem-violet-400 hover:border-fem-violet-400 dark:bg-fem-blue-700 md:grid-cols-5 md:grid-rows-1 md:justify-items-center md:gap-x-5 md:p-4 md:px-6 md:shadow-soft"
    >
      <Link
        href={`/invoices/${id}`}
        aria-label={`${clientName}'s invoice details`}
        className="group col-span-1 col-start-1 row-span-1 row-start-1 mb-6 text-heading-s-variant md:mb-0 md:justify-self-start lg:pl-2"
      >
        <span className="text-fem-blue-400 group-focus-within:text-fem-violet-400 group-hover:text-fem-violet-400">
          #
        </span>
        {id}
      </Link>
      <p className="mb-2.5 text-[0.8125rem] leading-none text-fem-blue-300 dark:text-fem-blue-200 md:col-span-1 md:col-start-2 md:mb-0 md:justify-self-start">
        <span className="text-fem-blue-400 dark:text-fem-blue-200">Due</span>{" "}
        {toEnglishDate(paymentDue)}
      </p>
      <p className="col-span-1 col-start-2 row-span-1 row-start-1 self-start justify-self-end text-[0.8125rem] leading-[1.15em] text-fem-blue-400 dark:text-white md:col-start-3 md:self-auto md:justify-self-start">
        {clientName}
      </p>
      <p className="col-span-1 col-start-1 row-span-1 row-start-3 text-heading-s md:col-start-4 md:row-start-1">
        £ {asCurrency("en-GB", total)}
      </p>
      <InvoiceStatus status={status} />
      <Link
        href={`/invoices/${id}`}
        aria-label={`${clientName}'s invoice details`}
        className="col-start-6 hidden px-2 py-3.5 md:inline-block"
      >
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1l4 4-4 4"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </Link>
    </motion.article>
  );
}
