import { ReactNode, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserCtx } from "../store/UserContext";
import { Toaster } from "react-hot-toast";

function AppShell({ children }: { children: ReactNode }) {
  const {
    isDarkTheme,
    showModal,
    showInvoiceForm,
    setShowInvoiceForm,
    setShowModal,
  } = useContext(UserCtx);
  useEffect(() => {
    const htmlElement = document.getElementById("html");
    if (isDarkTheme) {
      htmlElement!.classList.add("dark");
    } else {
      htmlElement!.classList.remove("dark");
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowModal(false);
        setShowInvoiceForm(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isDarkTheme, setShowInvoiceForm, setShowModal]);
  return (
    <div
      className={` ${
        (showModal || showInvoiceForm) && "h-screen overflow-hidden"
      }`}
    >
      <div>
        <Toaster />
      </div>
      <Navbar />
      {children}

      <div
        id="modalPortal"
        className={`${
          !showModal && "hidden"
        } absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-8 backdrop-blur-sm`}
        onClick={() => {
          setShowModal(false);
        }}
      ></div>
      <div
        onClick={() => {
          setShowInvoiceForm(false);
        }}
        id="formPortal"
        className={`${
          !showInvoiceForm && "hidden"
        } absolute bottom-0 left-0 right-0 top-0 z-30 h-screen bg-black/50 md:pt-20 lg:pt-0`}
      ></div>
    </div>
  );
}

export default AppShell;
