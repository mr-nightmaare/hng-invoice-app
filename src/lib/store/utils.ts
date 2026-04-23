const getRandomLetters = function (count: number) {
  let acc = ""; // the resulting string (to return once results appended)
  for (let i = 0; i < count; i++) {
    // generate amount
    const randomCharCode = Math.floor(Math.random() * (91 - 65)) + 65;
    acc += String.fromCharCode(randomCharCode);
  }
  return acc;
};

// source: https://stackoverflow.com/a/53931775/12576846

export function getId() {
  const letters = getRandomLetters(2);
  let numbers: string = "";
  for (let index = 0; index < 4; index++) {
    const randomNumber = Math.floor(Math.random() * 9);
    numbers = numbers + randomNumber;
  }
  return letters + numbers;
}

export function toEnglishDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function toCalendarDate(date: Date): string {
  const day = date.toLocaleString("en-GB", { day: "numeric" }).padStart(2, "0");
  const month = date
    .toLocaleString("en-GB", { month: "numeric" })
    .padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function asCurrency(locale: string, amount: number): string {
  return amount.toLocaleString(locale, {
    compactDisplay: "long",
    minimumFractionDigits: 2,
  });
}

export function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date.setDate(date.getDate() + days));
  return nextDate;
}

export function numericsOnly(e: React.KeyboardEvent<HTMLInputElement>) {
  const allowedvalues = "0123456789.";
  const allowedKeys = [
    "Backspace",
    "Tab",
    "Alt",
    "ArrowRight",
    "ArrowLeft",
    "ArrowUp",
    "ArrowDown",
    "-",
  ];
  if (!(allowedvalues.includes(e.key) || allowedKeys.includes(e.key))) {
    e.preventDefault();
  }
}
