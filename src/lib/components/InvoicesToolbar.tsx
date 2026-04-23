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
        <h1 className="text-heading-m leading-none md:mb-1.5 md:text-heading-l">
          Invoices
        </h1>
        <p className="text-heading-s-variant font-medium text-fem-blue-400">
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
          <span className="flex aspect-square w-8 items-center justify-center rounded-full bg-white">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                fill="#7C5DFA"
                fillRule="nonzero"
              />
            </svg>
          </span>
          <span className="inline-block px-4">
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
