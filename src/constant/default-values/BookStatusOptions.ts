import { BookStatus } from "../enum/BookStatus";

export const BookStatusOptions = [
  {
    label: "Borrowed",
    value: BookStatus.BORROWED,
  },
  {
    label: "Returned",
    value: BookStatus.RETURNED,
  },
];
