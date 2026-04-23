import { InvoiceLineForm } from "./InvoiceLineForm";
import React, { useContext } from "react";
import GoBack from "./GoBack";
import {
  Invoice,
  InvoiceAddress,
  InvoiceItem,
  InvoiceStatus,
  UserCtx,
} from "../store/UserContext";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { addDays, getId, toCalendarDate } from "../store/utils";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FieldErrors } from "react-hook-form";
export enum FormType {
  new = "NEW",
  edit = "EDIT",
}

export interface InvoiceFormType {
  id: string;
  createdAt: string;
  paymentDue: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: InvoiceAddress;
  clientAddress: InvoiceAddress;
  items: InvoiceItem[];
  total: number;
}

const InvoiceForm = ({
  type,
  invoice,
}: {
  type: FormType;
  invoice?: Invoice;
}) => {
  const { setShowInvoiceForm, setInvoices } = useContext(UserCtx);

  function toInvoicePayload(data: InvoiceFormType): Invoice {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      paymentDue: new Date(data.paymentDue),
    };
  }

  const draftDefaultValues: InvoiceFormType = {
    id: invoice?.id ?? getId(),
    createdAt: invoice
      ? toCalendarDate(invoice.createdAt)
      : toCalendarDate(new Date()),
    paymentDue: invoice?.paymentDue ?? addDays(new Date(), 30),
    description: invoice?.description ?? "",
    paymentTerms: invoice?.paymentTerms ?? 30,
    clientName: invoice?.clientName ?? "",
    clientEmail: invoice?.clientEmail ?? "",
    status: invoice?.status ?? InvoiceStatus.DRAFT,
    senderAddress: invoice?.senderAddress ?? {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: invoice?.clientAddress ?? {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: invoice?.items ?? [
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ],
    total: invoice?.total ?? 0,
  };

  const methods = useForm<InvoiceFormType>({
    defaultValues: draftDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: methods.control,
    rules: {
      required: "An invoice must have at least 1 item",
    },
  });

  const createdAt = methods.getValues("createdAt");
  function cancelForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setShowInvoiceForm(false);
  }

  function saveDraft(data: InvoiceFormType) {
    const invoiceId = data.id;
    setInvoices({ type: "add", id: invoiceId, payload: toInvoicePayload(data) });
    const toastId = toast.custom(
      (t) => (
        <div
          className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
            t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
          }`}
        >
          <p className="px-4">
            Invoice <span>#{data.id}</span> created successfully
          </p>

          <Link
            href={`/invoices/${data.id}`}
            onClick={() => {
              toast.dismiss(toastId);
            }}
          >
            <span className="flex aspect-square w-8 items-center justify-center rounded-full bg-white">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l4 4-4 4"
                  stroke="#7C5DFA"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        </div>
      ),
      { position: "top-center" }
    );
    setShowInvoiceForm(false);
  }

  function submitSend(data: InvoiceFormType) {
    const invoice = toInvoicePayload(data);
    const invoiceId = invoice.id;
    invoice.status = InvoiceStatus.PENDING;
    setInvoices({ type: "add", id: invoiceId, payload: invoice });

    const toastId = toast.custom(
      (t) => (
        <div
          className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
            t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
          }`}
        >
          <p className="px-4">
            Invoice <span>#{data.id}</span> created successfully
          </p>

          <Link
            href={`/invoices/${data.id}`}
            onClick={() => {
              toast.dismiss(toastId);
            }}
          >
            <span className="flex aspect-square w-8 items-center justify-center rounded-full bg-white">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l4 4-4 4"
                  stroke="#7C5DFA"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        </div>
      ),
      { position: "top-center" }
    );
    setShowInvoiceForm(false);
  }

  function submitEdit(data: InvoiceFormType) {
    const invoice = toInvoicePayload(data);
    invoice.status = InvoiceStatus.PENDING;
    setInvoices({ type: "edit", id: invoice!.id, payload: invoice });
    setShowInvoiceForm(false);
    toast.custom(
      (t) => (
        <div
          className={`flex items-center rounded-[2rem] bg-fem-violet-400 p-1.5 text-heading-s text-white shadow-xl ${
            t.visible ? "animate-fadeInDown" : "animate-fadeOutUp"
          }`}
        >
          <p className="px-4">✅ Changes saved successfully</p>
        </div>
      ),
      { position: "top-center" }
    );
  }

  const onError = (errors: FieldErrors<InvoiceFormType>) => console.log(errors);

  return (
    <div className="h-full w-full overflow-scroll bg-white px-6 pb-32 pt-[4.5rem] outline-fem-violet-400 dark:bg-fem-blue-800 md:w-[38.5rem] md:rounded-r-[1.25rem] md:px-14 md:pb-0 md:pt-0 lg:w-[48.5rem] lg:pl-[10rem]">
      <div className="sticky top-0 bg-gradient-to-b from-white from-90% to-transparent py-6 dark:bg-gradient-to-b dark:from-fem-blue-800 dark:from-90% dark:to-transparent">
        <div className="md:hidden">
          <GoBack
            handleClick={() => {
              setShowInvoiceForm(false);
            }}
          />
        </div>

        <h2 className="my-6 text-heading-m capitalize ">
          {type === "NEW" ? (
            "new invoice"
          ) : (
            <>
              Edit <span className="text-fem-blue-400">#</span>
              {invoice!.id}
            </>
          )}
        </h2>
      </div>
      <FormProvider {...methods}>
        <form>
          <div className="mb-12 flex flex-col gap-10 md:gap-12">
            <fieldset>
              <legend className="text-heading-s-variant text-fem-violet-400">
                Bill From
              </legend>
              <div className="grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-6 pt-6 md:grid-cols-3 md:grid-rows-2">
                <div className="col-span-full col-start-1 row-span-1">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="streetAddress">
                      Street Address
                    </label>
                    {methods.formState.errors.senderAddress?.street && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="streetAddress"
                    type="text"
                    className={`w-full ${
                      methods.formState.errors.senderAddress?.street &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.senderAddress?.street
                        ? true
                        : false
                    }
                    {...methods.register("senderAddress.street", {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-span-1 col-start-1 row-span-1 row-start-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="city">
                      City
                    </label>
                    {methods.formState.errors.senderAddress?.city && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="city"
                    type="text"
                    {...methods.register("senderAddress.city", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.senderAddress?.city &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.senderAddress?.city
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col-span-1 col-start-2 row-span-1 row-start-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="postcode">
                      Postcode
                    </label>
                    {methods.formState.errors.senderAddress?.postCode && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="postcode"
                    type="text"
                    {...methods.register("senderAddress.postCode", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.senderAddress?.postCode &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.senderAddress?.postCode
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col-span-full row-span-1 row-start-3 md:col-span-1 md:col-start-3 md:row-start-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="country">
                      Country
                    </label>
                    {methods.formState.errors.senderAddress?.country && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="country"
                    type="text"
                    {...methods.register("senderAddress.country", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.senderAddress?.country &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.senderAddress?.country
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-heading-s-variant text-fem-violet-400">
                Bill To
              </legend>
              <div className="grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-6 pt-6 md:grid-cols-3 md:grid-rows-4">
                <div className="col-span-full col-start-1 row-span-1 row-start-1">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="clientName">
                      Client&apos;s Name
                    </label>
                    {methods.formState.errors.clientName && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="clientName"
                    type="text"
                    className={`w-full ${
                      methods.formState.errors.clientName && "input-warning"
                    }`}
                    {...methods.register("clientName", {
                      required: true,
                    })}
                    aria-invalid={
                      methods.formState.errors.clientName ? true : false
                    }
                  />
                </div>
                <div className="col-span-full col-start-1 row-span-1 row-start-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="clientEmail">
                      Client&apos;s Email
                    </label>
                    {methods.formState.errors.clientEmail && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="clientEmail"
                    type="email"
                    {...methods.register("clientEmail", {
                      required: true,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please use a valid email address",
                      },
                    })}
                    className={`w-full ${
                      methods.formState.errors.clientEmail && "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.clientEmail ? true : false
                    }
                  />
                </div>
                <div className="col-span-full col-start-1 row-span-1 row-start-3">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="clientStreet">
                      Street Address
                    </label>
                    {methods.formState.errors.clientAddress?.street && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="clientStreet"
                    type="text"
                    {...methods.register("clientAddress.street", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.clientAddress?.street &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.clientAddress?.street
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col-span-1 col-start-1 row-span-1 row-start-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="clientCity">
                      City
                    </label>
                    {methods.formState.errors.clientAddress?.city && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="clientCity"
                    type="text"
                    {...methods.register("clientAddress.city", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.clientAddress?.city &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.clientAddress?.city
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col-span-1 col-start-2 row-span-1 row-start-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="clientPostcode">
                      Postcode
                    </label>
                    {methods.formState.errors.clientAddress?.postCode && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="clientPostcode"
                    type="text"
                    {...methods.register("clientAddress.postCode", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.clientAddress?.postCode &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.clientAddress?.postCode
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col-span-2 col-start-1 row-span-1 row-start-5 md:col-span-1 md:col-start-3 md:row-start-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="clientCountry">
                      Country
                    </label>
                    {methods.formState.errors.clientAddress?.country && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    id="clientCountry"
                    type="text"
                    {...methods.register("clientAddress.country", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.clientAddress?.country &&
                      "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.clientAddress?.country
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <div className="grid grid-rows-3 gap-x-6 gap-y-6 md:grid-cols-2 md:grid-rows-2">
                <div className="row-span-1 md:col-start-1">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="invoiceDate">
                      Invoice Date
                    </label>
                    {methods.formState.errors.createdAt && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    disabled={invoice?.status === InvoiceStatus.PENDING}
                    id="invoiceDate"
                    type="date"
                    {...methods.register("createdAt", {
                      valueAsDate: true,
                      required: true,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const newPaymentDue = addDays(
                          new Date(e.target.value),
                          methods.getValues("paymentTerms")
                        );
                        methods.setValue("paymentDue", newPaymentDue);
                      },
                    })}
                    className={`w-full ${
                      methods.formState.errors.createdAt && "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.createdAt ? true : false
                    }
                    defaultValue={createdAt}
                  />
                </div>
                <div className="row-span-1 md:col-start-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="paymentTerms">
                      Payment Terms
                    </label>
                    {methods.formState.errors.paymentTerms && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <select
                    id="paymentTerms"
                    {...methods.register("paymentTerms", {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const option = e.target.value;
                        methods.setValue(
                          "paymentDue",
                          addDays(
                            new Date(Date.parse(`${createdAt}`)),
                            parseInt(option)
                          )
                        );
                      },
                    })}
                    className="h-14 w-full"
                  >
                    <option value="1">Net 1 days</option>
                    <option value="7">Net 7 days</option>
                    <option value="14">Net 14 days</option>
                    <option value="30">Net 30 days</option>
                  </select>
                </div>
                <div className="md:col-span-full">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="input-label" htmlFor="projectDescription">
                      Project Description
                    </label>
                    {methods.formState.errors.description && (
                      <span className="warning">Required</span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="projectDescription"
                    {...methods.register("description", {
                      required: true,
                    })}
                    className={`w-full ${
                      methods.formState.errors.description && "input-warning"
                    }`}
                    aria-invalid={
                      methods.formState.errors.description ? true : false
                    }
                  />
                </div>
              </div>
            </fieldset>
            {fields.length > 0 && (
              <fieldset>
                <legend className="mb-6 text-lg font-bold text-[#777F98]">
                  Item list
                </legend>
                <div className="flex flex-col gap-12">
                  {fields.map((field, index) => {
                    return (
                      <InvoiceLineForm
                        key={field.id}
                        field={field}
                        index={index}
                        remove={remove}
                      />
                    );
                  })}
                </div>
              </fieldset>
            )}
            <button
              role="button"
              className="rounded-[1.125rem] bg-fem-blue-100 py-4 text-heading-s-variant text-fem-blue-300 dark:bg-fem-blue-500 dark:text-fem-blue-400"
              onClick={(e) => {
                e.preventDefault();
                append({
                  name: "",
                  quantity: 1,
                  price: 0,
                  total: 0,
                });
              }}
            >
              + Add new Item
            </button>
          </div>

          {methods.formState.errors.items?.root && (
            <i className="not-italic text-fem-red-400 dark:text-fem-red-300">
              {methods.formState.errors.items?.root?.message ?? null}
            </i>
          )}
          {type === "NEW" && (
            <div className="fixed inset-x-0 bottom-0 flex items-center justify-between gap-1.5 bg-gradient-to-t from-white from-85% to-transparent px-6 py-8 dark:bg-gradient-to-t dark:from-fem-blue-800 dark:from-85% dark:to-transparent md:sticky  md:px-0 ">
              <button onClick={cancelForm} className="button muted">
                Cancel
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  className="button secondary px-3"
                  onClick={() => {
                    saveDraft(methods.getValues());
                  }}
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="button accent px-3"
                  onClick={methods.handleSubmit(submitSend, onError)}
                >
                  Save & Send
                </button>
              </div>
            </div>
          )}
          {type === "EDIT" && (
            <div className="fixed inset-x-0 bottom-0 flex items-center justify-end gap-1.5 bg-gradient-to-t from-white from-85% to-transparent px-6 py-8 dark:bg-gradient-to-t dark:from-fem-blue-800 dark:from-85% dark:to-transparent md:sticky md:px-0 ">
              <button className="button muted" onClick={cancelForm}>
                Discard
              </button>
              <button
                type="submit"
                className="button accent px-3"
                onClick={methods.handleSubmit(submitEdit, onError)}
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default InvoiceForm;
