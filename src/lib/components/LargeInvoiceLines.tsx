import { InvoiceItem } from "../store/UserContext";
import { asCurrency } from "../store/utils";

export function LargeInvoiceLines({
  invoiceLines,
  total,
}: {
  invoiceLines: InvoiceItem[];
  total: number;
}) {
  return (
    <section className="hidden overflow-hidden rounded-lg bg-fem-blue-100 dark:bg-fem-blue-500 md:mt-4 md:block">
      <div className="p-8">
        <table className="w-full table-auto">
          <thead className="border-b-[2rem] border-transparent text-[0.8125rem] font-medium leading-none text-fem-blue-300 dark:text-fem-blue-200">
            <tr>
              <th className="text-left">Item name</th>
              <th className="text-center">QTY.</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-heading-s-variant">
            {invoiceLines.map(({ name, quantity, price, total }, index) => (
              <tr
                key={`${name}-${index}`}
                className="border-b-[2rem] border-transparent last:border-b-0"
              >
                <td>{name}</td>
                <td className="text-center text-fem-blue-300 dark:text-fem-blue-200 ">
                  {quantity}
                </td>
                <td className="text-right text-fem-blue-300 dark:text-fem-blue-200 ">
                  £ {asCurrency("en-GB", price)}
                </td>
                <td className="text-right">£ {asCurrency("en-GB", total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex items-center justify-between bg-fem-blue-600 px-6 py-6 text-white dark:bg-fem-blue-900">
        <span className="text-[0.8125rem] leading-[1.384em]">Grand Total</span>
        <span className="text-2xl font-bold">
          £ {asCurrency("en-GB", total)}
        </span>
      </p>
    </section>
  );
}
