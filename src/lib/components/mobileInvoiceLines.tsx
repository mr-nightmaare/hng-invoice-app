import React from "react";
import { InvoiceItem } from "../store/UserContext";
import { asCurrency } from "../store/utils";
export function MobileInvoiceLines({
  invoiceLines,
  total,
}: {
  invoiceLines: InvoiceItem[];
  total: number;
}) {
  return (
    <section className="overflow-hidden rounded-lg bg-fem-blue-100 dark:bg-fem-blue-500 md:mt-4 md:hidden">
      <ul className="flex flex-col gap-6 p-6">
        {invoiceLines!.map(({ name, price, quantity, total }, index) => (
          <li className="flex items-center justify-between" key={`${name}-${index}`}>
            <p className="flex flex-col gap-2">
              <span className="text-heading-s-variant">{name}</span>
              <span className="text-heading-s-variant text-fem-blue-300 dark:text-fem-blue-400">
                {quantity} x £ {asCurrency("en-GB", price)}
              </span>
            </p>
            <p className="text-heading-s-variant">
              £ {asCurrency("en-GB", total)}
            </p>
          </li>
        ))}
      </ul>
      <p className="flex items-center justify-between bg-fem-blue-600 px-6 py-6 text-white dark:bg-fem-blue-900">
        <span className="text-[0.8125rem] leading-[1.384em]">Grand Total</span>
        <span className="text-2xl font-bold">
          £ {asCurrency("en-GB", total)}
        </span>
      </p>
    </section>
  );
}
