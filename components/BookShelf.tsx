"use client";

import { getUserBooks } from "@/app/actions/userBooks";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/actions/user";
import BooksByMonth from "@/components/BooksByMonth";
import BooksByYear from "@/components/BooksByYear";
import { useState } from "react";

export default function BookShelf() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["user_with_books", user?.id],
    queryFn: () => {
      return getUserBooks();
    },
  });

  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  if (!user) {
    return <></>;
  }

  if (isLoading) {
    return <div>Loading books...</div>;
  }

  const classNames = {
    base: "font-medium px-3 hover:bg-gray-100 rounded py-2 px-3",
    active: "bg-gray-100",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16 grid gap-8">
      <div className="flex items-baseline gap-3 border-b pb-2">
        <button
          type="button"
          className={`${classNames.base} ${view === "monthly" && classNames.active}`}
          onClick={() => setView("monthly")}
        >
          Monthly view
        </button>
        <button
          type="button"
          className={`${classNames.base} ${view === "yearly" && classNames.active}`}
          onClick={() => setView("yearly")}
        >
          Yearly view
        </button>
      </div>

      {data && view === "monthly" && <BooksByMonth data={data} />}
      {data && view === "yearly" && <BooksByYear data={data} />}
    </div>
  );
}
