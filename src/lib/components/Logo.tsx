import { useContext } from "react";
import Link from "next/link";
import { UserCtx } from "../store/UserContext";

const Logo = () => {
  const { setShowModal, setShowInvoiceForm } = useContext(UserCtx);

  return (
    <Link
      onClick={() => {
        setShowModal(false);
        setShowInvoiceForm(false);
      }}
      href="/"
      className="relative aspect-square w-[4.5rem] shrink-0 overflow-hidden rounded-r-[1.25rem] bg-fem-violet-400 md:w-20 lg:w-[6.4375rem]"
    >
      <div className="h-1/2 bg-fem-violet-400"></div>
      <div className="h-1/2 rounded-tl-[1.25rem] bg-fem-violet-300"></div>

      <div className="absolute inset-0 left-1/2 top-1/2 aspect-square w-[1.625rem] -translate-x-1/2 -translate-y-1/2 bg-[url('/assets/logo.svg')] bg-contain bg-center bg-no-repeat md:w-[1.875rem] lg:w-10"></div>
    </Link>
  );
};

export default Logo;
