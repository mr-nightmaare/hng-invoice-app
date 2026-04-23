export function InvoiceStatus({ status }: { status: string }) {
  return (
    <div
      className={`col-span-1 col-start-2 row-span-2 row-start-2 flex w-[6.5rem] items-center justify-center gap-2 justify-self-end rounded-lg bg-opacity-5 px-5 py-3.5 md:col-start-5 md:row-span-1 md:row-start-1 md:justify-self-auto ${
        status === "paid"
          ? "bg-fem-green"
          : status === "pending"
          ? "bg-fem-orange"
          : "bg-fem-muted"
      }`}
    >
      <span
        className={`inline-block aspect-square w-2 shrink-0 rounded-full ${
          status === "paid"
            ? "bg-fem-green"
            : status === "pending"
            ? "bg-fem-orange"
            : "bg-fem-muted dark:bg-fem-blue-200"
        }`}
      ></span>
      <p
        className={`text-heading-s-variant ${
          status === "paid"
            ? "text-fem-green"
            : status === "pending"
            ? "text-fem-orange"
            : "text-fem-muted dark:text-fem-blue-200"
        } capitalize`}
      >
        {status}
      </p>
    </div>
  );
}
