import React, { useContext, useState } from "react";
import { UserCtx } from "../store/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const Filter = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isOptionsRevealed, setIsOptionsRevealed] = useState<boolean>(false);
  const { isMobile, invoices } = useContext(UserCtx);

  const toggleOptions = () => setIsOptionsRevealed((prevState) => !prevState);
  function updateFilters(e: React.ChangeEvent<HTMLInputElement>): void {
    const { checked, name } = e.target;
    if (checked) {
      setSelectedOptions((prevFilters) => [...prevFilters, name]);
    } else {
      setSelectedOptions((prevFilters) =>
        prevFilters.filter((filter) => filter !== name)
      );
    }
  }

  return (
    <div
      className="relative z-50 flex flex-col items-center"
      id="statusFilterOptions"
    >
      <button
        className="flex items-center gap-3 disabled:opacity-50"
        onClick={toggleOptions}
        disabled={invoices.length === 0}
      >
        <span className="text-heading-s-variant">
          Filter {!isMobile && "by status"}
        </span>
        <svg
          className={`transition-transform duration-150 ease-out ${
            isOptionsRevealed && "-rotate-180"
          }`}
          width="11"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <AnimatePresence>
        {isOptionsRevealed && (
          <motion.form
            initial={{ translateY: -20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -20, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-12 z-50 flex w-36 flex-col gap-3.5 rounded-lg bg-white p-6 text-heading-s shadow-2xl dark:bg-fem-blue-500 md:w-48"
          >
            {options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3.5 capitalize"
              >
                <input
                  type="checkbox"
                  name={option}
                  checked={selectedOptions.includes(option)}
                  onChange={updateFilters}
                  className="aspect-square w-4 cursor-pointer accent-fem-violet-400"
                />
                {option}
              </label>
            ))}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
