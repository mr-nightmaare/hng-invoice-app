import React from "react";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Invoice, InvoiceItem } from "../store/UserContext";
import { asCurrency, numericsOnly } from "../store/utils";

export function InvoiceLineForm({
  field,
  index,
  remove,
}: {
  field: FieldArrayWithId<Invoice>;
  index: number;
  remove: UseFieldArrayRemove;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Invoice>();

  const { quantity, price, total, name } = useWatch({
    name: `items.${index}`,
  });
  const items = useWatch({ name: "items" });

  function updateTotal(invoiceItems: InvoiceItem[]) {
    const newTotal = invoiceItems.reduce(
      (accumulator: number, { total }: { total: number }) => {
        return accumulator + total;
      },
      0
    );
    setValue("total", newTotal);
  }

  return (
    <div
      key={field.id}
      className="grid grid-cols-[3fr_4fr_4fr_auto] grid-rows-2 gap-x-4 gap-y-6 md:grid-cols-[5fr_2fr_3fr_3fr_auto] md:grid-rows-1"
    >
      <div className="col-span-full row-span-1 md:col-span-1 md:col-start-1 md:row-start-1">
        {/* <label
          className="muted-heading mb-2 block"
          htmlFor={`line${index}-name`}
        >
          Item Name
        </label> */}
        <div className="mb-2 flex items-center justify-between">
          <label
            className="muted-heading mb-2 block"
            htmlFor={`line${index}-name`}
          >
            Item Name
          </label>
          {errors.items?.[index]?.name && (
            <span className="warning">Required</span>
          )}
        </div>
        <input
          type="text"
          id={`line${index}-name`}
          {...register(`items.${index}.name` as const, {
            required: true,
          })}
        />
      </div>
      <div className="col-span-1 row-span-1 row-start-2 md:row-start-1">
        <div className="mb-2 flex items-center justify-between">
          <label
            className="muted-heading mb-2 block"
            htmlFor={`line${index}-qty`}
          >
            Qty
          </label>
          {errors.items?.[index]?.quantity && (
            <span className="warning">Required</span>
          )}
        </div>
        <input
          type="number"
          id={`line${index}-qty`}
          className={`${errors.items?.[index]?.quantity && "input-warnin"}`}
          defaultValue={1}
          {...register(`items.${index}.quantity` as const, {
            valueAsNumber: true,
            min: 1,
            required: true,
            onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => {
              const { valueAsNumber } = e.target;
              const newTotal = valueAsNumber * price;
              if (!Number.isNaN(valueAsNumber)) {
                setValue(`items.${index}.quantity`, valueAsNumber);
                setValue(`items.${index}.total`, newTotal);
                const newLine: InvoiceItem = {
                  name,
                  quantity: valueAsNumber,
                  price,
                  total: newTotal,
                };
                const newItems = [...items];
                newItems[index] = newLine;
                updateTotal(newItems);
              } else {
                setValue(`items.${index}.quantity`, 0);
                setValue(`items.${index}.total`, 0);
                const newLine: InvoiceItem = {
                  name,
                  quantity: 0,
                  price,
                  total: 0,
                };
                const newItems = [...items];
                newItems[index] = newLine;
                updateTotal(newItems);
              }
            },
          })}
          onKeyDown={numericsOnly}
        />
      </div>
      <div className="col-span-1 row-span-1 row-start-2 md:row-start-1">
        <div className="mb-2 flex items-center justify-between">
          <label
            className="muted-heading mb-2 block"
            htmlFor={`line${index}-price`}
          >
            Price
          </label>
          {errors.items?.[index]?.price && (
            <span className="warning">Required</span>
          )}
        </div>
        <input
          className={`appearance-none"}`}
          type="number"
          id={`line${index}-price`}
          onKeyDown={numericsOnly}
          {...register(`items.${index}.price` as const, {
            valueAsNumber: true,
            required: true,
            onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => {
              const { valueAsNumber } = e.target;
              const newTotal = valueAsNumber * quantity;

              if (!Number.isNaN(valueAsNumber)) {
                setValue(`items.${index}.price`, valueAsNumber);
                setValue(`items.${index}.total`, newTotal);
                const newLine: InvoiceItem = {
                  name,
                  quantity,
                  price: valueAsNumber,
                  total: newTotal,
                };
                const newItems = [...items];
                newItems[index] = newLine;
                updateTotal(newItems);
              } else {
                setValue(`items.${index}.price`, 0);
                setValue(`items.${index}.total`, 0);
                const newLine: InvoiceItem = {
                  name,
                  quantity,
                  price: 0,
                  total: 0,
                };
                const newItems = [...items];
                newItems[index] = newLine;
                updateTotal(newItems);
              }
            },
          })}
        />
      </div>
      <div className="col-span-1 row-span-1 row-start-2 md:row-start-1">
        <span className="muted-heading mb-4 block">Total</span>
        <span
          className="block w-full rounded border border-transparent bg-transparent  py-4 text-heading-s-variant text-fem-blue-400 outline-inherit"
          id={`line${index}-name`}
        >
          {Number.isNaN(total) ? "Invalid" : `£ ${asCurrency("en-GB", total)}`}
        </span>
      </div>
      <button
        className="inline-block pt-[0.8125rem] md:col-span-1 md:row-start-1 md:pt-5"
        aria-label="Delete this invoice line"
        onClick={() => {
          remove(index);
          const newItems = [...items];
          newItems.splice(index, 1);
          updateTotal(newItems);
        }}
      >
        <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            fill="#888EB0"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </div>
  );
}
