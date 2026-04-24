import React, { SetStateAction, useContext } from "react";
import Filter from "./Filter";
import { Invoice, UserCtx } from "../store/UserContext";
import { createPortal } from "react-dom";
import InvoiceForm, { FormType } from "./InvoiceForm";
export function InvoicesToolbar({
  isMobile,
  filteredInvoices,
  filterOptions,
  selectedFilters,
  setSelectedFilters,
}: {
  isMobile: boolean;
  filteredInvoices: Invoice[] | null | undefined;
  filterOptions: string[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<SetStateAction<string[]>>;
}) {
  const { showInvoiceForm, setShowInvoiceForm } = useContext(UserCtx);

  return (
    <header className="sticky top-[4.5rem] z-30 flex items-center justify-between bg-gradient-to-b from-fem-light from-85% to-transparent py-8 dark:bg-gradient-to-b dark:from-fem-blue-800 dark:from-85% dark:to-transparent md:top-20 md:py-14 lg:top-0 lg:pt-[4.875rem]">
      <div>
        <h1 className="text-heading-m leading-[1] md:mb-1.5 md:text-heading-l" style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: '36px', letterSpacing: '-1.13px', lineHeight: '100%' }}>
          Invoices
        </h1>
        <p className="text-heading-s-variant font-medium text-fem-blue-400" style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '-0.1px', lineHeight: '15px' }}>
          {" "}
          {!isMobile && "There "}
          {(!isMobile && filteredInvoices && filteredInvoices?.length > 1) ||
          (!isMobile && filteredInvoices && filteredInvoices.length == 0)
            ? "are "
            : isMobile
            ? null
            : "is "}
          {filteredInvoices?.length ? filteredInvoices.length : "no"} invoice
          {filteredInvoices &&
          (filteredInvoices.length > 1 || filteredInvoices.length == 0)
            ? "s"
            : null}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <Filter
          options={filterOptions}
          selectedOptions={selectedFilters}
          setSelectedOptions={setSelectedFilters}
        />
        <button
          className="flex items-center rounded-3xl bg-fem-violet-400 p-1.5 text-heading-s text-white focus-within:bg-fem-violet-300 hover:bg-fem-violet-300"
          onClick={() => {
            setShowInvoiceForm(true);
          }}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 1v8M1 5h8"
                stroke="#7C5DFA"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="inline-block px-4" style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '-0.25px', lineHeight: '15px' }}>
            New {!isMobile && "Invoice"}
          </span>
        </button>
      </div>
      {showInvoiceForm &&
        createPortal(
          <InvoiceForm type={FormType.new} />,
          document.getElementById("formPortal")!
        )}
    </header>
  );
}
