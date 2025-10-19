import { ApplicationStatus } from "../enum/ApplicationStatus";

export const TableHeaders = [
  {
    label: "Registration No.",
    value: "registrationNo",
  },
  {
    label: "Book Id",
    value: "bookId",
  },
  {
    label: "Book Name",
    value: "bookName",
  },
  {
    label: "Applicant",
    value: "applicant",
  },
  {
    label: "Application Date",
    value: "applicationDate",
  },
];

export const demoData = [
  {
    registrationNo: "20202745929",
    bookId: "book930",
    bookName: "Paradoxical Sajid",
    applicant: "Demo User Name",
    applicationDate: "20th May, 2024",
    status: ApplicationStatus.PENDING,
  },
  {
    registrationNo: "20202745929",
    bookId: "book930",
    bookName: "Paradoxical Sajid",
    applicant: "Demo User Name",
    applicationDate: "20th May, 2024",
    status: ApplicationStatus.APPROVED,
  },
  {
    registrationNo: "20202745929",
    bookId: "book930",
    bookName: "Paradoxical Sajid",
    applicant: "Demo User Name",
    applicationDate: "20th May, 2024",
    status: ApplicationStatus.REJECTED,
  },
];
