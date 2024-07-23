"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "../utils/helpers";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "700" });
const filterData = ['All', 'Data Analysis', 'Data Science', 'Programming', 'Machine Learning', 'Web Development'];

function FilterBar() {
  const [selected, setSelected] = useState(filterData[0]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSelectFilter = (filter: string) => {
    setSelected(filter);
    router.push(`/?filter=${filter}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {filterData.map((filter) => (
        <div
          className={cn(
            `p-1 py-2 w-full bg-amber-600 text-white text-center rounded-full cursor-pointer text-sm ${roboto.className}`,
            filter === searchParams.get("filter") &&
              "border-2 dark:border-white bg-black text-white dark:bg-black"
          )}
          onClick={() => onSelectFilter(filter)}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}

export default FilterBar;
