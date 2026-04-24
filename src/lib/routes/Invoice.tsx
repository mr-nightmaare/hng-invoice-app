'use client';

import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  InvoiceStatus as InvoiceStatusEnum,
  UserCtx,
} from "../store/UserContext";
import GoBack from "../components/GoBack";
import { toEnglishDate } from "../store/utils";
import { MobileInvoiceLines } from "../components/mobileInvoiceLines";
import { LargeInvoiceLines } from "../components/LargeInvoiceLines";
import { createPortal } from "react-dom";
import InvoiceForm, { FormType } from "../components/InvoiceForm";
import { InvoiceStatus } from "../components/StatusBadge";
import { toast } from "react-hot-toast";

const Invoice = ({ invoiceId }: { invoiceId: string }) => {
  const router = useRouter();
  const {
    invoices,
    setInvoices,
    showModal,
    setShowModal,
    showInvoiceForm,
    setShowInvoiceForm,
  } = useContext(UserCtx);
  const invoice = invoices?.find((item) => item.id == invoiceId);
  if (!invoice) {
    return (
      <main className="relative px-6 pb-8 pt-[6.5625rem] md:px-12 md:pt-[8.0625rem] lg:pt-[4.875rem]">
        <div className="mx-auto flex max-w-[45.625rem] flex-col gap-4 pb-36 md:gap-6 md:pb-0">
          <GoBack
            handleClick={() => {
              router.push("/");
            }}
          />
          <p className="text-fem-blue-400">Loading...</p>
        </div>
      </main>
    );
  }
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Tab" && e.target === deleteRef.current) {
        e.preventDefault();
        cancelRef.current?.focus();
      } else if (e.key === "Tab" && e.target === cancelRef.current) {
        e.preventDefault();
        deleteRef.current?.focus();
      }
    }

    if (showModal) {
      window.addEventListener("keydown", handleKeydown);
    }
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [showModal]);

  return (
    <main className="relative px-6 pb-8 pt-[6.5625rem] md:px-12 md:pt-[8.0625rem] lg:pt-[4.875rem]">
      <div className="mx-auto flex max-w-[45.625rem] flex-col gap-4 pb-36 md:gap-6 md:pb-0">
        <GoBack
          handleClick={() => {
            router.push("/");
          }}
        />
        <div className="flex items-center justify-between rounded-lg bg-white p-6 dark:bg-fem-blue-700 md:px-8 md:shadow-soft">
          <div className="flex flex-grow items-center justify-between md:flex-grow-0 md:justify-normal md:gap-5">
            <span className="text-[0.8125rem] leading-none text-fem-blue-400">
              Status
            </span>
            <InvoiceStatus status={invoice!.status} />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {invoice?.status !== "paid" && (
              <button
                className="button muted"
                onClick={() => {
                  setShowInvoiceForm(true);
                }}
              >
                Edit
              </button>
            )}
            <button
              className="button danger"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Delete
            </button>
            {invoice?.status === "pending" && (
              <button
                onClick={() => {
                  setInvoices({ type: "paid", id: invoiceId });
                  toast.custom(
                    (t) => (
                      <div
                        className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
                          t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
                        }`}
                      >
                        <p className="px-4">💵 Invoice paid</p>
                      </div>
                    ),
                    { position: "top-center" }
                  );
                }}
                className="button accent"
              >
                Mark as Paid
              </button>
            )}
            {invoice?.status === "draft" && (
              <button
                onClick={() => {
                  setInvoices({ type: "send", id: invoiceId });
                  toast.custom(
                    (t) => (
                      <span
                        className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
                          t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
                        }`}
                      >
                        <p className="px-4">✉️ Invoice sent!</p>
                      </span>
                    ),
                    { position: "top-center" }
                  );
                }}
                className="button accent"
                disabled={Object.values(invoice).some(
                  (value) =>
                    value === "" ||
                    Object.values(value).some((nestedVal) => nestedVal === "")
                )}
              >
                Save & Send
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8 rounded-lg bg-white p-6 shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-fem-blue-700 dark:shadow-[0px_10px_10px_-10px_rgba(0,0,0,0.10)] md:p-8">
          <section className="flex- flex justify-between gap-[1.875rem] md:flex-row">
            <div>
              <h1 className="mb-1.5 text-heading-s-variant">
                <span className="text-fem-blue-300">#</span>
                {invoice!.id}
              </h1>
              <p className="muted-heading">
                {invoice!.description ?? (
                  <p className="heading-placeholder">No description</p>
                )}
              </p>
            </div>
            <address className="muted-heading flex flex-col gap-1.5 not-italic md:text-right">
              <p
                className={`${
                  !invoice!.senderAddress.street &&
                  "heading-placeholder text-[0.8125rem]"
                }`}
              >
                {invoice!.senderAddress.street
                  ? invoice!.senderAddress.street
                  : "Street not provided"}
              </p>
              <p
                className={`${
                  !invoice!.senderAddress.city &&
                  "heading-placeholder text-[0.8125rem]"
                }`}
              >
                {invoice!.senderAddress.city
                  ? invoice!.senderAddress.city
                  : "City not provided"}
              </p>
              <p
                className={`${
                  !invoice!.senderAddress.postCode &&
                  "heading-placeholder text-[0.8125rem]"
                }`}
              >
                {invoice!.senderAddress.postCode
                  ? invoice!.senderAddress.postCode
                  : "Postcode not provided"}
              </p>
              <p
                className={`${
                  !invoice!.senderAddress.country &&
                  "heading-placeholder text-[0.8125rem]"
                }`}
              >
                {invoice!.senderAddress.country
                  ? invoice!.senderAddress.country
                  : "Country not provided"}
              </p>
            </address>
          </section>
          <section className="grid grid-cols-2 grid-rows-[1fr_1fr_auto] md:grid-cols-[5fr_5fr_6fr] md:grid-rows-[auto_auto]">
            <article className="col-span-1 col-start-1 row-span-1 row-start-1">
              <h2 className="muted-heading mb-3">Invoice Date</h2>
              <p className="text-heading-s-variant">
                {toEnglishDate(invoice!.createdAt)}
              </p>
            </article>
            <article className="col-span-1 col-start-1 row-span-1 row-start-2 self-end">
              <h2 className="muted-heading mb-3">Payment Due</h2>
              <p className="text-heading-s-variant">
                {toEnglishDate(invoice!.paymentDue)}
              </p>
            </article>
            <article className="col-span-1 col-start-2 row-span-2 row-start-1 md:row-span-2">
              <h2 className="muted-heading mb-3">Bill to</h2>
              <p className="mb-4 text-heading-s-variant">
                {invoice!.clientName}
              </p>
              <address className="muted-heading flex flex-col gap-1.5 not-italic">
                <p
                  className={`${
                    !invoice!.clientAddress.street && "heading-placeholder"
                  }`}
                >
                  {invoice!.clientAddress.street
                    ? invoice!.clientAddress.street
                    : "Street not provided"}
                </p>
                <p
                  className={`${
                    !invoice!.clientAddress.city && "heading-placeholder"
                  }`}
                >
                  {invoice!.clientAddress.city
                    ? invoice!.clientAddress.city
                    : "City not provided"}
                </p>
                <p
                  className={`${
                    !invoice!.clientAddress.postCode && "heading-placeholder"
                  }`}
                >
                  {invoice!.clientAddress.postCode
                    ? invoice!.clientAddress.postCode
                    : "Postcode not provided"}
                </p>
                <p
                  className={`${
                    !invoice!.clientAddress.country && "heading-placeholder"
                  }`}
                >
                  {invoice!.clientAddress.country
                    ? invoice!.clientAddress.country
                    : "Country not provided"}
                </p>
              </address>
            </article>
            <article className="col-span-2 col-start-1 row-start-3 pt-8 md:col-start-3 md:row-span-2 md:row-start-1 md:pt-0">
              <h2 className="muted-heading mb-3">Sent to</h2>
              {invoice!.clientEmail ? (
                <a
                  href={`mailto:${invoice!.clientEmail}`}
                  className="block text-heading-s-variant"
                >
                  {invoice!.clientEmail}
                </a>
              ) : (
                <p className="heading-placeholder">Email not provided</p>
              )}
            </article>
          </section>
          <MobileInvoiceLines
            invoiceLines={invoice!.items}
            total={invoice!.total}
          />
          <LargeInvoiceLines
            invoiceLines={invoice!.items}
            total={invoice!.total}
          />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-end gap-1.5 bg-gradient-to-t from-white from-85% to-transparent px-6 pb-8 pt-10 dark:bg-gradient-to-t dark:from-fem-blue-800 dark:from-80% dark:to-transparent md:hidden">
        <div className="flex items-center justify-end gap-2">
          {invoice?.status !== "paid" && (
            <button
              className="button muted"
              onClick={() => {
                setShowInvoiceForm(true);
              }}
            >
              Edit
            </button>
          )}
          <button
            className="button danger"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </button>
          {invoice?.status === InvoiceStatusEnum.PENDING && (
            <button
              onClick={() => {
                setInvoices({ type: "paid", id: invoiceId });
                toast.custom(
                  (t) => (
                    <span
                      className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
                        t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
                      }`}
                    >
                      <p className="px-4">💵 Invoice paid</p>
                    </span>
                  ),
                  { position: "top-center" }
                );
              }}
              className="button accent"
            >
              Mark as Paid
            </button>
          )}
          {invoice?.status === "draft" && (
            <button
              onClick={() => {
                setInvoices({ type: "send", id: invoiceId });
                toast.custom(
                  (t) => (
                    <span
                      className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
                        t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
                      }`}
                    >
                      <p className="px-4">✉️ Invoice sent!</p>
                    </span>
                  ),
                  { position: "top-center" }
                );
              }}
              className="button accent"
              disabled={Object.values(invoice).some(
                (value) =>
                  value === "" ||
                  Object.values(value).some((nestedVal) => nestedVal === "")
              )}
            >
              Save & Send
            </button>
          )}
        </div>
      </div>

      {showModal &&
        createPortal(
          <div
            ref={modalRef}
            id="modal-deletion"
            aria-modal={true}
            className="w-screen max-w-[30rem] rounded-lg bg-white p-12 dark:bg-fem-blue-700"
          >
            <h2 className="mb-3 text-heading-m">Confirm Deletion</h2>
            <p className="text-[0.8125rem] leading-[1.7em] text-fem-blue-400">
              Are you sure you want to delete invoice #{invoiceId}? This action
              cannot be undone.
            </p>
            <div className="mt-4 flex w-full justify-end gap-2">
              <button
                autoFocus
                ref={cancelRef}
                className="button muted"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                ref={deleteRef}
                className="button danger"
                onClick={() => {
                  setInvoices({ type: "delete", id: invoiceId });
                  toast.custom(
                    (t) => (
                      <div
                        className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
                          t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
                        }`}
                      >
                        <p className="px-4">
                          🗑️ Invoice <span>#{invoice!.id}</span> deleted
                          successfully
                        </p>
                      </div>
                    ),
                    { position: "top-center" }
                  );

                  router.push("/");
                  setShowModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>,
          document.getElementById("modalPortal")!
        )}
      {showInvoiceForm &&
        createPortal(
          <InvoiceForm type={FormType.edit} invoice={invoice} />,
          document.getElementById("formPortal")!
        )}
    </main>
  );
};

export default Invoice;
