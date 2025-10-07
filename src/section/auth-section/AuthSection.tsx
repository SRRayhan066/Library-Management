import LoginForm from "@/components/form/login-form/LoginForm";

export default function AuthSection() {
  return (
    <section className="w-full p-[40px] flex items-center justify-center">
      <div className="w-full h-full rounded-lg border-[1px] border-gray-600 flex overflow-hidden">
        <div className="w-1/2 p-13 border-r-[1px] bg-gray-900 flex flex-col justify-center gap-10">
          <h1 className="text-6xl">Library Management System</h1>
          <p>
            <span className="font-bold">
              Everything you need to run a library:
            </span>{" "}
            from book cataloging and member management to loan tracking and
            overdue notifications.
          </p>
        </div>
        <div className="w-1/2 p-5 flex justify-center items-center">
          <div className="w-[60%] flex flex-col items-center gap-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
