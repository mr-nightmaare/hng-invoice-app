import React from "react";

const GoBack = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      type="button"
      className="flex items-center gap-6 pb-2 text-heading-s-variant "
      onClick={handleClick}
    >
      <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.342.886L2.114 5.114l4.228 4.228"
          stroke="#9277FF"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <span>Go back</span>
    </button>
  );
};

export default GoBack;
