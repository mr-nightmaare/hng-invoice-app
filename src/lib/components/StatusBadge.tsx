const statusSurface = {
  paid:
    "",
  pending:
    "",
  draft:
    "",
} as const;

const statusDot = {
  paid: "#33D69F",
  pending: "#FF8F00",
  draft: "#373B53",
} as const;

const statusDotDark = {
  paid: "#33D69F",
  pending: "#FF8F00",
  draft: "#DFE3FA",
} as const;

const statusBackground = {
  paid: "rgba(51, 214, 159, 0.06)",
  pending: "rgba(255, 143, 0, 0.06)",
  draft: "rgba(223, 227, 250, 0.06)",
} as const;

function normalizeStatus(status: string): keyof typeof statusSurface {
  const s = status.toLowerCase() as keyof typeof statusSurface;
  if (s in statusSurface) return s;
  return "draft";
}

export function InvoiceStatus({ status }: { status: string }) {
  const key = normalizeStatus(status);
  return (
    <div
      className={`col-span-1 col-start-2 row-span-2 row-start-2 flex items-center justify-center gap-2 justify-self-end rounded-lg px-5 py-3.5 md:col-start-5 md:row-span-1 md:row-start-1 md:justify-self-auto ${statusSurface[key]}`}
      style={{
        width: "104px",
        height: "40px",
        backgroundColor: statusBackground[key],
        borderRadius: "6px",
      }}
    >
      <span
        className="inline-block shrink-0 rounded-full dark:hidden"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: statusDot[key],
        }}
        aria-hidden
      />
      <span
        className="hidden dark:inline-block shrink-0 rounded-full"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: statusDotDark[key],
        }}
        aria-hidden
      />
      <p
        className="font-medium capitalize dark:hidden"
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "-0.25px",
          lineHeight: "15px",
          color: statusDot[key],
        }}
      >
        {status}
      </p>
      <p
        className="hidden dark:block font-medium capitalize"
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "-0.25px",
          lineHeight: "15px",
          color: statusDotDark[key],
        }}
      >
        {status}
      </p>
    </div>
  );
}